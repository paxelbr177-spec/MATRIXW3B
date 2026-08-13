# ==============================================================================
# Matrix Web Server & Live NVIDIA GLM-5.2 / MercadoPago API Proxy
# Python Standard Library Server
# ==============================================================================

import http.server
import socketserver
import json
import os
import urllib.request
import urllib.parse
import ssl
import traceback

# Load .env file if present
env_file = os.path.join(os.path.dirname(__file__), ".env")
if os.path.exists(env_file):
    with open(env_file, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ[k.strip()] = v.strip().strip("'\"")

PORT = int(os.environ.get("PORT", 8080))

# NVIDIA API Configuration
NVIDIA_API_KEY = os.environ.get("NVIDIA_API_KEY", "")
NVIDIA_MODEL = os.environ.get("NVIDIA_MODEL", "z-ai/glm-5.2")
NVIDIA_BASE_URL = "https://integrate.api.nvidia.com/v1/chat/completions"

# MercadoPago Access Tokens for AR & BR
MP_ACCESS_TOKEN_AR = os.environ.get("MP_ACCESS_TOKEN_AR", "")
MP_ACCESS_TOKEN_BR = os.environ.get("MP_ACCESS_TOKEN_BR", "")

SYSTEM_PROMPT = """Eres el Agente Virtual Inteligente Oficial de Matrix AI para la empresa Matrix Web.

Servicios y Capacidades de Matrix Web:
1. Agentes de Inteligencia Artificial & Automatización (RAG, Vector DBs, LangChain, Matrix AI Engine).
2. Aplicaciones SaaS & Web Apps (React, Next.js, Node.js, Python FastAPI, Multi-tenant, Stripe/MercadoPago).
3. Sitios Web High-End (PageSpeed 100/100, Headless CMS, animaciones vectoriales modernas).
4. Bases de Datos & Cloud Architecture (PostgreSQL, Redis, Optimización de Queries a 10,000 QPS).

Información de Contacto:
- WhatsApp Directo: +55 12 99138-6257
- Email: paxel177@gmail.com

Instrucciones de Respuesta:
- Preséntate siempre como Matrix AI o el Agente de IA de Matrix Web. No menciones proveedores de modelos subyacentes ni nombres de terceros.
- Responde siempre en el idioma en el que te consulte el usuario (Español o Portugués).
- Sé atento, empático, profesional, altamente capacitado y conciso.
- Si te piden cotizaciones o presupuestos, invita al usuario a utilizar la Calculadora Interactiva en el sitio o agendar directamente por WhatsApp.
"""

class MatrixServerHandler(http.server.SimpleHTTPRequestHandler):

    def do_POST(self):
        if self.path == '/api/chat':
            content_length = int(self.headers.get('Content-Length', 0))
            body_bytes = self.rfile.read(content_length)
            
            try:
                data = json.loads(body_bytes.decode('utf-8'))
                user_msg = data.get('message', '')
                user_lang = data.get('lang', 'es')

                ai_response = self.call_nvidia_glm_api(user_msg, user_lang)
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({"reply": ai_response, "source": "matrix_ai"}).encode('utf-8'))
            except Exception as e:
                print("[API Exception Details]:")
                traceback.print_exc()
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                fb = self.fallback_response("consulta", "es")
                self.wfile.write(json.dumps({"reply": fb, "source": "fallback"}).encode('utf-8'))

        elif self.path == '/api/create-preference':
            content_length = int(self.headers.get('Content-Length', 0))
            body_bytes = self.rfile.read(content_length)
            
            try:
                data = json.loads(body_bytes.decode('utf-8'))
                title = data.get('title', 'Curso Matrix Web')
                price = float(data.get('price', 18000))
                currency = data.get('currency', 'ARS')
                region = data.get('region', 'AR')
                course_id = data.get('course_id', 'curso-ai-rag')
                
                pref_result = self.create_mercadopago_preference(title, price, currency, region, course_id)
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps(pref_result).encode('utf-8'))
            except Exception as e:
                print("[MercadoPago Preference Exception]:", e)
                traceback.print_exc()
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode('utf-8'))
        else:
            self.send_error(404, "File Not Found")

    def create_mercadopago_preference(self, title, price, currency, region, course_id):
        access_token = MP_ACCESS_TOKEN_AR if region == 'AR' else MP_ACCESS_TOKEN_BR

        if not access_token:
            # Fallback simulated response or default URL
            print(f"[MercadoPago API] No MP_ACCESS_TOKEN_{region} set. Using fallback URL.")
            fallback_url = f"https://www.mercadopago.com.{'ar' if region=='AR' else 'br'}/checkout/v1/redirect?pref_id=MATRIX_{course_id}_{region}"
            return {
                "success": True,
                "init_point": fallback_url,
                "sandbox_init_point": fallback_url,
                "mode": "fallback"
            }

        url = "https://api.mercadopago.com/checkout/preferences"
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        }

        # Base URL for redirects
        base_domain = os.environ.get("RENDER_EXTERNAL_URL", "http://localhost:8080")
        if not base_domain.startswith("http"):
            base_domain = "https://" + base_domain

        payload = {
            "items": [
                {
                    "title": title,
                    "quantity": 1,
                    "currency_id": currency,
                    "unit_price": price
                }
            ],
            "back_urls": {
                "success": f"{base_domain}/?payment=success&course_id={course_id}",
                "failure": f"{base_domain}/?payment=failure",
                "pending": f"{base_domain}/?payment=pending&course_id={course_id}"
            },
            "auto_return": "approved"
        }

        ctx = ssl._create_unverified_context()
        req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers=headers)
        with urllib.request.urlopen(req, context=ctx, timeout=8) as resp:
            res_data = json.loads(resp.read().decode('utf-8'))
            return {
                "success": True,
                "init_point": res_data.get("init_point", ""),
                "sandbox_init_point": res_data.get("sandbox_init_point", ""),
                "preference_id": res_data.get("id", ""),
                "mode": "live"
            }

    def call_nvidia_glm_api(self, user_message, lang='es'):
        if not NVIDIA_API_KEY:
            return self.fallback_response(user_message, lang)

        payload = {
            "model": NVIDIA_MODEL,
            "messages": [
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_message}
            ],
            "temperature": 0.6,
            "top_p": 1,
            "max_tokens": 1024
        }
        
        headers = {
            "Authorization": f"Bearer {NVIDIA_API_KEY}",
            "Content-Type": "application/json"
        }

        ctx = ssl._create_unverified_context()
        try:
            req = urllib.request.Request(NVIDIA_BASE_URL, data=json.dumps(payload).encode('utf-8'), headers=headers)
            with urllib.request.urlopen(req, context=ctx, timeout=4) as resp:
                res_data = json.loads(resp.read().decode('utf-8'))
                if 'choices' in res_data and len(res_data['choices']) > 0:
                    return res_data['choices'][0]['message']['content']
        except Exception as e:
            print(f"[NVIDIA API Call Exception] {e}")

        return self.fallback_response(user_message, lang)

    def fallback_response(self, user_message, lang='es'):
        if lang == 'pt':
            return f"🤖 **[Matrix AI]** Obrigado pelo seu contato! Sobre *\"{user_message}\"*: Na **Matrix Web**, desenvolvemos Agentes de IA avançados com **Matrix AI Engine**, além de aplicações SaaS e bancos de dados de alto desempenho. Como podemos impulsionar o seu projeto hoje?"
        else:
            return f"🤖 **[Matrix AI]** ¡Gracias por tu consulta! Respecto a *\"{user_message}\"*: En **Matrix Web** desarrollamos Agentes de IA avanzados con **Matrix AI Engine**, además de plataformas SaaS y bases de datos a medida. ¿En qué tipo de desarrollo te gustaría trabajar?"

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), MatrixServerHandler) as httpd:
        print(f"[Matrix Server] Running on http://localhost:{PORT}")
        httpd.serve_forever()
