window.CursorGlow = class CursorGlow {
    constructor() {
        this.glow = document.createElement('div');
        this.glow.style.position = 'fixed';
        this.glow.style.width = '180px';
        this.glow.style.height = '180px';
        this.glow.style.borderRadius = '50%';
        this.glow.style.background = 'radial-gradient(circle, rgba(217, 4, 41, 0.08) 0%, rgba(217, 4, 41, 0) 70%)';
        this.glow.style.pointerEvents = 'none';
        this.glow.style.zIndex = '9999';
        this.glow.style.transform = 'translate(-50%, -50%)';
        this.glow.style.transition = 'width 0.2s, height 0.2s';
        document.body.appendChild(this.glow);

        document.addEventListener('mousemove', (e) => this.move(e));
        document.addEventListener('mousedown', () => this.pulse());
        document.addEventListener('mouseup', () => this.reset());
    }

    move(e) {
        this.glow.style.left = e.clientX + 'px';
        this.glow.style.top = e.clientY + 'px';
    }

    pulse() {
        this.glow.style.background = 'radial-gradient(circle, rgba(217, 4, 41, 0.15) 0%, rgba(217, 4, 41, 0) 70%)';
        this.glow.style.width = '220px';
        this.glow.style.height = '220px';
    }

    reset() {
        this.glow.style.background = 'radial-gradient(circle, rgba(217, 4, 41, 0.08) 0%, rgba(217, 4, 41, 0) 70%)';
        this.glow.style.width = '180px';
        this.glow.style.height = '180px';
    }
}
