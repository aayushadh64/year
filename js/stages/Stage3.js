window.Stage3 = class Stage3 {
    constructor(container, nextCallback) {
        this.container = container;
        this.onComplete = nextCallback;
        this.chapters = [
            {
                src: 'assets/images/how it started.jpg',
                title: 'How It Started',
                caption: 'The first time I saw you, I knew something was different.'
            },
            {
                src: 'assets/images/How i proposed you.jpg',
                title: 'How I Proposed',
                caption: 'I asked you, and my heart stopped until you said yes.'
            },
            {
                src: 'assets/images/first date.jpg',
                title: 'Our First Date',
                caption: 'Nervous hands, shy smiles, and a memory I will never forget.'
            },
            {
                src: 'assets/images/1000048620.jpg',
                title: 'Our Adventures',
                caption: 'Every place we went became our favorite place.'
            },
            {
                src: 'assets/images/1000048621.jpg',
                title: 'The Little Things',
                caption: 'It was never about grand gestures. It was about you.'
            },
            {
                src: 'assets/images/1000048622.jpg',
                title: 'Right Now',
                caption: 'And here we are. Still smiling. Still us.'
            }
        ];
        this.currentChapter = 0;
    }

    init() {
        this.container.classList.add('stage-3');
        this.showChapter();
    }

    showChapter() {
        if (this.currentChapter >= this.chapters.length) {
            this.onComplete();
            return;
        }

        const data = this.chapters[this.currentChapter];
        this.container.innerHTML = '';

        const wrapper = document.createElement('div');
        wrapper.className = 'center-content fade-in';
        wrapper.style.maxWidth = '500px';

        // Chapter Title
        const title = document.createElement('h2');
        title.innerText = data.title;
        title.style.fontFamily = "'Cinzel', serif";
        title.style.color = '#d90429';
        title.style.marginBottom = '20px';
        title.style.fontSize = '1.8rem';
        wrapper.appendChild(title);

        // Image
        const img = document.createElement('img');
        img.src = data.src;
        img.style.maxWidth = '100%';
        img.style.maxHeight = '40vh';
        img.style.borderRadius = '12px';
        img.style.boxShadow = '0 8px 30px rgba(217, 4, 41, 0.15)';
        img.style.border = '4px solid white';
        img.style.objectFit = 'contain';

        img.onerror = () => {
            img.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.style.width = '300px';
            placeholder.style.height = '200px';
            placeholder.style.background = 'linear-gradient(135deg, #fce4ec, #f8bbd0)';
            placeholder.style.border = '2px dashed #d90429';
            placeholder.style.borderRadius = '12px';
            placeholder.style.display = 'flex';
            placeholder.style.alignItems = 'center';
            placeholder.style.justifyContent = 'center';
            placeholder.style.color = '#d90429';
            placeholder.style.margin = '0 auto';
            placeholder.innerText = '📷 Add: ' + data.src.split('/').pop();
            wrapper.insertBefore(placeholder, caption);
        };

        wrapper.appendChild(img);

        // Caption
        const caption = document.createElement('p');
        caption.innerText = data.caption;
        caption.style.marginTop = '20px';
        caption.style.fontSize = '1.1rem';
        caption.style.fontStyle = 'italic';
        caption.style.color = '#5c2434';
        caption.style.lineHeight = '1.6';
        wrapper.appendChild(caption);

        this.container.appendChild(wrapper);

        // Auto-advance
        setTimeout(() => {
            wrapper.classList.remove('fade-in');
            wrapper.classList.add('fade-out');
            setTimeout(() => {
                this.currentChapter++;
                this.showChapter();
            }, 2000);
        }, 5000);
    }
}
