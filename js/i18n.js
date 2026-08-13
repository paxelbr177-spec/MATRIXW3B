/**
 * Internationalization (i18n) & Automatic Geolocation Module
 * Matrix Web (Spanish ES <-> Portuguese PT)
 */

const TRANSLATIONS = {
  es: {
    // Navbar
    nav_services: "Servicios",
    nav_demo: "Probador IA",
    nav_portfolio: "Lo que hicimos",
    nav_courses: "Cursos",
    nav_tools: "Herramientas",
    nav_calculator: "Calculadora",
    nav_stack: "Stack",
    nav_contact: "Contacto",
    nav_quote: "Cotizar Proyecto",

    // Hero
    hero_badge: "Disponibles para nuevos proyectos",
    hero_title: "Creamos el software que impulsa tu empresa hacia el <span class='gradient-text-green'>Futuro Digital.</span>",
    hero_subtitle: "En <strong>Matrix Web</strong> desarrollamos sitios web de alto impacto, plataformas SaaS escalables, arquitecturas de bases de datos de ultra-rendimiento y Agentes de Inteligencia Artificial que automatizan tus procesos.",
    hero_btn_agent: "Probar Agente IA en vivo",
    hero_btn_portfolio: "Ver Trabajos Realizados",
    hero_stat_uptime: "Uptime & Confiabilidad",
    hero_stat_users: "Usuarios Procesados/Día",
    hero_stat_speed: "Velocidad de Respuesta",

    // Services
    services_badge: "Soluciones Tecnológicas",
    services_title: "Servicios de Desarrollo de <span class='gradient-text-green'>Alto Nivel</span>",
    services_subtitle: "Construimos ecosistemas digitales robustos adaptados a las necesidades reales de tu negocio.",
    
    srv1_title: "Agentes de Inteligencia Artificial",
    srv1_desc: "Desarrollamos agentes inteligentes autónomos RAG conectados a tus bases de conocimiento internas. Capaces de resolver consultas de clientes, calificar ventas y automatizar flujos operativos 24/7.",
    
    srv2_title: "Aplicaciones SaaS & Web Apps",
    srv2_desc: "Creación de plataformas SaaS completas: dashboards analíticos en tiempo real, arquitecturas multi-tenant, integración de cobros recurrentes y paneles de administración modernos y seguros.",

    srv3_title: "Sitios Web High-End & Landings",
    srv3_desc: "Páginas web corporativas e integraciones e-commerce con diseño personalizado impactante, velocidad de carga instantánea (PageSpeed 100/100) y SEO técnico avanzado para máxima conversión.",

    srv4_title: "Bases de Datos & Arquitectura Cloud",
    srv4_desc: "Diseño, optimización y migración de estructuras de datos relacionales y NoSQL. Eliminamos cuellos de botella en PostgreSQL, MySQL y Redis para soportar millones de solicitudes sin fallas.",

    // AI Simulator
    demo_badge: "Demostración Interactiva",
    demo_title: "Prueba nuestro <span class='gradient-text-purple'>Agente de IA</span> en Tiempo Real",
    demo_subtitle: "Interactúa con nuestro simulador para ver cómo responde un agente de Matrix Web ante consultas de clientes y proyectos.",
    demo_sidebar_title: "Preguntas de prueba sugeridas:",
    demo_q1: "🤖 ¿Cómo funcionan los Agentes de IA?",
    demo_q2: "⚡ ¿Qué incluye el desarrollo de un SaaS?",
    demo_q3: "🗄️ ¿Cómo optimizan bases de datos?",
    demo_q4: "🌐 ¿Por qué sus webs son ultra-rápidas?",
    demo_q5: "💼 ¿Cómo puedo cotizar mi proyecto?",
    demo_placeholder: "Escribe tu consulta aquí (ej: 'Quiero crear un SaaS con base de datos')...",
    demo_send: "Enviar",

    // Portfolio
    port_badge: "Casos de Éxito",
    port_title: "Lo que <span class='gradient-text-green'>Hicimos hasta Ahora</span>",
    port_subtitle: "Explora una selección de los proyectos, plataformas e innovaciones que hemos desarrollado para nuestros clientes.",
    port_filter_all: "Todos los Proyectos",
    port_filter_ai: "🤖 Agentes IA",
    port_filter_saas: "⚡ Aplicaciones SaaS",
    port_filter_web: "🌐 Desarrollo Web",
    port_filter_db: "🗄️ Bases de Datos",

    // Courses Section
    courses_badge: "Formación Especializada",
    courses_title: "Cursos & <span class='gradient-text-green'>Masterclasses Técnicas</span>",
    courses_subtitle: "Capacítate en el desarrollo de Agentes de IA, SaaS y Bases de Datos con la metodología práctica de Matrix Web.",
    lbl_level: "Nivel",
    lbl_duration: "Duración",
    lbl_modules: "Módulos",
    btn_enroll: "Inscribirme al Curso",

    // Tools Section
    tools_badge: "Marketplace de Código",
    tools_title: "Herramientas & <span class='gradient-text-purple'>Starter Kits Listos</span>",
    tools_subtitle: "Acelera el lanzamiento de tus aplicaciones con nuestras plantillas, scripts de tuning y componentes probados en producción.",
    lbl_version: "Versión",
    lbl_license: "Licencia",
    btn_buy_tool: "Adquirir Herramienta",

    // MercadoPago Checkout Modal
    checkout_modal_title: "Checkout de Compra Segura",
    checkout_lbl_item: "Producto / Curso",
    checkout_lbl_price: "Precio Total",
    checkout_select_mp: "Selecciona tu región para abonar vía MercadoPago:",
    checkout_mp_ar_label: "🇦🇷 MercadoPago Argentina (ARS)",
    checkout_mp_br_label: "🇧🇷 MercadoPago Brasil (Pix / BRL)",
    checkout_pay_btn_ar: "Pagar con MercadoPago Argentina (ARS) &rarr;",
    checkout_pay_btn_br: "Pagar com Pix / MercadoPago Brasil (BRL) &rarr;",
    checkout_wsp_btn: "Consultar o Adquirir por WhatsApp &rarr;",

    // Estimator
    calc_badge: "Calculadora Transparente",
    calc_title: "Estimador de Presupuesto <span class='gradient-text-green'>& Tiempos</span>",
    calc_subtitle: "Selecciona el tipo de proyecto y funcionalidades para obtener un estimado instantáneo.",
    calc_step1: "1. Selecciona el Tipo de Proyecto Principal:",
    calc_step2: "2. Módulos y Funcionalidades Adicionales:",
    calc_summary_title: "Resumen Estimado:",
    calc_lbl_cost: "Costo Estimado",
    calc_lbl_time: "Tiempo Estimado de Entrega",
    calc_btn_transfer: "Transferir a Formulario de Contacto",

    // Tech Stack
    tech_badge: "Tecnología de Vanguardia",
    tech_title: "Nuestro <span class='gradient-text-purple'>Stack Tecnológico</span>",
    tech_subtitle: "Utilizamos herramientas y lenguajes probados en la industria para garantizar escalabilidad, seguridad y velocidad.",

    // Contact
    contact_badge: "Hablemos de tu Proyecto",
    contact_title: "¿Listo para llevar tu empresa a la <span class='gradient-text-green'>Matrix?</span>",
    contact_subtitle: "Déjanos un mensaje o agenda una llamada técnica sin compromiso. Evaluaremos tu idea y te propondremos la mejor arquitectura.",
    contact_whatsapp_label: "Atención Inmediata por WhatsApp",
    contact_email_label: "Correo Electrónico Directo",
    contact_response_time: "Tiempo de Respuesta Garantizado",
    contact_response_val: "Menos de 2 horas hábiles",
    
    form_name_label: "Nombre Completo *",
    form_email_label: "Correo Electrónico *",
    form_service_label: "Tipo de Servicio de Interés",
    form_message_label: "Detalles del Proyecto / Mensaje *",
    form_btn_submit: "Enviar Solicitud de Proyecto",
    
    form_opt_ai: "Agentes de Inteligencia Artificial (RAG / Bots)",
    form_opt_saas: "Aplicación SaaS / Plataforma Web",
    form_opt_web: "Sitio Web High-End / Landing Page",
    form_opt_db: "Bases de Datos & Arquitectura Cloud",
    form_opt_other: "Consulta General / Otro",

    // Footer
    footer_rights: "© 2026 Matrix Web. Todos los derechos reservados. Arquitectura de Software High-End & Inteligencia Artificial."
  },

  pt: {
    // Navbar
    nav_services: "Serviços",
    nav_demo: "Testador IA",
    nav_portfolio: "O que fizemos",
    nav_courses: "Cursos",
    nav_tools: "Ferramentas",
    nav_calculator: "Calculadora",
    nav_stack: "Stack",
    nav_contact: "Contato",
    nav_quote: "Orçar Projeto",

    // Hero
    hero_badge: "Disponível para novos projetos",
    hero_title: "Criamos o software que impulsiona sua empresa rumo ao <span class='gradient-text-green'>Futuro Digital.</span>",
    hero_subtitle: "Na <strong>Matrix Web</strong> desenvolvemos sites de alto impacto, plataformas SaaS escaláveis, arquiteturas de banco de dados de alto desempenho e Agentes de Inteligência Artificial que automatizam seus processos.",
    hero_btn_agent: "Testar Agente IA ao vivo",
    hero_btn_portfolio: "Ver Projetos Realizados",
    hero_stat_uptime: "Uptime & Confiabilidade",
    hero_stat_users: "Usuários Processados/Dia",
    hero_stat_speed: "Velocidade de Resposta",

    // Services
    services_badge: "Soluções Tecnológicas",
    services_title: "Serviços de Desenvolvimento de <span class='gradient-text-green'>Alto Nível</span>",
    services_subtitle: "Construímos ecossistemas digitais robustos adaptados às reais necessidades do seu negócio.",
    
    srv1_title: "Agentes de Inteligência Artificial",
    srv1_desc: "Desenvolvemos agentes inteligentes autônomos RAG conectados às suas bases de conhecimento internas. Capazes de resolver dúvidas de clientes, qualificar vendas e automatizar fluxos operacionais 24/7.",
    
    srv2_title: "Aplicações SaaS & Web Apps",
    srv2_desc: "Criação de plataformas SaaS completas: dashboards analíticos em tempo real, arquiteturas multi-tenant, integração de pagamentos recorrentes e painéis de administração modernos e seguros.",

    srv3_title: "Sites Web High-End & Landings",
    srv3_desc: "Páginas web corporativas e e-commerce com design personalizado marcante, velocidade de carregamento instantânea (PageSpeed 100/100) e SEO técnico avançado para máxima conversão.",

    srv4_title: "Bancos de Dados & Arquitetura Cloud",
    srv4_desc: "Design, otimização e migração de estruturas de dados relacionais e NoSQL. Eliminamos gargalos no PostgreSQL, MySQL e Redis para suportar milhões de requisições sem falhas.",

    // AI Simulator
    demo_badge: "Demonstração Interativa",
    demo_title: "Teste nosso <span class='gradient-text-purple'>Agente de IA</span> em Tempo Real",
    demo_subtitle: "Interaja com nosso simulador para ver como um agente da Matrix Web responde a consultas de clientes e projetos.",
    demo_sidebar_title: "Perguntas de teste sugeridas:",
    demo_q1: "🤖 Como funcionam os Agentes de IA?",
    demo_q2: "⚡ O que inclui o desenvolvimento de um SaaS?",
    demo_q3: "🗄️ Como vocês otimizam bancos de dados?",
    demo_q4: "🌐 Por que os seus sites são ultra-rápidos?",
    demo_q5: "💼 Como posso orçar meu projeto?",
    demo_placeholder: "Escreva sua dúvida aqui (ex: 'Quero criar um SaaS com banco de dados')...",
    demo_send: "Enviar",

    // Portfolio
    port_badge: "Casos de Sucesso",
    port_title: "O que <span class='gradient-text-green'>Fizemos até Agora</span>",
    port_subtitle: "Explore uma seleção dos projetos, plataformas e inovações que desenvolvemos para nossos clientes.",
    port_filter_all: "Todos os Projetos",
    port_filter_ai: "🤖 Agentes IA",
    port_filter_saas: "⚡ Aplicações SaaS",
    port_filter_web: "🌐 Desenvolvimento Web",
    port_filter_db: "🗄️ Bancos de Dados",

    // Courses Section
    courses_badge: "Treinamento Especializado",
    courses_title: "Cursos & <span class='gradient-text-green'>Masterclasses Técnicas</span>",
    courses_subtitle: "Capacite-se no desenvolvimento de Agentes de IA, SaaS e Bancos de Dados com a metodologia prática da Matrix Web.",
    lbl_level: "Nível",
    lbl_duration: "Duração",
    lbl_modules: "Módulos",
    btn_enroll: "Inscrever-me no Curso",

    // Tools Section
    tools_badge: "Marketplace de Código",
    tools_title: "Ferramentas & <span class='gradient-text-purple'>Starter Kits Prontos</span>",
    tools_subtitle: "Acelere o lançamento de suas aplicações com nossos templates, scripts de otimização e componentes testados em produção.",
    lbl_version: "Versão",
    lbl_license: "Licença",
    btn_buy_tool: "Adquirir Ferramenta",

    // MercadoPago Checkout Modal
    checkout_modal_title: "Checkout de Compra Segura",
    checkout_lbl_item: "Produto / Curso",
    checkout_lbl_price: "Preço Total",
    checkout_select_mp: "Selecione sua região para pagar via MercadoPago:",
    checkout_mp_ar_label: "🇦🇷 MercadoPago Argentina (ARS)",
    checkout_mp_br_label: "🇧🇷 MercadoPago Brasil (Pix / BRL)",
    checkout_pay_btn_ar: "Pagar con MercadoPago Argentina (ARS) &rarr;",
    checkout_pay_btn_br: "Pagar com Pix / MercadoPago Brasil (BRL) &rarr;",
    checkout_wsp_btn: "Consultar ou Adquirir pelo WhatsApp &rarr;",

    // Estimator
    calc_badge: "Calculadora Transparente",
    calc_title: "Calculadora de Orçamento <span class='gradient-text-green'>& Prazos</span>",
    calc_subtitle: "Selecione o tipo de projeto e funcionalidades para obter uma estimativa instantânea.",
    calc_step1: "1. Selecione o Tipo de Projeto Principal:",
    calc_step2: "2. Módulos e Funcionalidades Adicionais:",
    calc_summary_title: "Resumo Estimado:",
    calc_lbl_cost: "Custo Estimado",
    calc_lbl_time: "Prazo Estimado de Entrega",
    calc_btn_transfer: "Transferir para Formulário de Contato",

    // Tech Stack
    tech_badge: "Tecnologia de Ponta",
    tech_title: "Nosso <span class='gradient-text-purple'>Stack Tecnológico</span>",
    tech_subtitle: "Utilizamos ferramentas e linguagens testadas na indústria para garantir escalabilidade, segurança e velocidade.",

    // Contact
    contact_badge: "Fale sobre seu Projeto",
    contact_title: "Pronto para levar sua empresa para a <span class='gradient-text-green'>Matrix?</span>",
    contact_subtitle: "Deixe-nos uma mensagem ou agende uma conversa técnica sem compromisso. Avaliaremos sua ideia e levaremos a melhor arquitetura.",
    contact_whatsapp_label: "Atendimento Imediato via WhatsApp",
    contact_email_label: "E-mail Direto",
    contact_response_time: "Tempo de Resposta Garantido",
    contact_response_val: "Menos de 2 horas úteis",

    form_name_label: "Nome Completo *",
    form_email_label: "E-mail *",
    form_service_label: "Tipo de Serviço de Interesse",
    form_message_label: "Detalhes do Projeto / Mensagem *",
    form_btn_submit: "Enviar Solicitação de Projeto",

    form_opt_ai: "Agentes de Inteligência Artificial (RAG / Bots)",
    form_opt_saas: "Aplicação SaaS / Plataforma Web",
    form_opt_web: "Site Web High-End / Landing Page",
    form_opt_db: "Bancos de Dados & Arquitetura Cloud",
    form_opt_other: "Consulta Geral / Outro",

    // Footer
    footer_rights: "© 2026 Matrix Web. Todos os direitos reservados. Arquitetura de Software High-End & Inteligencia Artificial."
  }
};

