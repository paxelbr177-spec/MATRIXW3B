# ==============================================================================
# Matrix Web Server & Live NVIDIA GLM-5.2 / Nemotron AI API Proxy
# Python Standard Library Server
# ==============================================================================

import http.server
import socketserver
import json
import os
import urllib.request
import urllib.parse

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
NVIDIA_API_KEY = os.environ.get("NVIDIA_API_KEY", "")
NVIDIA_MODEL = os.environ.get("NVIDIA_MODEL", "z-ai/glm-5.2")
NVIDIA_BASE_URL = "https://integrate.api.nvidia.com/v1/chat/completions"

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

import ssl
import traceback

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
                self.send_response(200) # Safe fallback response
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                fb = self.fallback_response("consulta", "es")
                self.wfile.write(json.dumps({"reply": fb, "source": "fallback"}).encode('utf-8'))
        else:
            self.send_error(404, "File Not Found")

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
    server_started = False
    for p in range(PORT, PORT + 20):
        try:
            httpd = socketserver.TCPServer(("", p), MatrixServerHandler)
            print(f"Matrix Web Server running on http://localhost:{p} with NVIDIA GLM API connected.")
            server_started = True
            httpd.serve_forever()
            break
        except OSError:
            continue

    if not server_started:
        print("Could not bind to any port in range.")

