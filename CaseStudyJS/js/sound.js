class sound {
    constructor(fileName) {
        this.audio = new Audio('sound/' + fileName);
    }
    start() {
        this.audio.play();
    }
    reload() {
        this.audio.load();
    }
    ended(soundEnded) {
        this.audio.addEventListener('ended', soundEnded);
    }
    stop() {
        this.audio.pause();
    }
}