window.Stage9 = class Stage9 {
    constructor(container, nextCallback) {
        this.container = container;
    }

    init() {
        this.container.classList.add('stage-9');

        // Final warm background
        document.body.style.background = 'linear-gradient(to top, #ff9a9e 0%, #fecfef 50%, #ffffff 100%)';

        const wrapper = document.createElement('div');
        wrapper.className = 'center-content'; // No animation
        wrapper.style.zIndex = '100';

        const title = document.createElement('h1');
        title.innerText = "Happy 1st Anniversary ❤️";
        title.style.fontSize = '2.8rem';
        title.style.color = '#d90429';
        title.style.textShadow = '0 0 15px rgba(217, 4, 41, 0.2)';

        const sub = document.createElement('p');
        sub.innerText = "Here's to forever.";
        sub.style.fontSize = '1.5rem';
        sub.style.marginTop = '20px';
        sub.style.color = '#5c2434';
        sub.style.fontStyle = 'italic';

        wrapper.appendChild(title);
        wrapper.appendChild(sub);
        this.container.appendChild(wrapper);

        this.startFireworks();
        this.startPhotoPops();
    }

    startPhotoPops() {
        const photos = [
            'assets/images/how it started.jpg',
            'assets/images/How i proposed you.jpg',
            'assets/images/first date.jpg',
            'assets/images/1000048620.jpg',
            'assets/images/1000048621.jpg',
            'assets/images/1000048622.jpg',
            'assets/images/1000048625.jpg',
            'assets/images/1000048626.jpg',
            'assets/images/1000048627.jpg',
            'assets/images/1000048628.jpg',
            'assets/images/1000048629.jpg',
            'assets/images/1000048631.jpg',
            'assets/images/1000048632.jpg',
            'assets/images/1000048633.jpg'
        ];

        let count = 0;
        const interval = setInterval(() => {
            if (count >= 25) {
                clearInterval(interval);
                return;
            }
            const src = photos[count % photos.length];
            this.createPhoto(src);
            count++;
        }, 900);
    }

    createPhoto(src) {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'pop-photo';

        const x = Math.random() * (window.innerWidth * 0.6) + (window.innerWidth * 0.2);
        const y = Math.random() * (window.innerHeight * 0.6) + (window.innerHeight * 0.2);
        const rotate = (Math.random() - 0.5) * 40;

        img.style.left = x + 'px';
        img.style.top = y + 'px';
        img.style.transform = `translate(-50%, -50%) rotate(${rotate}deg) scale(1)`;
        img.style.opacity = '1';
        img.style.objectFit = 'contain';
        img.style.transition = 'none'; // No effect, just appear

        this.container.appendChild(img);

        img.onerror = () => img.remove();
    }

    startFireworks() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '50';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];

        function createFirework(x, y) {
            // Rose-themed colors
            const colors = ['#ff6b6b', '#ee5a24', '#ff9ff3', '#feca57', '#ff69b4', '#fd79a8'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            for (let i = 0; i < 40; i++) {
                particles.push({
                    x, y,
                    vx: (Math.random() - 0.5) * 8,
                    vy: (Math.random() - 0.5) * 8,
                    alpha: 1,
                    color
                });
            }
        }

        setInterval(() => {
            createFirework(Math.random() * canvas.width, Math.random() * canvas.height * 0.5);
        }, 1000);

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.08;
                p.alpha -= 0.015;
                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
                ctx.fill();
                if (p.alpha <= 0) { particles.splice(i, 1); i--; }
            }
            requestAnimationFrame(animate);
        }
        animate();
    }
}
