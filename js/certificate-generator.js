/**
 * Matrix Web Official Certificate Generator
 * High-Resolution HTML5 Canvas Vector Certificate Engine with MatrixWeb Academy Signature
 */

class CertificateGenerator {
  constructor() {
    this.modal = document.getElementById('certificate-modal');
    this.canvas = document.getElementById('certificate-canvas');
    this.studentInput = document.getElementById('cert-student-name');
    this.generateBtn = document.getElementById('cert-generate-btn');
    this.downloadBtn = document.getElementById('cert-download-btn');
    this.closeBtn = document.getElementById('cert-modal-close-btn');

    this.currentCourseTitle = "";
    this.currentCertId = "";

    // Load custom white digital signature image with cache buster
    this.sigImage = new Image();
    this.sigImage.src = 'assets/signature_clean.png?v=' + Date.now();
    this.sigImage.onload = () => {
      if (this.modal && this.modal.classList.contains('active')) {
        this.drawCertificate();
      }
    };

    this.init();
  }

  init() {
    if (this.generateBtn) {
      this.generateBtn.addEventListener('click', () => this.drawCertificate());
    }

    if (this.downloadBtn && this.canvas) {
      this.downloadBtn.addEventListener('click', () => this.downloadCertificate());
    }

    if (this.closeBtn && this.modal) {
      this.closeBtn.addEventListener('click', () => this.modal.classList.remove('active'));
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.modal.classList.remove('active');
      });
    }
  }

  open(courseTitle) {
    if (!this.modal) return;
    this.currentCourseTitle = courseTitle;
    this.currentCertId = 'CERT-MX-' + Math.floor(100000 + Math.random() * 900000);

    const titleEl = document.getElementById('cert-course-title-display');
    if (titleEl) titleEl.textContent = courseTitle;

    this.modal.classList.add('active');
    
    // Draw initial template
    setTimeout(() => this.drawCertificate(), 200);
  }

  drawCertificate() {
    if (!this.canvas) return;

    const ctx = this.canvas.getContext('2d');
    const width = 1200;
    const height = 850;

    this.canvas.width = width;
    this.canvas.height = height;

    const studentName = (this.studentInput && this.studentInput.value.trim()) 
      ? this.studentInput.value.trim() 
      : "ALUMNO DE MATRIX WEB";

    const currentLang = window.i18nManager ? window.i18nManager.currentLang : 'es';

    // 1. Dark Void Background
    ctx.fillStyle = '#07090e';
    ctx.fillRect(0, 0, width, height);

    // 2. Futuristic Grid Background
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
    }

    // 3. Cyber Gold & Emerald Double Border
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#10b981';
    ctx.strokeRect(30, 30, width - 60, height - 60);

    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#8b5cf6';
    ctx.strokeRect(40, 40, width - 80, height - 80);

    // Corner Ornaments
    this.drawCorner(ctx, 40, 40, 1, 1);
    this.drawCorner(ctx, width - 40, 40, -1, 1);
    this.drawCorner(ctx, 40, height - 40, 1, -1);
    this.drawCorner(ctx, width - 40, height - 40, -1, -1);

    // 4. Header Badge / Logo
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 22px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('MATRIX WEB • ACADEMIA DE SOFTWARE & IA', width / 2, 110);

    // 5. Main Title
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 48px "Space Grotesk", sans-serif';
    const mainHeader = currentLang === 'pt' ? 'CERTIFICADO DE CONCLUSÃO' : 'CERTIFICADO DE FINALIZACIÓN';
    ctx.fillText(mainHeader, width / 2, 190);

    // Subtitle
    ctx.fillStyle = '#9ca3af';
    ctx.font = '18px "DM Sans", sans-serif';
    const subHeader = currentLang === 'pt' 
      ? 'Certificamos que o(a) aluno(a) completou com êxito a formação especializada de:'
      : 'Certificamos que el/la alumno/a ha completado exitosamente la capacitación especializada de:';
    ctx.fillText(subHeader, width / 2, 240);

    // 6. Student Name (Glow)
    ctx.shadowColor = 'rgba(16, 185, 129, 0.6)';
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 52px "Space Grotesk", sans-serif';
    ctx.fillText(studentName.toUpperCase(), width / 2, 340);
    ctx.shadowBlur = 0;

    // Line under student name
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(width / 2 - 250, 365); ctx.lineTo(width / 2 + 250, 365); ctx.stroke();

    // 7. Course Title Display
    ctx.fillStyle = '#c084fc';
    ctx.font = 'bold 30px "Space Grotesk", sans-serif';
    ctx.fillText(`"${this.currentCourseTitle}"`, width / 2, 440);

    // Summary Text
    ctx.fillStyle = '#9ca3af';
    ctx.font = '16px "DM Sans", sans-serif';
    const descText = currentLang === 'pt'
      ? 'Acredita domínio prático na arquitetura, desenvolvimento e implantação em produção.'
      : 'Acredita dominio práctico en arquitectura, desarrollo e implementación en producción.';
    ctx.fillText(descText, width / 2, 490);

    // 8. Unique Verification ID & Date
    const today = new Date().toLocaleDateString(currentLang === 'pt' ? 'pt-BR' : 'es-AR', { year: 'numeric', month: 'long', day: 'numeric' });
    
    ctx.fillStyle = '#6b7280';
    ctx.font = '14px "Fira Code", monospace';
    ctx.textAlign = 'left';
    ctx.fillText(`ID VERIFICACIÓN: ${this.currentCertId}`, 80, 750);
    ctx.fillText(`FECHA DE EMISIÓN: ${today}`, 80, 780);

    // 9. Digital Signature Image (MatrixWeb Academy in Pure White)
    if (this.sigImage && this.sigImage.complete && this.sigImage.naturalWidth > 0) {
      const sigWidth = 280;
      const sigHeight = 100;
      ctx.drawImage(this.sigImage, width - 360, 645, sigWidth, sigHeight);
    } else {
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'italic 28px "Space Grotesk", cursive, sans-serif';
      ctx.fillText('MatrixWeb Academy', width - 80, 730);
    }

    // Signature Line
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); 
    ctx.moveTo(width - 340, 750); 
    ctx.lineTo(width - 80, 750); 
    ctx.stroke();

    ctx.textAlign = 'right';
    ctx.fillStyle = '#9ca3af';
    ctx.font = '14px "Space Grotesk", sans-serif';
    ctx.fillText('Firma Oficial • MatrixWeb Academy', width - 80, 775);
  }

  drawCorner(ctx, x, y, dirX, dirY) {
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x, y + dirY * 25);
    ctx.lineTo(x, y);
    ctx.lineTo(x + dirX * 25, y);
    ctx.stroke();
  }

  downloadCertificate() {
    if (!this.canvas) return;

    const link = document.createElement('a');
    const studentName = (this.studentInput && this.studentInput.value.trim()) 
      ? this.studentInput.value.trim().replace(/\s+/g, '_') 
      : 'Alumno';

    link.download = `Certificado_Matrix_Web_${studentName}_${this.currentCertId}.png`;
    link.href = this.canvas.toDataURL('image/png');
    link.click();
  }
}

window.initCertificateGenerator = function() {
  window.certificateGenerator = new CertificateGenerator();
  return window.certificateGenerator;
};
