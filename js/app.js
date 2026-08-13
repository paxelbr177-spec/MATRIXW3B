/**
 * Main Application Logic & Orchestrator
 * Matrix Web (Courses, Tools Marketplace, Automatic PDF Download & Certificate Delivery)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Initialize i18n & Geolocation Auto-Detection
  window.initI18n();

  // 1. Initialize Matrix Rain Canvas Background & Video Background Toggle
  const matrixRain = window.initMatrixRain();
  const videoBgContainer = document.getElementById('video-bg-container');
  const toggleMatrixBtn = document.getElementById('toggle-matrix-btn');
  
  // Ensure YouTube iframe plays automatically via postMessage API
  const ytIframe = document.getElementById('youtube-bg-player');
  if (ytIframe) {
    ytIframe.addEventListener('load', () => {
      try {
        ytIframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        ytIframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', '*');
      } catch (e) {}
    });
  }

  if (toggleMatrixBtn) {
    let mode = 0; // 0: Video+Rain, 1: Video Only, 2: Rain Only, 3: Off
    toggleMatrixBtn.addEventListener('click', () => {
      mode = (mode + 1) % 4;

      const videoActive = mode === 0 || mode === 1;
      const rainActive = mode === 0 || mode === 2;

      if (videoBgContainer) {
        videoBgContainer.classList.toggle('hidden', !videoActive);
      }
      if (matrixRain) {
        if (rainActive && !matrixRain.isActive) matrixRain.toggle();
        if (!rainActive && matrixRain.isActive) matrixRain.toggle();
      }

      toggleMatrixBtn.classList.toggle('active', videoActive || rainActive);
    });
  }

  // 1.5. Initialize 3D Matrix Cyber Avatar
  if (window.MatrixAvatar3D && document.getElementById('3d-avatar-box')) {
    window.matrixAvatarInstance = new window.MatrixAvatar3D('3d-avatar-box');
  }

  // 2. Initialize AI Agent Simulator
  window.initAgentSimulator();

  // 3. Initialize Project Estimator
  window.initProjectEstimator();

  // 4. Initialize Certificate Generator Engine
  window.initCertificateGenerator();

  // 5. Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 6. Hero Terminal Typing Animation
  initHeroTerminal();

  // 7. Portfolio Grid Rendering & Filtering
  initPortfolioGrid();

  // 8. Courses Grid Rendering & Checkout
  initCoursesGrid();

  // 9. Tools Grid Rendering & Checkout
  initToolsGrid();

  // 10. MercadoPago Checkout Modal Listeners
  initCheckoutModal();

  // 11. Contact Form Simulation
  initContactForm();

  // 12. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '70px';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = '#090c14';
      navLinks.style.padding = '20px';
      navLinks.style.borderBottom = '1px solid rgba(16, 185, 129, 0.3)';
    });
  }

  window.addEventListener('matrix_language_changed', () => {
    initCoursesGrid();
    initToolsGrid();
  });
});

/**
 * Hero Terminal Typing Sequence
 */
function initHeroTerminal() {
  const terminalBody = document.getElementById('hero-terminal-body');
  if (!terminalBody) return;

  const sequence = [
    { type: 'cmd', text: 'matrix-web --deploy --service=ai-agent --saas --db --courses' },
    { type: 'res', text: '✔ Compilando arquitectura de microservicios...' },
    { type: 'res', text: '✔ Conectando Vector DB (Pinecone) + NVIDIA GLM-5.2...' },
    { type: 'cyan', text: '✔ Base de Datos PostgreSQL Cluster: 10,000 QPS [READY]' },
    { type: 'purple', text: '✔ Agente autónomo RAG inicializado en 0.4s' },
    { type: 'success', text: '🚀 SISTEMA MATRIX WEB DEPLOYED CON ÉXITO [STATUS 200 OK]' }
  ];

  let seqIndex = 0;

  function runNextLine() {
    if (seqIndex >= sequence.length) return;

    const item = sequence[seqIndex];
    const line = document.createElement('div');
    line.className = 'terminal-line';

    if (item.type === 'cmd') {
      line.innerHTML = `<span class="prompt-symbol">matrix@sys:~$</span> <span class="cmd-text">${item.text}</span>`;
    } else if (item.type === 'cyan') {
      line.innerHTML = `<span class="cyan-text">${item.text}</span>`;
    } else if (item.type === 'purple') {
      line.innerHTML = `<span class="purple-text">${item.text}</span>`;
    } else if (item.type === 'success') {
      line.innerHTML = `<span class="success-text" style="font-weight:600;">${item.text}</span>`;
    } else {
      line.innerHTML = `<span class="response-text">${item.text}</span>`;
    }

    terminalBody.appendChild(line);
    seqIndex++;

    setTimeout(runNextLine, seqIndex === 1 ? 1200 : 700);
  }

  setTimeout(runNextLine, 600);
}

