const $ = document.getElementById.bind(document);
const $$ = document.querySelector.bind(document);
const $$all = document.querySelectorAll.bind(document);
let countDownt = 30, currentQuestion = 0, chooseAnswer = -1, lastCurrentCorrect = 0 ,namePlayer='';
class ui {
    constructor() {
    
    }
    showScreen(screenName) {
        let screens = $$all('.hide');
        screens.forEach((screen) => {
            screen.style.display = 'none';
        });
        let currentScreen = $(screenName);
        currentScreen.style.display = 'block';
    }
    onStartBtnClick(callDialog){
        let startBtn = $('startBtn');
        startBtn.addEventListener('click', callDialog);
    }
    okBtnClick(callGame) {
        let okBtn = $('btnOk');
        okBtn.addEventListener('click', callGame);
    }
    btnHomeClick(backHome){
        let homeBtn = $('btnHome');
        homeBtn.addEventListener('click', backHome);
    }
    getNamePlayer(){
        namePlayer = $('inputNamePlayer').value;
        if(namePlayer!=""){
            $('namePlayer').innerHTML = namePlayer;
            $('namePlayerWinner').innerHTML = namePlayer;
            $('divInputName').style.display = 'none';
        }
        else{
            $('alarmName').innerHTML = 'Chưa nhập tên người chơi!!';
            $('alarmName').style.color = 'red';
        }
        return namePlayer;
    }
    srcPlayerMove(){
        let player = $('srcPlayer');
        player.style.left = '35vw';
        player.style.bottom = '-6vh';
        player.style.opacity = '1';
    }
    scrPeopleMove() {
        let mc = $('srcMc');
        mc.style.right = '2vw';
        mc.style.opacity = '1';
        let player = $('srcPlayer');
        player.style.left = '5vw';
        player.style.opacity = '1';
    }
    showQuestion(questions) {
        if(currentQuestion<15){
            $('divNamePlayer').style.display = 'block';
            $('divTime').style.display = 'block';
            $('divRewardLevel').style.display = 'block';
            $('question').innerHTML = questions[currentQuestion].question;
            let shuffleAnswer = questions[currentQuestion].answers.sort(() => Math.random() - 0.5);
            for (var i = 0; i <= 3; i++) {
                $(`answer_${i}`).innerHTML = shuffleAnswer[i];
            }
        }
    }
    showCorrectAnswer(questions) {
        if ($(`answer_${chooseAnswer}`).textContent == questions[currentQuestion].correct) {
            $(`divAnswer_${chooseAnswer}`).classList.add('blinkAnswer');
            if (chooseAnswer < 2) {
                $(`divAnswer_${chooseAnswer}`).style.backgroundImage = "url('./img/answer-correct-left.png')";

            } else {
                $(`divAnswer_${chooseAnswer}`).style.backgroundImage = "url('./img/answer-correct-right.png')";
            }
            currentQuestion++;
            lastCurrentCorrect = currentQuestion;
        } else {
            for (var i = 0; i <= 3; i++) {
                if ($(`answer_${i}`).textContent == questions[currentQuestion].correct && i < 2) {
                    $(`divAnswer_${i}`).style.backgroundImage = "url('./img/answer-correct-left.png')";
                    $(`divAnswer_${i}`).classList.add('blinkAnswer');
                } else if ($(`answer_${i}`).textContent == questions[currentQuestion].correct && i > 1) {
                    $(`divAnswer_${i}`).style.backgroundImage = "url('./img/answer-correct-right.png')";
                    $(`divAnswer_${i}`).classList.add('blinkAnswer');
                }
            }
            currentQuestion = 0;
        }
        chooseAnswer =-1;
    }
    clickAnswer(index) {
        $('divAnswer_0').addEventListener('click', () => index(0));
        $('divAnswer_1').addEventListener('click', () => index(1));
        $('divAnswer_2').addEventListener('click', () => index(2));
        $('divAnswer_3').addEventListener('click', () => index(3));
    }
    clickAnswerBg(index) {
        let ele = $$all('.answer');
        if ( index < 2) {
            $(`divAnswer_${index}`).style.backgroundImage = "url('./img/answer-select-left.png')";
            chooseAnswer = index;
        }
        if (index > 1) {
            $(`divAnswer_${index}`).style.backgroundImage = "url('./img/answer-select-right.png')";
            chooseAnswer = index;
        }
        ele.forEach((elem) => {
            elem.classList.remove('answerHover')
        })
    }
    checkAnswer(soundCorrect, soundWrong){
        var soundUsed;
        if(currentQuestion>0){
            soundUsed = soundCorrect;
        }
        else{
            soundUsed = soundWrong;
        }
        soundUsed.start();
    }
    rewardLevel(){
        if(currentQuestion>0){
            $(`divReward-${currentQuestion}`).classList.add('bgWinnerReward');
        }
    }
    resetRewardLevel(){
            if(currentQuestion>=2){
                $(`divReward-${currentQuestion-1}`).classList.remove('bgWinnerReward');
            }
    }
    showReward(){
        $('winnerReward').innerHTML = lastCurrentCorrect>0?  $(`reward-${lastCurrentCorrect}`).textContent : '0$';
    }
    timeCountDown() {
        countDownt--;
        $('divTime').innerHTML = countDownt;
    }
    checkTime() {
            return parseInt(document.getElementById('divTime').textContent);
    }
    stopCountDown(timer) {
        clearInterval(timer);
        countDownt = 30;
    }
   
    resetAnimation() {
        $('answer_0').value='';
        $('answer_1').value='';
        $('answer_2').value='';
        $('answer_3').value='';
        $('divTime').innerHTML=30;
        countDownt=30;
        let ele = $$all('.answer');
        ele.forEach((elem) => {
            elem.classList.remove('blinkAnswer'),
                elem.classList.add('answerHover')
        })
        $$all('.answerGroupLeft > div').forEach((eDiv) => {
            eDiv.style.backgroundImage = "url('./img/graphic-answer-left.png')";
        })
        $$all('.answerGroupRight > div').forEach((eDiv) => {
            eDiv.style.backgroundImage = "url('./img/graphic-answer-right.png')";
        })
    }
    
}