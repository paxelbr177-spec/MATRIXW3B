/**
 * Portfolio Data & Case Studies
 * Matrix Web Completed Projects Showcase
 */

const PORTFOLIO_PROJECTS = [
  {
    id: "neuroflow-ai",
    category: "ai",
    categoryLabel: "Agentes IA",
    title: "NeuroFlow AI Assistant",
    subtitle: "Agente Autónomo RAG para Soporte & Atencion al Cliente 24/7",
    shortDesc: "Sistema conversacional de IA integrado con la base de conocimiento corporativa, capaz de resolver el 85% de consultas técnicas de primer nivel de forma autónoma.",
    fullDesc: "NeuroFlow AI es una arquitectura de Agente Inteligente basada en RAG (Retrieval-Augmented Generation) y modelos LLM de última generación. Indexa documentación interna, FAQs y tickets pasados para ofrecer soluciones precisas con referencias exactas y derivación inteligente a agentes humanos cuando la complejidad lo requiere.",
    metrics: [
      { label: "Consultas resueltas autónomamente", value: "85%" },
      { label: "Tiempo promedio de respuesta", value: "1.2s" },
      { label: "Ahorro en costos operativos", value: "60%" }
    ],
    tags: ["Agente IA", "OpenAI GPT-4o", "Pinecone VectorDB", "Python FastAPI", "React UI"],
    previewSvg: `
      <svg viewBox="0 0 400 220" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="220" fill="#090d16"/>
        <circle cx="200" cy="110" r="70" fill="none" stroke="#8b5cf6" stroke-width="2" opacity="0.4"/>
        <circle cx="200" cy="110" r="45" fill="none" stroke="#10b981" stroke-width="2" opacity="0.6"/>
        <circle cx="200" cy="110" r="20" fill="#8b5cf6" opacity="0.8"/>
        <!-- Nodes -->
        <circle cx="140" cy="60" r="8" fill="#10b981"/>
        <circle cx="260" cy="60" r="8" fill="#06b6d4"/>
        <circle cx="130" cy="160" r="8" fill="#ec4899"/>
        <circle cx="270" cy="160" r="8" fill="#34d399"/>
        <!-- Lines -->
        <line x1="140" y1="60" x2="200" y2="110" stroke="#10b981" stroke-width="1.5" stroke-dasharray="3,3"/>
        <line x1="260" y1="60" x2="200" y2="110" stroke="#06b6d4" stroke-width="1.5" stroke-dasharray="3,3"/>
        <line x1="130" y1="160" x2="200" y2="110" stroke="#ec4899" stroke-width="1.5"/>
        <line x1="270" y1="160" x2="200" y2="110" stroke="#34d399" stroke-width="1.5"/>
        <text x="200" y="195" text-anchor="middle" fill="#f3f4f6" font-family="'Space Grotesk', sans-serif" font-size="12" font-weight="600">NEUROFLOW RAG AGENT</text>
      </svg>
    `,
    details: {
      challenge: "El cliente recibía más de 15,000 tickets mensuales de soporte técnico repetitivo, saturando a su equipo humano y causando demoras de hasta 12 horas en respuestas.",
      solution: "Construimos un agente autónomo de IA integrado a Slack y Zendesk mediante arquitectura event-driven en Python, con base vectorial Pinecone y resguardos de privacidad de datos.",
      deliverables: ["Agente RAG multi-canal", "Dashboard de analítica de sentimientos y temas", "Integración con API Zendesk & WhatsApp Business"]
    }
  },
  {
    id: "datapulse-saas",
    category: "saas",
    categoryLabel: "Aplicación SaaS",
    title: "DataPulse Financial SaaS",
    subtitle: "Dashboard Analítico en Tiempo Real & Microservicios Cloud",
    shortDesc: "Plataforma SaaS para monitoreo transaccional y proyecciones financieras automatizadas con visualización gráfica interactiva y alertas de discrepancias.",
    fullDesc: "DataPulse es una solución SaaS empresarial que procesa millones de datos transaccionales al día. Utiliza WebSockets para actualización instantánea de métricas, pipelines de datos en background y reportes exportables automatizados.",
    metrics: [
      { label: "Transacciones procesadas/día", value: "2.5M+" },
      { label: "Latencia de renderizado", value: "< 50ms" },
      { label: "Uptime de plataforma", value: "99.99%" }
    ],
    tags: ["SaaS Fullstack", "React 18", "Node.js", "PostgreSQL", "WebSockets", "Docker"],
    previewSvg: `
      <svg viewBox="0 0 400 220" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="220" fill="#0c121e"/>
        <!-- Chart Bars -->
        <rect x="50" y="120" width="24" height="60" rx="4" fill="rgba(16,185,129,0.3)" stroke="#10b981"/>
        <rect x="90" y="90" width="24" height="90" rx="4" fill="rgba(16,185,129,0.5)" stroke="#10b981"/>
        <rect x="130" y="60" width="24" height="120" rx="4" fill="rgba(6,182,212,0.6)" stroke="#06b6d4"/>
        <rect x="170" y="100" width="24" height="80" rx="4" fill="rgba(16,185,129,0.4)" stroke="#10b981"/>
        <rect x="210" y="40" width="24" height="140" rx="4" fill="rgba(139,92,246,0.8)" stroke="#8b5cf6"/>
        <rect x="250" y="70" width="24" height="110" rx="4" fill="rgba(6,182,212,0.5)" stroke="#06b6d4"/>
        <rect x="290" y="30" width="24" height="150" rx="4" fill="#10b981"/>
        <!-- Sparkline -->
        <path d="M 50 110 Q 130 30, 210 50 T 330 20" fill="none" stroke="#34d399" stroke-width="3"/>
        <text x="200" y="200" text-anchor="middle" fill="#9ca3af" font-family="'Space Grotesk', sans-serif" font-size="12">REALTIME METRICS ENGINE</text>
      </svg>
    `,
    details: {
      challenge: "La empresa procesaba datos de múltiples pasarelas en hojas de cálculo desactualizadas, perdiendo visibilidad en tiempo real de su flujo de caja y rentabilidad.",
      solution: "Desarrollamos una plataforma SaaS con arquitectura de microservicios, autenticación multi-inquilino (Multi-tenant), rol granular y sincronización bancaria automática.",
      deliverables: ["Dashboard Web React responsivo", "API REST & GraphQL de alto rendimiento", "Sistema de alertas automáticas vía Email/SMS"]
    }
  },
  {
    id: "nexus-commerce",
    category: "web",
    categoryLabel: "Desarrollo Web",
    title: "Nexus Commerce High-Speed",
    subtitle: "Plataforma E-Commerce Headless Ultra-Rápida (Score 100/100)",
    shortDesc: "Sitio web e-commerce de alto rendimiento optimizado para conversión, velocidad de carga instantánea en móviles y renderizado estático híbrido.",
    fullDesc: "Nexus Commerce redefine la experiencia de compra en línea mediante arquitectura Headless. Separa el frontend ultrarrápido creado con Next.js del backend de inventario, logrando tiempos de carga sub-segundo en cualquier dispositivo.",
    metrics: [
      { label: "Google PageSpeed Score", value: "100/100" },
      { label: "Aumento en Tasa de Conversión", value: "+42%" },
      { label: "Tiempo de carga inicial", value: "0.4s" }
    ],
    tags: ["Web High-End", "Next.js", "Tailwind CSS", "Headless CMS", "Stripe API"],
    previewSvg: `
      <svg viewBox="0 0 400 220" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="220" fill="#080c14"/>
        <rect x="40" y="30" width="320" height="150" rx="10" fill="#0e1526" stroke="#06b6d4" stroke-width="1.5"/>
        <!-- Browser Header -->
        <rect x="40" y="30" width="320" height="24" rx="10" fill="#141c30"/>
        <circle cx="58" cy="42" r="4" fill="#ef4444"/>
        <circle cx="70" cy="42" r="4" fill="#f59e0b"/>
        <circle cx="82" cy="42" r="4" fill="#10b981"/>
        <!-- Product Cards -->
        <rect x="60" y="70" width="80" height="80" rx="6" fill="#1a253d" stroke="#10b981" stroke-dasharray="2,2"/>
        <rect x="160" y="70" width="80" height="80" rx="6" fill="#1a253d"/>
        <rect x="260" y="70" width="80" height="80" rx="6" fill="#1a253d"/>
        <text x="200" y="200" text-anchor="middle" fill="#34d399" font-family="'Fira Code', monospace" font-size="12">SPEED SCORE: 100/100</text>
      </svg>
    `,
    details: {
      challenge: "La tienda anterior tardaba más de 5 segundos en cargar en dispositivos móviles, provocando una tasa de rebote del 65% y pérdida de ventas.",
      solution: "Implementamos una solución web moderna con SSG (Static Site Generation), imágenes de formato WebP de nueva generación y CDN distribuida globalmente.",
      deliverables: ["Sitio Web Headless E-commerce", "Integración con Checkout de Stripe & MercadoPago", "Panel de administración de contenidos CMS"]
    }
  },
  {
    id: "omnicloud-db",
    category: "db",
    categoryLabel: "Bases de Datos",
    title: "OmniCloud Database Architecture",
    subtitle: "Reingeniería & Optimización de Base de Datos PostgreSQL de Alto Tráfico",
    shortDesc: "Migración, particionamiento y optimización de arquitectura de base de datos relacional para soportar picos de 10,000 consultas por segundo sin degradación.",
    fullDesc: "OmniCloud DB es el resultado de una auditoría y reingeniería profunda de la capa de datos de una plataforma fintech. Diseñamos un esquema con particionamiento de tablas por rango, caché de segundo nivel con Redis Cluster y réplicas de lectura automatizadas.",
    metrics: [
      { label: "Reducción en tiempo de Query", value: "-78%" },
      { label: "Capacidad QPS sostenida", value: "10,000+" },
      { label: "Downtime durante migración", value: "0 min" }
    ],
    tags: ["Base de Datos", "PostgreSQL", "Redis Cluster", "AWS RDS Aurora", "Query Optimization"],
    previewSvg: `
      <svg viewBox="0 0 400 220" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="220" fill="#090e18"/>
        <!-- DB Cylinders -->
        <g stroke="#10b981" stroke-width="1.5" fill="#0e172a">
          <ellipse cx="200" cy="50" rx="90" ry="20" fill="#14233a"/>
          <path d="M 110 50 L 110 90 A 90 20 0 0 0 290 90 L 290 50 Z"/>
          <path d="M 110 90 L 110 130 A 90 20 0 0 0 290 130 L 290 90 Z"/>
          <path d="M 110 130 L 110 170 A 90 20 0 0 0 290 170 L 290 130 Z"/>
        </g>
        <path d="M 80 110 L 110 110" stroke="#06b6d4" stroke-width="2"/>
        <path d="M 290 110 L 320 110" stroke="#8b5cf6" stroke-width="2"/>
        <text x="200" y="205" text-anchor="middle" fill="#06b6d4" font-family="'Fira Code', monospace" font-size="12">POSTGRESQL HIGH-AVAILABILITY CLUSTER</text>
      </svg>
    `,
    details: {
      challenge: "La base de datos original colapsaba en eventos de alta demanda debido a bloqueo de tablas (table locking) y consultas de reportes mal indexadas.",
      solution: "Refactorizamos el esquema de base de datos, implementamos indexación B-Tree/GIN avanzada, connection pooling con PgBouncer y separación CQRS (Command Query Responsibility Segregation).",
      deliverables: ["Esquema PostgreSQL optimizado", "Cluster Redis de alta velocidad", "Plan de backup y recuperación ante desastres"]
    }
  },
  {
    id: "aerologix-saas",
    category: "saas",
    categoryLabel: "Aplicación SaaS",
    title: "AeroLogix Logistics Platform",
    subtitle: "Sistema Web SaaS de Despacho & Rastreo Satelital en Tiempo Real",
    shortDesc: "Plataforma web de gestión logística con asignación automática de rutas optimizadas mediante inteligencia computacional y mapa interactivo en tiempo real.",
    fullDesc: "AeroLogix permite a flotas de transporte coordinar entregas eficientemente. Su algoritmo de ruteo reduce el consumo de combustible y tiempos de entrega mediante modelos matemáticos de optimización y mapas vectoriales dinámicos.",
    metrics: [
      { label: "Reducción en tiempos de ruta", value: "28%" },
      { label: "Vehículos rastreados simultáneamente", value: "5,000+" },
      { label: "Ahorro estimado de combustible", value: "22%" }
    ],
    tags: ["SaaS Logístico", "Python", "FastAPI", "Leaflet Maps", "PostGIS", "Docker"],
    previewSvg: `
      <svg viewBox="0 0 400 220" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="220" fill="#090f1a"/>
        <!-- Map Grid Lines -->
        <line x1="0" y1="70" x2="400" y2="70" stroke="#172238" stroke-width="1"/>
        <line x1="0" y1="140" x2="400" y2="140" stroke="#172238" stroke-width="1"/>
        <line x1="130" y1="0" x2="130" y2="220" stroke="#172238" stroke-width="1"/>
        <line x1="270" y1="0" x2="270" y2="220" stroke="#172238" stroke-width="1"/>
        <!-- Route Line -->
        <path d="M 60 160 Q 150 40, 240 120 T 350 50" fill="none" stroke="#06b6d4" stroke-width="3" stroke-dasharray="5,5"/>
        <circle cx="60" cy="160" r="7" fill="#10b981"/>
        <circle cx="240" cy="120" r="7" fill="#8b5cf6"/>
        <circle cx="350" cy="50" r="9" fill="#ec4899"/>
        <text x="200" y="200" text-anchor="middle" fill="#f3f4f6" font-family="'Space Grotesk', sans-serif" font-size="12">DYNAMIC ROUTE DISPATCHER</text>
      </svg>
    `,
    details: {
      challenge: "La planificación manual de despachos demoraba más de 4 horas cada mañana y generaba rutas ineficientes con solapamientos de territorio.",
      solution: "Desarrollamos una app SaaS con motor de optimización PostGIS/Python que automatiza el empaquetado de pedidos y generación de rutas óptimas en menos de 30 segundos.",
      deliverables: ["Plataforma Web SaaS de Administración", "App PWA de seguimiento para choferes", "API REST de telemetría de vehículos"]
    }
  },
  {
    id: "matrix-bot-sales",
    category: "ai",
    categoryLabel: "Agentes IA",
    title: "Matrix Sales Agent AI",
    subtitle: "Agente IA Conversacional para Captación & Calificación de Leads",
    shortDesc: "Agente inteligente multinivel capacitado para calificar prospectos de venta, responder objeciones comerciales y agendar citas automáticamente en Calendar.",
    fullDesc: "Matrix Sales Agent transforma el proceso de captación comercial. Interactúa de manera fluida y empática con potenciales clientes, analiza su presupuesto e intención de compra, y agenda reuniones directamente con el equipo de ventas.",
    metrics: [
      { label: "Incremento de leads calificados", value: "+3.5x" },
      { label: "Tasa de agendamiento directo", value: "34%" },
      { label: "Disponibilidad de atención", value: "24/7" }
    ],
    tags: ["Agentes IA", "LangChain", "OpenAI", "Node.js", "Google Calendar API"],
    previewSvg: `
      <svg viewBox="0 0 400 220" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="220" fill="#0b0a16"/>
        <rect x="80" y="40" width="240" height="130" rx="16" fill="#131026" stroke="#8b5cf6" stroke-width="1.5"/>
        <circle cx="130" cy="90" r="16" fill="rgba(16,185,129,0.2)" stroke="#10b981"/>
        <path d="M 170 80 L 280 80" stroke="#f3f4f6" stroke-width="3" stroke-linecap="round"/>
        <path d="M 170 100 L 240 100" stroke="#9ca3af" stroke-width="2" stroke-linecap="round"/>
        <rect x="120" y="130" width="160" height="26" rx="6" fill="#8b5cf6"/>
        <text x="200" y="147" text-anchor="middle" fill="#fff" font-family="'Space Grotesk', sans-serif" font-size="11" font-weight="600">CONFIRMAR REUNIÓN</text>
        <text x="200" y="200" text-anchor="middle" fill="#c084fc" font-family="'Fira Code', monospace" font-size="12">AUTOMATED SALES FUNNEL</text>
      </svg>
    `,
    details: {
      challenge: "El equipo comercial gastaba el 70% de su tiempo respondiendo prospectos no calificados o sin presupuesto adecuado.",
      solution: "Creamos un Agente de Ventas en IA capaz de evaluar criterios BANT (Budget, Authority, Need, Timeline) antes de permitir la reserva de espacios en el calendario.",
      deliverables: ["Agente IA de Calificación Comercial", "Integración con HubSpot CRM & Google Calendar", "Dashboard de analítica de embudo de ventas"]
    }
  }
];

window.PORTFOLIO_PROJECTS = PORTFOLIO_PROJECTS;
