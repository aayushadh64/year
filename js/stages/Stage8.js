window.Stage8 = class Stage8 {
    constructor(container, nextCallback) {
        this.container = container;
        this.onComplete = nextCallback;
    }

    init() {
        this.container.classList.add('stage-8');

        // Warm sunrise gradient
        document.body.style.transition = 'background 5s ease';
        document.body.style.background = 'linear-gradient(to top, #ff9a9e 0%, #fecfef 50%, #ffffff 100%)';

        const wrapper = document.createElement('div');
        wrapper.className = 'center-content fade-in';
        wrapper.style.textAlign = 'center';

        const title = document.createElement('h1');
        title.innerText = "Will you stay with me for another year?";
        title.style.marginBottom = '40px';
        title.style.fontSize = '2.2rem';
        title.style.color = '#d90429';
        title.style.textShadow = '0 0 10px rgba(255,255,255,0.8)';
        wrapper.appendChild(title);

        const btnContainer = document.createElement('div');
        btnContainer.style.display = 'flex';
        btnContainer.style.justifyContent = 'center';
        btnContainer.style.gap = '15px';
        btnContainer.style.flexWrap = 'wrap';

        const options = [
            { text: "Of course", emoji: "❤️" },
            { text: "I'm not going anywhere", emoji: "😌" },
            { text: "Always", emoji: "🌹" }
        ];

        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.innerHTML = `${opt.text} ${opt.emoji}`;
            btn.className = 'ui-btn';
            btn.addEventListener('click', () => this.finalize());
            btnContainer.appendChild(btn);
        });

        wrapper.appendChild(btnContainer);
        this.container.appendChild(wrapper);
    }

    finalize() {
        this.container.innerHTML = '';
        this.onComplete();
    }
}
