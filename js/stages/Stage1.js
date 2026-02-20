window.Stage1 = class Stage1 {
    constructor(container, nextCallback) {
        this.container = container;
        this.onComplete = nextCallback;
        this.lines = [
            "February 23...",
            "One year of us.",
            "Of laughter,",
            "Of late-night talks,",
            "Of little moments that meant everything.",
            "This is our story."
        ];
    }

    async init() {
        this.container.classList.add('stage-1');
        await this.sequenceLines();

        // Small pause before moving on
        await new Promise(r => setTimeout(r, 1500));
        this.onComplete();
    }

    async sequenceLines() {
        for (const line of this.lines) {
            await this.typeLine(line);
        }
    }

    typeLine(text) {
        return new Promise(resolve => {
            const p = document.createElement('p');
            p.style.fontSize = '1.8rem';
            p.style.fontFamily = "'Cinzel', serif";
            p.style.letterSpacing = '2px';
            p.style.opacity = '1';
            p.className = 'fade-in';
            p.style.textAlign = 'center';
            p.style.color = '#3d0c11';
            p.style.textShadow = '0 0 8px rgba(255, 182, 193, 0.5)';

            this.container.appendChild(p);

            let i = 0;
            const speed = 80;

            const type = () => {
                if (i < text.length) {
                    p.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    // Check if this is the date line to show counter
                    if (text === "One year of us.") {
                        this.startTimeCounter(p).then(() => resolve());
                    } else {
                        setTimeout(() => {
                            this.fadeOutElement(p).then(() => {
                                p.remove();
                                resolve();
                            });
                        }, 2000);
                    }
                }
            };

            type();
        });
    }

    startTimeCounter(element) {
        return new Promise(resolve => {
            const startDate = new Date('2025-02-23T00:00:00');

            const update = () => {
                const now = new Date();
                const diff = now - startDate;

                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / 1000 / 60) % 60);
                const seconds = Math.floor((diff / 1000) % 60);

                element.innerHTML = `
                    <span style="color:#d90429; font-size: 2.5rem;">${days} Days</span><br>
                    <span style="font-size: 1.5rem; color:#5c2434;">${hours}h ${minutes}m ${seconds}s</span><br>
                    <span style="font-size: 1rem; opacity: 0.7;">together</span>
                `;
            };

            const interval = setInterval(update, 1000);
            update();

            setTimeout(() => {
                clearInterval(interval);
                this.fadeOutElement(element).then(() => {
                    element.remove();
                    resolve();
                });
            }, 5000);
        });
    }

    fadeOutElement(element) {
        return new Promise(resolve => {
            element.classList.remove('fade-in');
            element.classList.add('fade-out');
            setTimeout(resolve, 2000);
        });
    }
}
