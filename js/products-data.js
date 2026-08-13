/**
 * Products Dataset: Courses & Tools Marketplace
 * Matrix Web (PDF Downloads, MercadoPago AR/BR $15 USD Checkout)
 */

const COURSES_DATA = [
  {
    id: "curso-ai-rag",
    category: "ai",
    categoryLabel: "Agentes IA",
    title: {
      es: "Master en Agentes RAG & Inteligencia Artificial Autónomos",
      pt: "Master em Agentes RAG & Inteligência Artificial Autônomos"
    },
    shortDesc: {
      es: "Curso en PDF de 18 módulos prácticos: aprende a construir agentes inteligentes autónomos con LangChain, bases vectoriales (Pinecone) y modelos LLM.",
      pt: "Curso em PDF de 18 módulos práticos: aprenda a construir agentes inteligentes autônomos com LangChain, bancos vetoriais (Pinecone) e modelos LLM."
    },
    level: { es: "Avanzado", pt: "Avançado" },
    duration: "18hs",
    modules: 12,
    priceUSD: 15,
    priceARS: 18000,
    priceBRL: 80,
    pdfFiles: {
      es: "downloads/Curso_Agentes_IA_ES_Detallado.pdf",
      pt: "downloads/Curso_Agentes_IA_PT_Detallado.pdf"
    },
    tags: ["PDF Descargable", "Python", "LangChain", "Pinecone", "Certificado"],
    svgIcon: `
      <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" stroke="#8b5cf6" stroke-width="4" stroke-dasharray="12 6" class="animate-spin-cw"/>
        <circle cx="50" cy="50" r="26" stroke="#10b981" stroke-width="3" class="animate-spin-ccw"/>
        <circle cx="50" cy="50" r="12" fill="#8b5cf6" class="animate-pulse-purple"/>
      </svg>
    `,
    mpLinkAR: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=MATRIX_COURSE_AI_AR",
    mpLinkBR: "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=MATRIX_COURSE_AI_BR"
  },
  {
    id: "curso-saas-mastery",
    category: "saas",
    categoryLabel: "SaaS & Web",
    title: {
      es: "SaaS Fullstack Mastery: De 0 a Producción",
      pt: "SaaS Fullstack Mastery: Do 0 à Produção"
    },
    shortDesc: {
      es: "Guía completa en PDF: construye una plataforma SaaS completa desde cero con React/Next.js 14, Node.js, multi-tenant y pagos con MercadoPago.",
      pt: "Guia completo em PDF: construa uma plataforma SaaS completa do zero com React/Next.js 14, Node.js, multi-tenant e pagamentos com MercadoPago."
    },
    level: { es: "Intermedio", pt: "Intermediário" },
    duration: "24hs",
    modules: 16,
    priceUSD: 15,
    priceARS: 18000,
    priceBRL: 80,
    pdfFiles: {
      es: "downloads/Curso_SaaS_Mastery_ES.pdf",
      pt: "downloads/Curso_SaaS_Mastery_PT.pdf"
    },
    tags: ["PDF Descargable", "Next.js 14", "Node.js", "Multi-Tenant", "Certificado"],
    svgIcon: `
      <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="70" height="70" rx="14" stroke="#06b6d4" stroke-width="4"/>
        <path d="M 25 70 L 45 40 L 60 55 L 75 28" stroke="#34d399" stroke-width="5" stroke-linecap="round" class="animate-dash"/>
      </svg>
    `,
    mpLinkAR: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=MATRIX_COURSE_SAAS_AR",
    mpLinkBR: "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=MATRIX_COURSE_SAAS_BR"
  },
  {
    id: "curso-db-postgres",
    category: "db",
    categoryLabel: "Bases de Datos",
    title: {
      es: "PostgreSQL & Redis: Optimización a 10,000 QPS",
      pt: "PostgreSQL & Redis: Otimização a 10.000 QPS"
    },
    shortDesc: {
      es: "Manual en PDF sobre particionamiento de tablas, indexación avanzada B-Tree/GIN, réplicas de lectura, clustering Redis y solución de cuellos de botella.",
      pt: "Manual em PDF sobre particionamento de tabelas, indexação avançada B-Tree/GIN, réplicas de leitura, clustering Redis e solução de gargalos."
    },
    level: { es: "Avanzado", pt: "Avançado" },
    duration: "14hs",
    modules: 10,
    priceUSD: 15,
    priceARS: 18000,
    priceBRL: 80,
    pdfFiles: {
      es: "downloads/Curso_DB_HighLoad_ES.pdf",
      pt: "downloads/Curso_DB_HighLoad_PT.pdf"
    },
    tags: ["PDF Descargable", "PostgreSQL", "Redis", "Index Tuning", "Certificado"],
    svgIcon: `
      <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="60" height="18" rx="4" stroke="#ec4899" stroke-width="4" fill="#090c14"/>
        <rect x="20" y="45" width="60" height="18" rx="4" stroke="#ec4899" stroke-width="4" fill="#090c14"/>
        <rect x="20" y="70" width="60" height="18" rx="4" stroke="#ec4899" stroke-width="4" fill="#090c14"/>
      </svg>
    `,
    mpLinkAR: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=MATRIX_COURSE_DB_AR",
    mpLinkBR: "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=MATRIX_COURSE_DB_BR"
  },
  {
    id: "curso-web-performance",
    category: "web",
    categoryLabel: "Desarrollo Web",
    title: {
      es: "Web High-End 100/100: Animaciones Canvas & SVGator",
      pt: "Web High-End 100/100: Animações Canvas & SVGator"
    },
    shortDesc: {
      es: "Libro digital en PDF: crea experiencias web fascinantes con animaciones vectoriales SVGator, canvas de alto rendimiento, diseño cyberpunk neón y SEO técnico.",
      pt: "Livro digital em PDF: crie experiências web fascinantes com animações vetoriais SVGator, canvas de alto desempenho, design cyberpunk neon e SEO técnico."
    },
    level: { es: "Todos los niveles", pt: "Todos os níveis" },
    duration: "10hs",
    modules: 8,
    priceUSD: 15,
    priceARS: 18000,
    priceBRL: 80,
    pdfFiles: {
      es: "downloads/Curso_Frontend_HighEnd_ES.pdf",
      pt: "downloads/Curso_Frontend_HighEnd_PT.pdf"
    },
    tags: ["PDF Descargable", "Canvas HTML5", "SVGator", "PageSpeed 100", "Certificado"],
    svgIcon: `
      <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="36" stroke="#10b981" stroke-width="4"/>
        <ellipse cx="50" cy="50" rx="36" ry="14" stroke="#06b6d4" stroke-width="3" class="animate-spin-cw"/>
      </svg>
    `,
    mpLinkAR: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=MATRIX_COURSE_WEB_AR",
    mpLinkBR: "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=MATRIX_COURSE_WEB_BR"
  }
];