/**
 * Portfolio Grid & Filter System
 */
function initPortfolioGrid() {
  const grid = document.getElementById('portfolio-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const modalOverlay = document.getElementById('portfolio-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (!grid || !window.PORTFOLIO_PROJECTS) return;

  function renderProjects(filterCategory = 'all') {
    grid.innerHTML = '';
    const filtered = filterCategory === 'all' 
      ? window.PORTFOLIO_PROJECTS 
      : window.PORTFOLIO_PROJECTS.filter(p => p.category === filterCategory);

    filtered.forEach(project => {
      const card = document.createElement('div');
      card.className = 'glass-card portfolio-card';
      card.innerHTML = `
        <div class="portfolio-img-wrapper">
          ${project.previewSvg}
          <div style="position:absolute; top:12px; left:12px;">
            <span class="badge ${project.category === 'ai' ? 'badge-purple' : (project.category === 'saas' ? 'badge-cyan' : 'badge-green')}">${project.categoryLabel}</span>
          </div>
        </div>
        <div class="portfolio-card-body">
          <h3 class="font-heading" style="font-size:20px; font-weight:600;">${project.title}</h3>
          <p style="color:var(--text-muted); font-size:14px; line-height:1.6;">${project.shortDesc}</p>
          <div class="portfolio-metrics">
            ${project.metrics.slice(0, 2).map(m => `
              <div class="metric-pill">🚀 ${m.label}: <strong style="color:#fff">${m.value}</strong></div>
            `).join('')}
          </div>
        </div>
      `;

      card.addEventListener('click', () => openModal(project));
      grid.appendChild(card);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      renderProjects(cat);
    });
  });

  function openModal(project) {
    if (!modalOverlay) return;

    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
      <div style="padding: 32px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px;">
          <div>
            <span class="badge badge-green" style="margin-bottom:12px;">${project.categoryLabel}</span>
            <h2 class="font-heading" style="font-size:32px; font-weight:700;">${project.title}</h2>
            <p style="color:var(--cyber-cyan); font-size:16px;">${project.subtitle}</p>
          </div>
        </div>

        <div style="border-radius:12px; overflow:hidden; margin-bottom:24px; max-height:260px; background:#0b111e;">
          ${project.previewSvg}
        </div>

        <p style="color:var(--text-main); font-size:16px; line-height:1.7; margin-bottom:24px;">
          ${project.fullDesc}
        </p>

        <h4 class="font-heading" style="font-size:18px; margin-bottom:12px; color:var(--matrix-green-bright);">Impacto & Resultados Clave:</h4>
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; margin-bottom:28px;">
          ${project.metrics.map(m => `
            <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-subtle); padding:16px; border-radius:10px; text-align:center;">
              <div style="font-family:var(--font-heading); font-size:24px; font-weight:700; color:var(--matrix-green-bright);">${m.value}</div>
              <div style="font-size:12px; color:var(--text-muted); text-transform:uppercase; margin-top:4px;">${m.label}</div>
            </div>
          `).join('')}
        </div>

        <h4 class="font-heading" style="font-size:18px; margin-bottom:12px;">Tecnologías e Integraciones:</h4>
        <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:28px;">
          ${project.tags.map(t => `<span class="feature-tag">${t}</span>`).join('')}
        </div>

        <div style="background:var(--bg-terminal); border:1px solid var(--border-subtle); padding:20px; border-radius:12px;">
          <h5 style="color:#fff; margin-bottom:8px;">Desafío & Solución Técnica:</h5>
          <p style="color:var(--text-muted); font-size:14px; line-height:1.6; margin-bottom:12px;">${project.details.challenge}</p>
          <p style="color:var(--text-muted); font-size:14px; line-height:1.6;">${project.details.solution}</p>
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => modalOverlay.classList.remove('active'));
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('active');
    });
  }

  renderProjects('all');
}

/**
 * Courses Grid Rendering & Checkout Trigger
 */
