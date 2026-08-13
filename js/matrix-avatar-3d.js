/**
 * Matrix 3D Avatar Engine - High-Precision Front-Surface Culling & Blender Geometry Alignment
 * Renders the EXACT Blender Human Face Model with Uniform Point Cloud Scattering
 */

class MatrixAvatar3D {
  constructor(containerId) {
    this.container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    if (!this.container) return;

    this.container.innerHTML = '';

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'matrix-avatar-canvas';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.display = 'block';
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.isSpeaking = false;
    this.isThinking = false;
    this.talkVolume = 0;
    this.time = 0;
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    this.katakana = ['ア', 'カ', 'サ', 'タ', 'ナ', 'ハ', 'マ', 'ヤ', 'ラ', 'ワ', '0', '1', '7', '8', '9', 'R', 'Z', 'X', 'Ω', 'Ξ'];

    this.blenderPoints = [];
    this.bgParticles = [];

    this.resizeCanvas();
    this.loadBlenderModel();
    this.initBgParticles();
    this.bindEvents();

    this.animate();
  }

  resizeCanvas() {
    const rect = this.container.getBoundingClientRect();
    this.width = rect.width || this.container.clientWidth || 280;
    this.height = rect.height || this.container.clientHeight || 260;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.floor(this.width * dpr);
    this.canvas.height = Math.floor(this.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  async loadBlenderModel() {
    try {
      const res = await fetch('assets/human_face_points.json');
      if (res.ok) {
        const rawPoints = await res.json();
        this.processBlenderVertices(rawPoints);
        console.log(`[Matrix 3D Avatar] Loaded ${this.blenderPoints.length} uniform scattered points!`);
        return;
      }
    } catch (e) {
      console.warn('[Matrix 3D Avatar] Fetch assets fallback:', e.message);
    }
  }

  processBlenderVertices(rawPoints) {
    this.blenderPoints = [];

    rawPoints.forEach(p => {
      // Points from normalize.py:
      // X = right, Y = up, Z = front (nose is +Z ~0.35, Y ~0.05)
      const nx = p.x;
      const ny = -p.y; // Canvas Y goes down
      const nz = p.z; 

      const normX = p.nx || 0;
      const normY = -(p.ny || 0);
      const normZ = p.nz || 0;

      // Cull vertices pointing away from camera permanently
      if (p.nz < -0.15) return;

      // Identify Lips using actual face bounds:
      // Nose is at ny=-0.05. Lips are directly below it: ny from -0.02 to 0.08.
      const isLip = (ny > -0.02 && ny < 0.09 && Math.abs(nx) < 0.08 && nz > 0.25);

      this.blenderPoints.push({
        baseX: nx,
        baseY: ny,
        baseZ: nz,
        normX,
        normY,
        normZ,
        char: this.katakana[Math.floor(Math.random() * this.katakana.length)],
        isLip
      });
    });
  }

  initBgParticles() {
    this.bgParticles = [];
    for (let i = 0; i < 60; i++) {
      this.bgParticles.push({
        x: (Math.random() - 0.5) * this.width * 1.1,
        y: Math.random() * this.height,
        speed: 1.8 + Math.random() * 3.5,
        char: this.katakana[Math.floor(Math.random() * this.katakana.length)],
        opacity: 0.25 + Math.random() * 0.45
      });
    }
  }

  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      this.mouse.targetX = (e.clientX - cx) / window.innerWidth * 0.45;
      this.mouse.targetY = (e.clientY - cy) / window.innerHeight * 0.45;
    });

    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.initBgParticles();
    });
  }

  setSpeaking(speaking) {
    this.isSpeaking = speaking;
    if (!speaking) this.talkVolume = 0;
  }

  setThinking(thinking) {
    this.isThinking = thinking;
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    this.time += 0.035;
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;

    if (this.isSpeaking) {
      this.talkVolume = Math.abs(Math.sin(this.time * 14)) * 0.85 + Math.random() * 0.15;
    }

    const w = this.width;
    const h = this.height;
    const cx = w / 2;
    const cy = h / 2 + 55; // Lowered center Y to make room for larger head

    this.ctx.clearRect(0, 0, w, h);

    // 1. Draw Falling Matrix Code Background Streams
    this.ctx.font = '11px monospace';
    this.bgParticles.forEach(p => {
      p.y += this.isThinking ? p.speed * 2.8 : p.speed;
      if (p.y > h + 10) {
        p.y = -15;
        p.x = (Math.random() - 0.5) * w * 1.1;
        p.char = this.katakana[Math.floor(Math.random() * this.katakana.length)];
      }
      this.ctx.fillStyle = `rgba(16, 185, 129, ${p.opacity})`;
      this.ctx.fillText(p.char, cx + p.x, p.y);
    });

    if (this.blenderPoints.length === 0) return;

    // 2. 3D Motion Proportions & Camera Transform
    const baseScale = Math.min(w, h) * 2.25; // Much larger scale for avatar

    const breathY = Math.sin(this.time * 1.6) * 3;
    const headRotY = this.mouse.x + Math.sin(this.time * 0.9) * 0.06;
    const headRotX = this.mouse.y + Math.cos(this.time * 1.2) * 0.04;

    const cosY = Math.cos(headRotY), sinY = Math.sin(headRotY);
    const cosX = Math.cos(headRotX), sinX = Math.sin(headRotX);

    const projectedPoints = [];

    this.blenderPoints.forEach(pt => {
      let x = pt.baseX;
      let y = pt.baseY;
      let z = pt.baseZ;

      // Talking Lip Sync Motion
      if (pt.isLip && this.isSpeaking) {
        if (y > 0.10) {
          y += this.talkVolume * 0.025; // Lower lip down
        } else {
          y -= this.talkVolume * 0.015; // Upper lip up
        }
      }

      // Rotate Y
      let rx1 = x * cosY + z * sinY;
      let rz1 = -x * sinY + z * cosY;

      // Rotate X
      let ry2 = y * cosX - rz1 * sinX;
      let rz2 = y * sinX + rz1 * cosX;

      // Rotate Normal vector
      let rnx1 = pt.normX * cosY + pt.normZ * sinY;
      let rnz1 = -pt.normX * sinY + pt.normZ * cosY;
      let rny2 = pt.normY * cosX - rnz1 * sinX;
      let rnz2 = pt.normY * sinX + rnz1 * cosX;

      // Dynamic Back-Face Culling Check (Positive Z is towards camera)
      if (rnz2 < -0.15) return; // Culled!

      // Perspective Projection
      const fov = 1.4;
      // Subtract rz2 so that points with positive Z (closer to camera) have a smaller denominator
      const perspectiveScale = fov / (fov - rz2 + 0.4);
      
      const px = cx + rx1 * baseScale * perspectiveScale;
      const py = cy + (ry2 * baseScale + breathY) * perspectiveScale;

      projectedPoints.push({
        px,
        py,
        scale: perspectiveScale,
        z: rz2,
        pt
      });
    });

    // Sort back to front (smallest Z first, so front Z drawn last)
    projectedPoints.sort((a, b) => a.z - b.z);

    // 3. Render Solid Green Matrix Human Face
    projectedPoints.forEach(item => {
      const { px, py, scale, pt } = item;
      const fontSz = Math.max(9, Math.floor(13 * scale));

      // Neon Green Katakana Glyphs
      let alpha = Math.min(1.0, Math.max(0.35, (pt.baseZ + 0.3) / 0.5));
      let greenColor = '#10b981';

      if (this.isSpeaking && pt.isLip) {
        greenColor = '#34d399';
        alpha = 1.0;
      } else if (this.isThinking) {
        greenColor = '#06b6d4';
      }

      const char = (Math.random() < 0.02) ? this.katakana[Math.floor(Math.random() * this.katakana.length)] : pt.char;

      this.ctx.font = `700 ${fontSz}px monospace`;
      this.ctx.fillStyle = greenColor;
      this.ctx.globalAlpha = alpha;

      this.ctx.shadowColor = greenColor;
      this.ctx.shadowBlur = 4;
      this.ctx.fillText(char, px - fontSz / 2, py + fontSz / 2);
      this.ctx.shadowBlur = 0;
      this.ctx.globalAlpha = 1.0;
    });

    // 4. Rotating Sci-Fi HUD Ring
    this.ctx.strokeStyle = this.isSpeaking ? 'rgba(52, 211, 153, 0.6)' : (this.isThinking ? 'rgba(6, 182, 212, 0.6)' : 'rgba(16, 185, 129, 0.35)');
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([10, 8]);
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, Math.min(w, h) * 0.44, this.time * 0.4, this.time * 0.4 + Math.PI * 1.6);
    this.ctx.stroke();
    this.ctx.setLineDash([]);
  }
}

window.MatrixAvatar3D = MatrixAvatar3D;

