import urllib.request
import json
import ssl
import traceback

NVIDIA_API_KEY = "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"
NVIDIA_MODEL = "z-ai/glm-5.2"
NVIDIA_BASE_URL = "https://integrate.api.nvidia.com/v1/chat/completions"

SYSTEM_PROMPT = "Eres el Agente Virtual Inteligente Oficial de Matrix Web."

payload = {
    "model": NVIDIA_MODEL,
    "messages": [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": "Hola, ¿qué servicios ofrecen?"}
    ],
    "temperature": 0.6,
    "top_p": 1,
    "max_tokens": 512
}

headers = {
    "Authorization": f"Bearer {NVIDIA_API_KEY}",
    "Content-Type": "application/json"
}

ctx = ssl._create_unverified_context()

print("Sending request to NVIDIA API...")
try:
    req = urllib.request.Request(NVIDIA_BASE_URL, data=json.dumps(payload).encode('utf-8'), headers=headers)
    with urllib.request.urlopen(req, context=ctx, timeout=12) as resp:
        res_data = json.loads(resp.read().decode('utf-8'))
        print("Response received:", json.dumps(res_data, indent=2))
except Exception as e:
    print("Error calling primary model:", e)
    traceback.print_exc()
