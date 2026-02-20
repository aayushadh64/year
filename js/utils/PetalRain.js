window.PetalRain = class PetalRain {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.petals = [];
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.createPetals();
        this.animate();
    }

    createPetals() {
        const count = 100; // Number of petals
        for (let i = 0; i < count; i++) {
            this.petals.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 15 + 10,
                speed: Math.random() * 2 + 1,
                sway: Math.random() * 2 - 1,
                rotation: Math.random() * 360,
                color: Math.random() > 0.5 ? '#ffb7b2' : '#ff9a9e' // Soft pinks
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw Light Gradient Background
        const grad = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        grad.addColorStop(0, '#fdfbfb'); // Very light grey/white
        grad.addColorStop(1, '#ebedee'); // Soft mist
        this.ctx.fillStyle = grad;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.petals.forEach(p => {
            // Move
            p.y += p.speed;
            p.x += Math.sin(p.y * 0.01) + p.sway;
            p.rotation += 1;

            if (p.y > this.canvas.height) {
                p.y = -20;
                p.x = Math.random() * this.canvas.width;
            }

            // Draw Petal (Simple Oval)
            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation * Math.PI / 180);
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.ellipse(0, 0, p.size / 2, p.size, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });

        requestAnimationFrame(() => this.animate());
    }
}
