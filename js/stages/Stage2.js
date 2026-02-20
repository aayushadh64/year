window.Stage2 = class Stage2 {
    constructor(container, nextCallback) {
        this.container = container;
        this.onComplete = nextCallback;
        this.attempts = 0;
    }

    init() {
        this.container.classList.add('stage-2');

        const wrapper = document.createElement('div');
        wrapper.className = 'center-content fade-in';
        wrapper.style.textAlign = 'center';
        wrapper.style.zIndex = '20';

        const question = document.createElement('h1');
        question.innerText = "Do you love me?";
        question.style.marginBottom = '2rem';
        question.style.fontSize = '2.5rem';
        question.style.color = '#d90429';
        question.style.textShadow = '0 0 10px rgba(217, 4, 41, 0.2)';

        const btnContainer = document.createElement('div');
        btnContainer.style.position = 'relative';
        btnContainer.style.display = 'inline-block';
        btnContainer.style.minWidth = '300px';
        btnContainer.style.height = '100px';

        this.yesBtn = document.createElement('button');
        this.yesBtn.innerText = "YES ❤️";
        this.yesBtn.className = 'ui-btn yes-btn';
        this.yesBtn.style.marginRight = '20px';
        this.yesBtn.style.fontSize = '1.2rem';
        this.yesBtn.style.animation = 'pulse 2s infinite';

        this.noBtn = document.createElement('button');
        this.noBtn.innerText = "NO 😌";
        this.noBtn.className = 'ui-btn no-btn';
        this.noBtn.style.position = 'absolute';
        this.noBtn.style.fontSize = '1.2rem';
        this.noBtn.style.transition = 'all 0.5s ease-out';

        btnContainer.appendChild(this.yesBtn);
        btnContainer.appendChild(this.noBtn);
        wrapper.appendChild(question);
        wrapper.appendChild(btnContainer);
        this.container.appendChild(wrapper);

        this.addEvents();
    }

    addEvents() {
        this.yesBtn.addEventListener('click', () => this.handleYes());
        this.noBtn.addEventListener('mouseover', () => this.moveNoButton());
        this.noBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.moveNoButton();
        });
        this.noBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.moveNoButton();
        });
    }

    moveNoButton() {
        this.attempts++;
        if (this.attempts >= 3) {
            this.noBtn.innerText = "Nice try 😘";
            this.noBtn.style.opacity = '0';
            this.noBtn.style.pointerEvents = 'none';
            this.yesBtn.style.transform = 'scale(1.5)';
            return;
        }
        const x = (Math.random() - 0.5) * 300;
        const y = (Math.random() - 0.5) * 300;
        const rotate = (Math.random() - 0.5) * 45;
        this.noBtn.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
    }

    handleYes() {
        // Heartbeat Sound
        const heartbeat = new Audio('assets/audio/heartbeat.mp3');
        heartbeat.volume = 0.6;
        heartbeat.play().catch(e => console.log("Heartbeat play failed:", e));

        const heart = document.createElement('div');
        heart.innerText = "❤️";
        heart.style.position = 'absolute';
        heart.style.fontSize = '5rem';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.transform = 'translate(-50%, -50%) scale(0)';
        heart.style.transition = 'transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        this.container.appendChild(heart);

        void heart.offsetWidth;
        heart.style.transform = 'translate(-50%, -50%) scale(10)';
        heart.style.opacity = '0';

        setTimeout(() => this.onComplete(), 1500);
    }
}
