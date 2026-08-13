/**
 * Project Budget & Timeline Estimator
 * Matrix Web Interactive Calculator
 */

class ProjectEstimator {
  constructor() {
    this.typeCards = document.querySelectorAll('.estimator-type-card');
    this.featureCards = document.querySelectorAll('.estimator-feature-card');
    this.priceDisplay = document.getElementById('estimated-price');
    this.timeDisplay = document.getElementById('estimated-time');
    this.summaryList = document.getElementById('estimator-summary-list');
    this.sendQuoteBtn = document.getElementById('estimator-send-btn');

    this.selectedType = { name: "Sitio Web High-End", basePrice: 1200, baseWeeks: 2 };
    this.selectedFeatures = [];

    this.init();
  }

  init() {
    if (!this.priceDisplay) return;

    // Type Selection
    this.typeCards.forEach(card => {
      card.addEventListener('click', (e) => {
        this.typeCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        
        this.selectedType = {
          name: card.getAttribute('data-name'),
          basePrice: parseInt(card.getAttribute('data-price') || '1200'),
          baseWeeks: parseInt(card.getAttribute('data-weeks') || '2')
        };
        this.recalculate();
      });
    });

    // Feature Selection
    this.featureCards.forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('selected');
        this.recalculate();
      });
    });

    if (this.sendQuoteBtn) {
      this.sendQuoteBtn.addEventListener('click', () => {
        this.transferToContactForm();
      });
    }

    this.recalculate();
  }

  recalculate() {
    let totalPrice = this.selectedType.basePrice;
    let totalWeeks = this.selectedType.baseWeeks;
    const selectedFeatureNames = [];

    this.featureCards.forEach(card => {
      if (card.classList.contains('selected')) {
        const price = parseInt(card.getAttribute('data-price') || '0');
        const weeks = parseInt(card.getAttribute('data-weeks') || '0');
        const name = card.getAttribute('data-name');
        
        totalPrice += price;
        totalWeeks += weeks;
        selectedFeatureNames.push(name);
      }
    });

    // Render Displays
    this.priceDisplay.textContent = `$${totalPrice.toLocaleString()} USD`;
    this.timeDisplay.textContent = `~ ${totalWeeks} Semanas`;

    // Render Summary List
    if (this.summaryList) {
      this.summaryList.innerHTML = `
        <li style="color: var(--matrix-green-bright); font-weight: 600;">📁 Base: ${this.selectedType.name}</li>
        ${selectedFeatureNames.map(f => `<li style="color: var(--text-muted); font-size: 13px;">✓ ${f}</li>`).join('')}
      `;
    }

    this.currentQuote = {
      type: this.selectedType.name,
      features: selectedFeatureNames,
      price: `$${totalPrice.toLocaleString()} USD`,
      weeks: `${totalWeeks} Semanas`
    };
  }

  transferToContactForm() {
    const messageField = document.getElementById('contact-message');
    const contactSection = document.getElementById('contacto');

    if (messageField) {
      messageField.value = `Hola equipo de Matrix Web, estuve usando la calculadora de presupuesto en la web y me interesa el proyecto:

- Servicio Base: ${this.currentQuote.type}
- Características: ${this.currentQuote.features.join(', ') || 'Ninguna adicional'}
- Presupuesto Estimado: ${this.currentQuote.price}
- Tiempo Estimado: ${this.currentQuote.weeks}

¿Podemos agendar una breve llamada para revisar los detalles?`;
    }

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

window.initProjectEstimator = function() {
  return new ProjectEstimator();
};
