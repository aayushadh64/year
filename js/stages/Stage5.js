window.Stage5 = class Stage5 {
    constructor(container, nextCallback) {
        this.container = container;
        this.onComplete = nextCallback;
        this.questions = [
            { q: "Where is our favorite spot?", a: "Everywhere but Together ", options: ["Dharahara", "Everywhere but Together ", "Ukalo"] },
            { q: "What makes me smile the most?", a: "You", options: ["Pizza", "You", "Reels"] },
            { q: "How long will I love you?", a: "Eternity + 1 day", options: ["Until tomorrow", "Eternity + 1 day", "Idk maybe later"] }
        ];
        this.currentIndex = 0;
    }

    init() {
        this.container.classList.add('stage-5');
        this.showQuestion();
    }

    showQuestion() {
        this.container.innerHTML = '';
        const qData = this.questions[this.currentIndex];

        const wrapper = document.createElement('div');
        wrapper.className = 'center-content fade-in';

        const qText = document.createElement('h2');
        qText.innerText = qData.q;
        qText.style.marginBottom = '30px';
        wrapper.appendChild(qText);

        qData.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.innerText = opt;
            btn.className = 'ui-btn';
            btn.onclick = () => this.checkAnswer(opt, qData.a, btn);
            wrapper.appendChild(btn);
        });

        this.container.appendChild(wrapper);
    }

    checkAnswer(selected, correct, btn) {
        if (selected === correct) {
            // Heart Explosion
            this.explodeHearts(btn.getBoundingClientRect());
            btn.style.background = '#00ff00'; // Green
            btn.style.boxShadow = '0 0 20px #00ff00';

            setTimeout(() => {
                this.currentIndex++;
                if (this.currentIndex < this.questions.length) {
                    this.showQuestion();
                } else {
                    // Gravity Flip Transition
                    document.body.style.transition = 'transform 2s ease-in-out';
                    document.body.style.transform = 'rotate(180deg)';

                    setTimeout(() => {
                        document.body.style.transform = 'rotate(0deg)'; // Reset for next stage
                        this.onComplete();
                    }, 2000);
                }
            }, 1500);
        } else {
            // Shake effect
            btn.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-10px)' },
                { transform: 'translateX(10px)' },
                { transform: 'translateX(0)' }
            ], { duration: 300 });
            btn.style.background = '#ff0000'; // Red
        }
    }

    explodeHearts(rect) {
        for (let i = 0; i < 30; i++) {
            const heart = document.createElement('div');
            heart.innerText = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = (rect.left + rect.width / 2) + 'px';
            heart.style.top = (rect.top) + 'px';
            heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
            heart.style.pointerEvents = 'none';
            document.body.appendChild(heart);

            // Animate
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 100 + 50;

            heart.animate([
                { transform: 'translate(0,0) scale(1)', opacity: 1 },
                { transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity - 100}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => heart.remove();
        }
    }
}
