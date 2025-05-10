const phrases = [
    "Software Developer",
    "Game Developer",
    "Full Stack Developer",
    "Problem Solver",
    "Tech Enthusiast"
];

export class TypingEffect {
    constructor() {
        this.element = document.getElementById('typing-text');
        this.currentPhrase = 0;
        this.currentChar = 0;
        this.isDeleting = false;
        this.typingSpeed = 100;
        this.deletingSpeed = 50;
        this.delayAfterPhrase = 2000;
        this.delayBeforeDelete = 1000;
    }

    type() {
        const currentText = phrases[this.currentPhrase];
        
        if (this.isDeleting) {
            // Deleting text
            this.element.textContent = currentText.substring(0, this.currentChar - 1);
            this.currentChar--;
            
            if (this.currentChar === 0) {
                this.isDeleting = false;
                this.currentPhrase = (this.currentPhrase + 1) % phrases.length;
                setTimeout(() => this.type(), this.typingSpeed);
            } else {
                setTimeout(() => this.type(), this.deletingSpeed);
            }
        } else {
            // Typing text
            this.element.textContent = currentText.substring(0, this.currentChar + 1);
            this.currentChar++;
            
            if (this.currentChar === currentText.length) {
                this.isDeleting = true;
                setTimeout(() => this.type(), this.delayBeforeDelete);
            } else {
                setTimeout(() => this.type(), this.typingSpeed);
            }
        }
    }

    start() {
        this.type();
    }
}
