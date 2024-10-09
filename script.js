class TextScramble {
    constructor(element) {
        this.element = element;
        this.links = Array.from(this.element.querySelectorAll('a'));
        this.charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.charsetLength = this.charset.length;
        this.init();
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('mouseenter', () => this.startScramble(link));
            link.addEventListener('mouseleave', () => this.stopScramble(link));
        });
    }

    startScramble(link) {
        const text = link.textContent;
        let iteration = 0;

        // Store the original text and hide it
        link.dataset.originalText = text;


        clearInterval(link.intervalId);

        link.intervalId = setInterval(() => {
            link.textContent = '';
            link.textContent = this.generateScrambledText(text, iteration);

            if (iteration >= text.length) {
                clearInterval(link.intervalId);
                link.textContent = text;  // Reveal the original text at the end
            }

            iteration += 1 / 6;
        }, 50);
    }

    stopScramble(link) {
        clearInterval(link.intervalId);
        // Restore the original text immediately
        link.textContent = link.dataset.originalText || link.textContent;
    }

    generateScrambledText(text, iteration) {
        return text
            .split('')
            .map((char, index) => {
                if (index < iteration) {
                    return text[index];
                }
                return this.charset[Math.floor(Math.random() * this.charsetLength)];
            })
            .join('');
    }
}

// Initialize TextScramble
document.addEventListener('DOMContentLoaded', () => {
    const scrambleElements = document.querySelectorAll('[data-text-scramble]');
    scrambleElements.forEach((element) => {
        new TextScramble(element);
    });
});