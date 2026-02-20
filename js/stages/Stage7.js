window.Stage7 = class Stage7 {
    constructor(container, nextCallback) {
        this.container = container;
        this.onComplete = nextCallback;
    }

    init() {
        this.container.classList.add('stage-7');

        const envelope = document.createElement('div');
        envelope.className = 'envelope fade-in';
        envelope.innerHTML = `
            <div class="envelope-body">💌</div>
            <p style="margin-top: 10px; font-family:'Cinzel', serif; color:#d90429;">Click to Open</p>
        `;
        envelope.style.cursor = 'pointer';
        envelope.style.fontSize = '5rem';
        envelope.style.textAlign = 'center';
        envelope.style.animation = 'float 3s infinite ease-in-out';

        envelope.addEventListener('click', () => {
            envelope.style.animation = 'none';
            envelope.classList.add('fade-out');

            // Smooth dim music
            if (window.musicPlayer && window.musicPlayer.audio) {
                let vol = window.musicPlayer.audio.volume;
                const fade = setInterval(() => {
                    if (vol > 0.15) {
                        vol -= 0.05;
                        window.musicPlayer.audio.volume = vol;
                    } else {
                        clearInterval(fade);
                    }
                }, 100);
            }

            setTimeout(() => {
                envelope.remove();
                this.showLetter();
            }, 1000);
        });

        this.container.appendChild(envelope);
    }

    showLetter() {
        const letter = document.createElement('div');
        letter.className = 'letter-content fade-in';
        letter.style.maxWidth = '600px';
        letter.style.padding = '40px';
        letter.style.background = 'rgba(255,255,255,0.95)';
        letter.style.color = '#3d0c11';
        letter.style.borderRadius = '12px';
        letter.style.boxShadow = '0 10px 40px rgba(217, 4, 41, 0.15)';
        letter.style.position = 'relative';
        letter.style.border = '2px solid #ffb7b2';
        letter.style.margin = '0 auto';
        letter.style.maxHeight = '70vh';
        letter.style.overflow = 'auto';

        letter.innerHTML = `
            <h2 style="font-family:'Cinzel', serif; margin-bottom: 20px; color: #d90429;">My Dearest Dipsana,</h2>
            <p style="margin-bottom: 15px; line-height: 1.8;">
                One year. Can you believe it?
            </p>
            <p style="margin-bottom: 15px; line-height: 1.8;">
                You turned ordinary days into memories I'll keep forever. Every laugh, every argument, every silent moment sitting next to you — it all matters.
            </p>
            <p style="margin-bottom: 15px; line-height: 1.8;">
                Thank you for choosing me. For staying. For being you.
            </p>
            <p style="text-align: right; font-style: italic; margin-top: 30px; font-weight: bold; color: #d90429;">
                Yours, AI ❤️
            </p>
            <button id="close-letter" class="ui-btn" style="margin-top:30px;">Continue →</button>
        `;

        this.container.innerHTML = '';
        const wrap = document.createElement('div');
        wrap.className = 'center-content';
        wrap.appendChild(letter);
        this.container.appendChild(wrap);

        document.getElementById('close-letter').addEventListener('click', () => {
            letter.classList.remove('fade-in');
            letter.classList.add('fade-out');

            // Restore volume
            if (window.musicPlayer && window.musicPlayer.audio) {
                let vol = window.musicPlayer.audio.volume;
                const fade = setInterval(() => {
                    if (vol < 0.5) {
                        vol += 0.05;
                        window.musicPlayer.audio.volume = vol;
                    } else {
                        clearInterval(fade);
                    }
                }, 100);
            }

            setTimeout(() => this.onComplete(), 1000);
        });
    }
}
