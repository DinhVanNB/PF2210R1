let ktBtn, timerCheck, timer;
class altp {
    constructor() {
        this.ui = new ui();
        this.ui.showScreen('srcWelCome');
        this.bgSound = new sound('startGame.mp3');
        this.soundPlayerReady = new sound('playerReady.mp3');
        this.soundCountDownt = new sound('countDown30s.mp3');
        this.soundClap = new sound('clap-clap.mp3');
        this.soundWaitAnswer = new sound('music-wait.mp3');
        this.soundCorrect = new sound('correctsound.mp3');
        this.soundWrong = new sound('music-wrong.mp3');
        this.sound3s = new sound('countdown3s.mp3');
        this.ui.onStartBtnClick(() => {
            this.ui.showScreen('divInputName'),
                this.ui.srcPlayerMove()
        });
        this.ui.okBtnClick(() => {
            if (this.ui.getNamePlayer() != "") {
                this.questions = questions.sort(() => Math.random() - 0.5);
                this.ui.scrPeopleMove();
                this.start();
            }
        });
        this.ui.btnHomeClick(() => {
            this.reload();
        })
        this.bgSound.reload();
        this.bgSound.start();
    }
    start() {
        this.soundPlayerReady.reload();
        this.ui.scrPeopleMove();
        this.ui.resetAnimation();
        this.bgSound.stop();
        this.soundPlayerReady.start();
        this.soundPlayerReady.ended(() => {
            this.gamePlay();
        });
    }
    gamePlay() {
        this.ui.showScreen('srcQuestion');
        this.ui.showQuestion(this.questions);
        setTimeout(() => {
            if (currentQuestion == 0) {
                timer = setInterval(this.ui.timeCountDown, 1000);
                this.soundCountDownt.start();
                ktBtn = true;
            }
        }, 2000)
        this.ui.clickAnswer((index) => {
            if (ktBtn == true) {
                ktBtn = false,
                    this.soundCorrect.reload(),
                    this.soundWrong.reload(),
                    this.soundWaitAnswer.reload(),
                    this.soundWaitAnswer.start(),
                    this.soundCountDownt.stop(),
                    this.soundCountDownt.reload(),
                    this.sound3s.stop(),
                    this.sound3s.reload(),
                    this.ui.stopCountDown(timer),
                    this.ui.clickAnswerBg(index),
                    this.soundWaitAnswer.ended(() => {
                        this.ui.resetRewardLevel(),
                            this.ui.showCorrectAnswer(this.questions),
                            this.ui.rewardLevel(),
                            this.ui.checkAnswer(this.soundCorrect, this.soundWrong)
                    }),
                    this.soundCorrect.ended(() => {
                        if (currentQuestion == 15) {
                            this.stop();
                        } else {
                            this.ui.resetAnimation();
                            this.ui.showQuestion(this.questions);
                        }
                    }),
                    setTimeout(() => {
                        if (currentQuestion > 0 && currentQuestion < 15) {
                            this.soundCountDownt.start();
                            ktBtn = true;
                            timer = setInterval(this.ui.timeCountDown, 1000)
                        }
                    }, 9000)
            }
        });
        timerCheck = setInterval(() => {
            this.sound3s.reload();
            if (this.ui.checkTime() < 4 && ktBtn == true) {
                this.soundCountDownt.stop();
                this.sound3s.start();
            }
            if (this.ui.checkTime() <= 0 & ktBtn == true) {
                this.ui.stopCountDown(timer);
                this.sound3s.stop();
                this.stop();
            }
        }, 1000);
        this.soundWrong.ended(() => {
            this.stop();
        })
    }
    stop() {
        this.soundClap.reload();
        this.soundClap.start();
        this.ui.showScreen('divWinner');
        this.ui.showReward();
        clearInterval(timerCheck);
        this.soundClap.ended(() => this.reload());
    }
    reload() {
        location.reload();
    }
}
var game = new altp();