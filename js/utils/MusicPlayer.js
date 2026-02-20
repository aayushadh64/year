window.MusicPlayer = class MusicPlayer {
    constructor() {
        this.audio = new Audio('assets/audio/the_mountain-romantic-481761.mp3');
        this.audio.loop = true;
        this.audio.volume = 0.5;
        this.isPlaying = false;
    }

    play() {
        if (!this.isPlaying) {
            this.audio.play().then(() => {
                this.isPlaying = true;
                this.fadeIn();
            }).catch(e => console.log("Audio play failed (interaction needed):", e));
        }
    }

    pause() {
        if (this.isPlaying) {
            this.fadeOut(() => {
                this.audio.pause();
                this.isPlaying = false;
            });
        }
    }

    toggle() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    setSource(src) {
        // Change track smoothly
        this.fadeOut(() => {
            this.audio.src = src;
            this.audio.play();
            this.fadeIn();
        });
    }

    fadeIn() {
        this.audio.volume = 0;
        const fadeInterval = setInterval(() => {
            if (this.audio.volume < 0.5) {
                this.audio.volume = Math.min(0.5, this.audio.volume + 0.05);
            } else {
                clearInterval(fadeInterval);
            }
        }, 200);
    }

    fadeOut(callback) {
        const fadeInterval = setInterval(() => {
            if (this.audio.volume > 0.05) {
                this.audio.volume -= 0.05;
            } else {
                clearInterval(fadeInterval);
                if (callback) callback();
            }
        }, 200);
    }
}
