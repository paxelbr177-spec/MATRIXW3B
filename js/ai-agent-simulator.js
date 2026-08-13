/**
 * Real AI Agent Simulator & LLM API Integration
 * Matrix Web Live Agent Component (Nemotron / GLM-4 / RAG)
 */

class AgentSimulator {
  constructor() {
    this.messagesContainer = document.getElementById('chat-messages');
    this.inputField = document.getElementById('chat-input');
    this.sendBtn = document.getElementById('chat-send-btn');
    this.presetBtns = document.querySelectorAll('.preset-btn');
    this.isTyping = false;

    this.knowledgeBase = {
      default: "En Matrix Web desarrollamos soluciones a medida en 4 áreas clave: **Agentes de IA**, **Aplicaciones SaaS**, **Desarrollo Web High-End** y **Arquitectura de Bases de Datos**. ¿En qué tipo de proyecto estás pensando?",
      cotizar: "¡Excelente! Para darte una cotización precisa podemos usar nuestra **Calculadora Interactiva de Presupuesto** más abajo en el sitio, o si prefieres, cuéntame: 1) ¿Qué tipo de sistema buscas (Web, SaaS, IA, Base de datos)? 2) ¿Cuál es la fecha estimada de lanzamiento?",
      ia: "Nuestros **Agentes de IA** de **Matrix AI** no son simples chatbots. Implementamos arquitecturas **RAG (Retrieval-Augmented Generation)** con bases de datos vectoriales (Pinecone) y modelos LLM avanzados. Esto permite que el agente consulte tus manuales y APIs internas para resolver hasta el 85% de las tareas automáticamente.",
      saas: "Creamos **Plataformas SaaS** listas para escalar. Frontend ultra-rápido en React/Next.js, backend desacoplado en Node.js/Python FastAPI, integración con pasarelas de pago (Stripe, MercadoPago) y arquitectura multi-tenant.",
      db: "Optimizamos y reestructuramos **Bases de Datos** relacionales y NoSQL (PostgreSQL, Redis). Resolvemos cuellos de botella de rendimiento y garantizamos disponibilidad 99.99% a 10,000 QPS.",
      web: "Diseñamos **Sitios Web High-End** creados para impresionar y convertir. Código nativo optimizado con tiempos de carga sub-segundo, animaciones fluidas y puntuación 100/100 en Google PageSpeed."
    };

    this.init();
  }

  init() {
    if (!this.messagesContainer || !this.inputField) return;

    if (this.sendBtn) {
      this.sendBtn.addEventListener('click', () => this.handleUserSubmit());
    }

    this.inputField.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleUserSubmit();
    });

    this.presetBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const queryType = e.currentTarget.getAttribute('data-preset');
        const queryText = e.currentTarget.innerText.trim();
        this.inputField.value = queryText;
        this.handleUserSubmit(queryType);
      });
    });
  }

  async handleUserSubmit(overrideKey = null) {
    const text = this.inputField.value.trim();
    if (!text || this.isTyping) return;

    // Append User Message
    this.appendMessage(text, 'user');
    this.inputField.value = '';
    this.isTyping = true;

    // Show Typing Indicator & Set Avatar Thinking
    const typingElement = this.appendTypingIndicator();
    if (window.matrixAvatarInstance) {
      window.matrixAvatarInstance.setThinking(true);
    }

    const currentLang = window.i18nManager ? window.i18nManager.currentLang : 'es';

    try {
      // Try Real AI API Backend Endpoint
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, lang: currentLang })
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.reply) {
          typingElement.remove();
          if (window.matrixAvatarInstance) window.matrixAvatarInstance.setThinking(false);
          this.streamMessage(data.reply);
          if (window.aiVoiceEngineInstance) window.aiVoiceEngineInstance.speak(data.reply, currentLang);
          return;
        }
      }
    } catch (e) {
      console.warn('[AI Simulator] Server API endpoint fallback to local knowledge base:', e.message);
    }

    // Fallback to Local Knowledge Base
    let responseText = this.knowledgeBase.default;
    const lower = text.toLowerCase();

    if (overrideKey && this.knowledgeBase[overrideKey]) {
      responseText = this.knowledgeBase[overrideKey];
    } else if (lower.includes('cotiz') || lower.includes('precio') || lower.includes('costo') || lower.includes('presupuesto')) {
      responseText = this.knowledgeBase.cotizar;
    } else if (lower.includes('ia') || lower.includes('agente') || lower.includes('inteligencia') || lower.includes('rag') || lower.includes('nemotron') || lower.includes('glm')) {
      responseText = this.knowledgeBase.ia;
    } else if (lower.includes('saas') || lower.includes('plataforma') || lower.includes('app') || lower.includes('dashboard')) {
      responseText = this.knowledgeBase.saas;
    } else if (lower.includes('base') || lower.includes('datos') || lower.includes('postgres') || lower.includes('sql') || lower.includes('db')) {
      responseText = this.knowledgeBase.db;
    } else if (lower.includes('web') || lower.includes('pagina') || lower.includes('sitio') || lower.includes('diseño')) {
      responseText = this.knowledgeBase.web;
    }

    setTimeout(() => {
      typingElement.remove();
      if (window.matrixAvatarInstance) window.matrixAvatarInstance.setThinking(false);
      this.streamMessage(responseText);
      if (window.aiVoiceEngineInstance) window.aiVoiceEngineInstance.speak(responseText, currentLang);
    }, 600);
  }

  appendMessage(text, sender) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble bubble-${sender}`;
    
    if (sender === 'user') {
      bubble.textContent = text;
    } else {
      bubble.innerHTML = this.formatMarkdown(text);
    }

    this.messagesContainer.appendChild(bubble);
    this.scrollToBottom();
    return bubble;
  }

  appendTypingIndicator() {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble bubble-agent typing-indicator';
    bubble.innerHTML = `
      <span style="display: inline-block; width: 6px; height: 6px; background: #8b5cf6; border-radius: 50%; animation: pulse-dot 1s infinite 0.1s;"></span>
      <span style="display: inline-block; width: 6px; height: 6px; background: #10b981; border-radius: 50%; animation: pulse-dot 1s infinite 0.3s; margin: 0 4px;"></span>
      <span style="display: inline-block; width: 6px; height: 6px; background: #06b6d4; border-radius: 50%; animation: pulse-dot 1s infinite 0.5s;"></span>
      <span style="font-size: 12px; color: #9ca3af; margin-left: 8px;">Matrix AI procesando...</span>
    `;
    this.messagesContainer.appendChild(bubble);
    this.scrollToBottom();
    return bubble;
  }

  streamMessage(fullText) {
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble bubble-agent';
    this.messagesContainer.appendChild(bubble);

    let index = 0;
    const interval = setInterval(() => {
      index += 3;
      if (index >= fullText.length) {
        index = fullText.length;
        clearInterval(interval);
        this.isTyping = false;
      }
      const partial = fullText.substring(0, index);
      bubble.innerHTML = this.formatMarkdown(partial);
      this.scrollToBottom();
    }, 15);
  }

  formatMarkdown(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color: var(--matrix-green-bright); font-weight: 600;">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');
  }

  scrollToBottom() {
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }
}

window.initAgentSimulator = function() {
  return new AgentSimulator();
};

