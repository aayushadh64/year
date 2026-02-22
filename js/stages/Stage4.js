window.Stage4 = class Stage4 {
    constructor(container, nextCallback) {
        this.container = container;
        this.onComplete = nextCallback;
        this.photos = [
            { img: 'assets/images/1000048625.jpg', caption: "This smile. This is everything." },
            { img: 'assets/images/1000048626.jpg', caption: "I could look at you forever." },
            { img: 'assets/images/1000048627.jpg', caption: "My favorite person. Always." }
        ];
        this.currentIndex = 0;
    }

    init() {
        this.container.classList.add('stage-4');
        this.showPhoto();
    }

    showPhoto() {
        if (this.currentIndex >= this.photos.length) {
            this.onComplete();
            return;
        }

        const data = this.photos[this.currentIndex];
        this.container.innerHTML = '';

        const wrapper = document.createElement('div');
        wrapper.className = 'center-content'; // Removed fade-in
        wrapper.style.maxWidth = '90vw';
        wrapper.style.width = 'fit-content';

        const img = document.createElement('img');
        img.src = data.img;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '65vh';
        img.style.borderRadius = '12px';
        img.style.border = '4px solid white';
        img.style.boxShadow = '0 8px 30px rgba(217, 4, 41, 0.15)';
        img.style.objectFit = 'contain';

        img.onerror = () => {
            img.style.display = 'none';
            const p = document.createElement('div');
            p.style.width = '300px';
            p.style.height = '200px';
            p.style.background = 'linear-gradient(135deg, #fce4ec, #f8bbd0)';
            p.style.color = '#d90429';
            p.style.display = 'flex';
            p.style.alignItems = 'center';
            p.style.justifyContent = 'center';
            p.innerText = '📷 ' + data.img.split('/').pop();
            p.style.border = '4px solid white';
            p.style.borderRadius = '12px';
            p.style.margin = '0 auto';
            wrapper.insertBefore(p, caption);
        };

        wrapper.appendChild(img);

        // Caption
        const caption = document.createElement('p');
        caption.innerText = data.caption;
        caption.style.marginTop = '20px';
        caption.style.fontSize = '1.2rem';
        caption.style.fontStyle = 'italic';
        caption.style.color = '#5c2434';
        wrapper.appendChild(caption);

        this.container.appendChild(wrapper);

        setTimeout(() => {
            wrapper.classList.remove('fade-in');
            wrapper.classList.add('fade-out');
            setTimeout(() => {
                this.currentIndex++;
                this.showPhoto();
            }, 2000);
        }, 4500);
    }
}