class I18nManager {
  constructor() {
    this.currentLang = 'es';
    this.init();
  }

  async init() {
    await this.detectLanguage();
    this.bindLanguageSwitcher();
    this.setLanguage(this.currentLang);
  }

  async detectLanguage() {
    const saved = localStorage.getItem('matrix_web_lang');
    if (saved && (saved === 'es' || saved === 'pt')) {
      this.currentLang = saved;
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1500);

      const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const country = data.country_code ? data.country_code.toUpperCase() : '';
        
        if (country === 'BR') {
          this.currentLang = 'pt';
          console.log('[i18n] Location detected: Brazil (BR) -> Portuguese (PT)');
          return;
        } else if (country === 'AR' || country === 'ES' || country === 'MX' || country === 'CL' || country === 'CO' || country === 'PE' || country === 'UY') {
          this.currentLang = 'es';
          console.log(`[i18n] Location detected: ${country} -> Spanish (ES)`);
          return;
        }
      }
    } catch (e) {
      console.warn('[i18n] Geolocation fallback to browser language:', e.message);
    }

    const navLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (navLang.startsWith('pt')) {
      this.currentLang = 'pt';
    } else {
      this.currentLang = 'es';
    }
  }

  bindLanguageSwitcher() {
    const btnEs = document.getElementById('lang-btn-es');
    const btnPt = document.getElementById('lang-btn-pt');

    if (btnEs) btnEs.addEventListener('click', () => this.setLanguage('es'));
    if (btnPt) btnPt.addEventListener('click', () => this.setLanguage('pt'));
  }

  setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    this.currentLang = lang;
    localStorage.setItem('matrix_web_lang', lang);

    const btnEs = document.getElementById('lang-btn-es');
    const btnPt = document.getElementById('lang-btn-pt');
    if (btnEs && btnPt) {
      btnEs.classList.toggle('active', lang === 'es');
      btnPt.classList.toggle('active', lang === 'pt');
    }

    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (TRANSLATIONS[lang][key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = TRANSLATIONS[lang][key];
        } else {
          el.innerHTML = TRANSLATIONS[lang][key];
        }
      }
    });

    const waLink = document.getElementById('whatsapp-direct-link');
    if (waLink) {
      const msg = lang === 'pt' 
        ? 'Olá%20Matrix%20Web,%20quero%20cotar%20um%20projeto'
        : 'Hola%20Matrix%20Web,%20quiero%20cotizar%20un%20proyecto';
      waLink.href = `https://wa.me/5512991386257?text=${msg}`;
    }

    window.dispatchEvent(new CustomEvent('matrix_language_changed', { detail: { lang } }));
  }

  t(key) {
    return TRANSLATIONS[this.currentLang][key] || key;
  }
}

window.initI18n = function() {
  window.i18nManager = new I18nManager();
  return window.i18nManager;
};