function initCoursesGrid() {
  const grid = document.getElementById('courses-grid');
  if (!grid || !window.COURSES_DATA) return;

  const currentLang = window.i18nManager ? window.i18nManager.currentLang : 'es';
  grid.innerHTML = '';

  window.COURSES_DATA.forEach(course => {
    const titleText = course.title[currentLang] || course.title.es;
    const descText = course.shortDesc[currentLang] || course.shortDesc.es;
    const levelText = course.level[currentLang] || course.level.es;

    const card = document.createElement('div');
    card.className = 'glass-card course-card svg-interactive-card';
    card.innerHTML = `
      <div class="product-header">
        <div style="display:flex; align-items:center; gap:16px;">
          <div class="service-icon-box icon-green">
            ${course.svgIcon}
          </div>
          <div>
            <span class="badge badge-green" style="margin-bottom:6px;">${course.categoryLabel}</span>
            <h3 class="font-heading" style="font-size:20px; font-weight:700; color:#fff;">${titleText}</h3>
          </div>
        </div>
        <div class="product-price-tag">$${course.priceUSD} USD</div>
      </div>

      <p style="color:var(--text-muted); font-size:14px; line-height:1.6;">${descText}</p>

      <div class="product-meta-list">
        <div class="product-meta-item">🎯 <strong style="color:#fff">${levelText}</strong></div>
        <div class="product-meta-item">⏱️ <strong style="color:#fff">${course.duration}</strong></div>
        <div class="product-meta-item">📚 <strong style="color:#fff">${course.modules} Módulos</strong></div>
      </div>

      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:4px;">
        ${course.tags.map(t => `<span class="feature-tag">${t}</span>`).join('')}
      </div>

      <button class="btn btn-primary glow-effect course-buy-btn" style="width:100%; margin-top:auto;">
        ${currentLang === 'pt' ? 'Inscrever-me no Curso ($15 USD)' : 'Inscribirme al Curso ($15 USD)'} &rarr;
      </button>
    `;

    card.querySelector('.course-buy-btn').addEventListener('click', () => {
      openCheckoutModal(course, 'course');
    });

    grid.appendChild(card);
  });
}

/**
 * Tools Grid Rendering & Checkout Trigger
 */
function initToolsGrid() {
  const grid = document.getElementById('tools-grid');
  if (!grid || !window.TOOLS_DATA) return;

  const currentLang = window.i18nManager ? window.i18nManager.currentLang : 'es';
  grid.innerHTML = '';

  window.TOOLS_DATA.forEach(tool => {
    const titleText = tool.title[currentLang] || tool.title.es;
    const descText = tool.shortDesc[currentLang] || tool.shortDesc.es;

    const card = document.createElement('div');
    card.className = 'glass-card tool-card svg-interactive-card';
    card.innerHTML = `
      <div class="product-header">
        <div style="display:flex; align-items:center; gap:16px;">
          <div class="service-icon-box icon-purple">
            ${tool.svgIcon}
          </div>
          <div>
            <span class="badge badge-purple" style="margin-bottom:6px;">${tool.categoryLabel}</span>
            <h3 class="font-heading" style="font-size:20px; font-weight:700; color:#fff;">${titleText}</h3>
          </div>
        </div>
        <div class="product-price-tag">$${tool.priceUSD} USD</div>
      </div>

      <p style="color:var(--text-muted); font-size:14px; line-height:1.6;">${descText}</p>

      <div class="product-meta-list">
        <div class="product-meta-item">📦 <strong style="color:#fff">${tool.version}</strong></div>
        <div class="product-meta-item">🔑 <strong style="color:#fff">${tool.license}</strong></div>
      </div>

      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:4px;">
        ${tool.tags.map(t => `<span class="feature-tag">${t}</span>`).join('')}
      </div>

      <button class="btn btn-purple glow-effect tool-buy-btn" style="width:100%; margin-top:auto;">
        ${currentLang === 'pt' ? 'Adquirir Ferramenta' : 'Adquirir Herramienta'} &rarr;
      </button>
    `;

    card.querySelector('.tool-buy-btn').addEventListener('click', () => {
      openCheckoutModal(tool, 'tool');
    });

    grid.appendChild(card);
  });
}

/**
 * MercadoPago Regionalized Checkout Modal Logic & Automatic PDF Download
 */
let activeItemForCheckout = null;

