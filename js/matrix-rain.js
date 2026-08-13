/**
 * Matrix Digital Rain Canvas Renderer
 * Matrix Web Cyberpunk Background Effect
 */

class MatrixRain {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    
    this.ctx = this.canvas.getContext('2d');
    this.characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>/{}=+*#';
    this.fontSize = 14;
    this.columns = 0;
    this.drops = [];
    this.animationId = null;
    this.isActive = true;

    this.init();
    window.addEventListener('resize', () => this.resize());
  }

  init() {
    this.resize();
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.columns = Math.floor(this.canvas.width / this.fontSize);
    
    this.drops = [];
    for (let i = 0; i < this.columns; i++) {
      this.drops[i] = Math.random() * -100;
    }
  }

  draw() {
    // Fade background to create trails
    this.ctx.fillStyle = 'rgba(7, 9, 14, 0.08)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.font = `${this.fontSize}px 'Fira Code', monospace`;

    for (let i = 0; i < this.drops.length; i++) {
      // Pick random character
      const char = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
      
      // Randomly highlight leading character
      const isLead = Math.random() > 0.88;
      this.ctx.fillStyle = isLead ? '#ffffff' : (Math.random() > 0.5 ? '#10b981' : '#34d399');
      
      const x = i * this.fontSize;
      const y = this.drops[i] * this.fontSize;

      this.ctx.fillText(char, x, y);

      // Reset drop to top once it passes canvas bottom
      if (y > this.canvas.height && Math.random() > 0.975) {
        this.drops[i] = 0;
      }

      this.drops[i]++;
    }
  }

  animate() {
    if (this.isActive) {
      this.draw();
      this.animationId = requestAnimationFrame(() => this.animate());
    }
  }

  toggle() {
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.canvas.classList.remove('hidden');
      this.animate();
    } else {
      this.canvas.classList.add('hidden');
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }
    }
    return this.isActive;
  }
}

// Global initialization helper
window.initMatrixRain = function() {
  return new MatrixRain('matrix-canvas');
};
