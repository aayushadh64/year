window.Stage6 = class Stage6 {
    constructor(container, nextCallback) {
        this.container = container;
        this.onComplete = nextCallback;
        this.assets = [
            { type: 'video', src: 'assets/videos/1000048640.mp4', duration: 4000 },
            { type: 'image', src: 'assets/images/how it started.jpg', duration: 3000 },
            { type: 'video', src: 'assets/videos/1000048641.mp4', duration: 4000 },
            { type: 'image', src: 'assets/images/How i proposed you.jpg', duration: 3000 },
            { type: 'video', src: 'assets/videos/1000048642.mp4', duration: 4000 },
            { type: 'image', src: 'assets/images/first date.jpg', duration: 3000 },
            { type: 'video', src: 'assets/videos/1000048643.mp4', duration: 4000 },
            { type: 'image', src: 'assets/images/1000048620.jpg', duration: 3000 },
            { type: 'video', src: 'assets/videos/1000048644.mp4', duration: 4000 },
            { type: 'image', src: 'assets/images/1000048621.jpg', duration: 3000 },
            { type: 'video', src: 'assets/videos/1000048645.mp4', duration: 4000 }
        ];
        this.currentIndex = 0;
    }

    async init() {
        this.container.classList.add('stage-6');

        // Background Glow Overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'radial-gradient(circle, rgba(217, 4, 41, 0.1) 0%, rgba(0,0,0,0.4) 100%)';
        overlay.style.zIndex = '5';
        this.container.appendChild(overlay);

        this.displayContainer = document.createElement('div');
        this.displayContainer.className = 'center-content';
        this.displayContainer.style.zIndex = '10';
        this.displayContainer.style.width = '80vw';
        this.displayContainer.style.height = '60vh';
        this.displayContainer.style.border = '4px solid white';
        this.displayContainer.style.borderRadius = '20px';
        this.displayContainer.style.boxShadow = '0 0 40px rgba(0,0,0,0.3)';
        this.displayContainer.style.overflow = 'hidden';
        this.displayContainer.style.background = '#000';
        this.container.appendChild(this.displayContainer);

        this.caption = document.createElement('h2');
        this.caption.innerText = "Every moment holds a universe.";
        this.caption.style.position = 'absolute';
        this.caption.style.bottom = '10%';
        this.caption.style.width = '100%';
        this.caption.style.textAlign = 'center';
        this.caption.style.zIndex = '15';
        this.caption.style.color = '#fff';
        this.caption.style.textShadow = '0 0 10px rgba(0,0,0,0.5)';
        this.caption.className = 'fade-in';
        this.container.appendChild(this.caption);

        this.playNext();
    }

    playNext() {
        if (this.currentIndex >= this.assets.length) {
            this.finish();
            return;
        }

        const current = this.assets[this.currentIndex];
        this.displayContainer.innerHTML = '';

        let el;
        if (current.type === 'video') {
            el = document.createElement('video');
            el.src = current.src;
            el.setAttribute('muted', '');
            el.setAttribute('playsinline', '');
            el.setAttribute('autoplay', '');
            el.setAttribute('loop', '');
            el.muted = true;
            el.autoplay = true;
            el.playsInline = true;
            el.style.width = '100%';
            el.style.height = '100%';
            el.style.objectFit = 'contain';

            // Wait for it to be ready
            el.oncanplay = () => {
                el.play().catch(e => console.log("Play failed:", e));
            };

            el.load();
        } else {
            el = document.createElement('img');
            el.src = current.src;
            el.style.width = '100%';
            el.style.height = '100%';
            el.style.objectFit = 'contain';
        }

        this.displayContainer.appendChild(el);

        // Update text halfway through
        if (this.currentIndex === 3) this.caption.innerText = "Thank you for being mine.";
        if (this.currentIndex === 7) this.caption.innerText = "I love you to the moon and back.";

        setTimeout(() => {
            el.classList.add('fade-out');
            setTimeout(() => {
                this.currentIndex++;
                this.playNext();
            }, 1000); // Wait for fade out
        }, current.duration);
    }

    finish() {
        this.container.classList.add('fade-out');
        setTimeout(() => {
            this.container.innerHTML = '';
            this.onComplete();
        }, 2000);
    }
}