function openCheckoutModal(item, type) {
  const modal = document.getElementById('checkout-modal');
  if (!modal) return;

  activeItemForCheckout = item;

  const currentLang = window.i18nManager ? window.i18nManager.currentLang : 'es';
  const itemTitle = item.title[currentLang] || item.title.es;
  const itemDesc = item.shortDesc[currentLang] || item.shortDesc.es;

  document.getElementById('checkout-item-title').textContent = itemTitle;
  document.getElementById('checkout-item-desc').textContent = itemDesc;
  document.getElementById('checkout-item-price').textContent = `$${item.priceUSD} USD`;

  // MercadoPago AR price
  const mpPriceArs = document.getElementById('mp-price-ars');
  if (mpPriceArs) mpPriceArs.textContent = `$${item.priceARS.toLocaleString()} ARS`;

  // MercadoPago BR price
  const mpPriceBrl = document.getElementById('mp-price-brl');
  if (mpPriceBrl) mpPriceBrl.textContent = `R$ ${item.priceBRL.toLocaleString()} BRL`;

  // WhatsApp Link
  const wspLink = document.getElementById('wsp-checkout-link');
  if (wspLink) {
    const encodedMsg = currentLang === 'pt'
      ? encodeURIComponent(`Olá Matrix Web, quero comprar o item "${itemTitle}" ($${item.priceUSD} USD / MercadoPago). Como procedemos com o pagamento Pix?`)
      : encodeURIComponent(`Hola Matrix Web, quiero adquirir "${itemTitle}" ($${item.priceUSD} USD / MercadoPago). ¿Cómo procedemos con el pago de MercadoPago?`);
    wspLink.href = `https://wa.me/5512991386257?text=${encodedMsg}`;
  }

  // Highlight button by language/country
  const mpBtnAr = document.getElementById('mp-btn-ar');
  const mpBtnBr = document.getElementById('mp-btn-br');

  if (currentLang === 'pt') {
    mpBtnBr.style.order = "-1";
    mpBtnAr.style.order = "0";
  } else {
    mpBtnAr.style.order = "-1";
    mpBtnBr.style.order = "0";
  }

  modal.classList.add('active');
}

function processPaymentConfirmation(region) {
  const modal = document.getElementById('checkout-modal');
  if (!activeItemForCheckout) return;

  const currentLang = window.i18nManager ? window.i18nManager.currentLang : 'es';
  const item = activeItemForCheckout;
  const itemTitle = item.title[currentLang] || item.title.es;

  // 1. Simulate MercadoPago Payment Acknowledgment
  const targetBtn = region === 'AR' ? document.getElementById('mp-btn-ar') : document.getElementById('mp-btn-br');
  const originalHtml = targetBtn.innerHTML;
  
  targetBtn.innerHTML = `<span>⏳ Procesando pago MercadoPago (${region})...</span>`;
  targetBtn.disabled = true;

  setTimeout(() => {
    targetBtn.innerHTML = originalHtml;
    targetBtn.disabled = false;

    // Close Checkout Modal
    if (modal) modal.classList.remove('active');

    // 2. Trigger Automatic PDF Download (If Course)
    if (item.pdfFiles) {
      const pdfPath = item.pdfFiles[currentLang] || item.pdfFiles.es;
      const downloadLink = document.createElement('a');
      downloadLink.href = pdfPath;
      downloadLink.download = pdfPath.split('/').pop();
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }

    // 3. Open Official Certificate Generator Modal
    if (window.certificateGenerator) {
      window.certificateGenerator.open(itemTitle);
    }
  }, 1200);
}

function initCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  const closeBtn = document.getElementById('checkout-modal-close-btn');

  const mpBtnAr = document.getElementById('mp-btn-ar');
  const mpBtnBr = document.getElementById('mp-btn-br');

  if (mpBtnAr) {
    mpBtnAr.addEventListener('click', (e) => {
      e.preventDefault();
      processPaymentConfirmation('AR');
    });
  }

  if (mpBtnBr) {
    mpBtnBr.addEventListener('click', (e) => {
      e.preventDefault();
      processPaymentConfirmation('BR');
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }
}

/**
 * Contact Form Simulation
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Enviando mensaje...</span>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      if (formStatus) {
        formStatus.innerHTML = `
          <div style="background:rgba(16, 185, 129, 0.15); border:1px solid var(--matrix-green); color:var(--matrix-green-bright); padding:16px; border-radius:10px; text-align:center; margin-top:16px;">
            ✔ ¡Mensaje recibido en Matrix Web! Nos pondremos en contacto contigo en menos de 2 horas.
          </div>
        `;
      }
      form.reset();
    }, 1200);
  });
}