const TOOLS_DATA = [
  {
    id: "tool-matrix-rag-kit",
    category: "ai",
    categoryLabel: "Starter Kit IA",
    title: {
      es: "Matrix AI RAG Starter Kit",
      pt: "Matrix AI RAG Starter Kit"
    },
    shortDesc: {
      es: "Boilerplate de producción listo para desplegar tu propio Agente RAG. Incluye backend FastAPI en Python, conexión Pinecone Vector DB e interfaz web React.",
      pt: "Boilerplate de produção pronto para implantar seu próprio Agente RAG. Inclui backend FastAPI em Python, conexão Pinecone Vector DB e interface web React."
    },
    version: "v2.4.0",
    license: "Comercial / ilimitada",
    priceUSD: 35,
    priceARS: 42000,
    priceBRL: 195,
    tags: ["Python FastAPI", "Pinecone VectorDB", "React UI", "RAG Engine", "Docker"],
    svgIcon: `
      <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="20" width="60" height="60" rx="10" stroke="#8b5cf6" stroke-width="4" fill="#0c101d"/>
        <path d="M 35 50 L 50 65 L 65 35" stroke="#10b981" stroke-width="5" stroke-linecap="round"/>
      </svg>
    `,
    mpLinkAR: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=MATRIX_TOOL_RAG_AR",
    mpLinkBR: "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=MATRIX_TOOL_RAG_BR"
  },
  {
    id: "tool-saas-boilerplate",
    category: "saas",
    categoryLabel: "Template SaaS",
    title: {
      es: "SaaS Multi-Tenant Boilerplate",
      pt: "SaaS Multi-Tenant Boilerplate"
    },
    shortDesc: {
      es: "Código fuente completo para lanzar tu SaaS. Autenticación JWT, gestión de organizaciones, pasarela de pago MercadoPago (AR/BR) & Stripe integrada.",
      pt: "Código-fonte completo para lançar seu SaaS. Autenticação JWT, gestão de organizações, gateway de pagamento MercadoPago (AR/BR) & Stripe integrado."
    },
    version: "v3.1.0",
    license: "Comercial / ilimitada",
    priceUSD: 45,
    priceARS: 54000,
    priceBRL: 250,
    tags: ["Next.js 14", "Node.js", "MercadoPago AR/BR", "Prisma ORM", "Tailwind"],
    svgIcon: `
      <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="70" height="70" rx="12" stroke="#06b6d4" stroke-width="4" fill="#0a0e19"/>
        <line x1="15" y1="38" x2="85" y2="38" stroke="#06b6d4" stroke-width="2"/>
        <circle cx="28" cy="27" r="4" fill="#ef4444"/>
        <circle cx="40" cy="27" r="4" fill="#f59e0b"/>
        <circle cx="52" cy="27" r="4" fill="#10b981"/>
      </svg>
    `,
    mpLinkAR: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=MATRIX_TOOL_SAAS_AR",
    mpLinkBR: "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=MATRIX_TOOL_SAAS_BR"
  },
  {
    id: "tool-postgres-pack",
    category: "db",
    categoryLabel: "Cloud Pack DB",
    title: {
      es: "PostgreSQL High-Performance Config Pack",
      pt: "PostgreSQL High-Performance Config Pack"
    },
    shortDesc: {
      es: "Colección de archivos de configuración `postgresql.conf` ajustados para alta demanda, scripts de backup automatizado, consultas de diagnóstico y Docker Compose cluster.",
      pt: "Coleção de arquivos de configuração `postgresql.conf` ajustados para alta demanda, scripts de backup automatizado, consultas de diagnóstico e Docker Compose cluster."
    },
    version: "v1.8.0",
    license: "Uso sin límites",
    priceUSD: 25,
    priceARS: 30000,
    priceBRL: 140,
    tags: ["PostgreSQL Tuning", "PgBouncer", "Redis Config", "Docker Cluster", "Shell Scripts"],
    svgIcon: `
      <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="30" rx="35" ry="12" stroke="#ec4899" stroke-width="4" fill="#090c14"/>
        <path d="M 15 30 L 15 70 A 35 12 0 0 0 85 70 L 85 30 Z" stroke="#ec4899" stroke-width="4" fill="#090c14"/>
      </svg>
    `,
    mpLinkAR: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=MATRIX_TOOL_DB_AR",
    mpLinkBR: "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=MATRIX_TOOL_DB_BR"
  },
  {
    id: "tool-ui-svg-kit",
    category: "web",
    categoryLabel: "UI & Vector Kit",
    title: {
      es: "Matrix Cyberpunk UI & Canvas Component Kit",
      pt: "Matrix Cyberpunk UI & Canvas Component Kit"
    },
    shortDesc: {
      es: "Librería de componentes UI Cyberpunk neón, motor de lluvia digital Matrix Canvas en HTML5 y animaciones vectoriales estilo SVGator listas para integrar en tu web.",
      pt: "Biblioteca de componentes UI Cyberpunk neon, motor de chuva digital Matrix Canvas em HTML5 e animações vetoriais estilo SVGator prontas para integrar no seu site."
    },
    version: "v2.0.0",
    license: "Comercial",
    priceUSD: 19,
    priceARS: 22800,
    priceBRL: 105,
    tags: ["Canvas Engine", "SVGator Animation", "Cyberpunk CSS", "Glassmorphism", "Responsive"],
    svgIcon: `
      <svg width="36" height="36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="50,15 85,35 85,75 50,95 15,75 15,35" stroke="#10b981" stroke-width="4" fill="#080c14"/>
        <circle cx="50" cy="55" r="14" fill="#06b6d4" class="animate-pulse-green"/>
      </svg>
    `,
    mpLinkAR: "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=MATRIX_TOOL_UI_AR",
    mpLinkBR: "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=MATRIX_TOOL_UI_BR"
  }
];

window.COURSES_DATA = COURSES_DATA;
window.TOOLS_DATA = TOOLS_DATA;
