function game() {
    const actions = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    const userWinResults = ['scissorspaper', 'paperrock', 'rocklizard', 'lizardspock', 'spockscissors',
    'rockscissors', 'scissorslizard', 'lizardpaper', 'paperspock', 'spockrock'];
    let userChoice = '';
    let compChoice = '';
    const userChoiceElement = document.querySelector('.user-choice');
    const pickedElement = document.querySelector('.picked');
    const userPickElement = document.querySelector('.user-pick');
    const pcPickElement = document.querySelector('.pc-pick');
    const resultElement = document.querySelector('.result');
    const resultTitleElement = resultElement.querySelector('.title');
    const scoreCountElement = document.querySelector('.score-count');

    let currentScore = null;

    window.addEventListener('load', () => {
        retrieveScoreFromLocalStorage();
    
        document.querySelectorAll('.user-choice .game-card').forEach(card => {
            card.addEventListener('click', (ev) => {
                userChoice = getUserChoice(ev.target);
                compChoice = getComputerChoice();
    
                startGame();
            })
        });

        resultElement.querySelector('button').addEventListener('click', tryAgain);
    
    })
    
    function startGame() {
        calculateWinner(userChoice, compChoice);
        userChoiceElement.classList.add('hidden');
        pickedElement.classList.remove('hidden');
        clearResultBeforeAppend();
        buildChoiceElement(true, userChoice);
        buildChoiceElement(false, compChoice);
    }
    
    function getUserChoice(target) {
        if (target.nodeName === 'IMG') {
            return target.parentElement.classList[1];
        }
        return target.classList[1];
    }
    
    function getComputerChoice() {
        return actions[Math.floor(Math.random() * 5)];
    }

    function calculateWinner(user, comp) {
        if (user === comp) {
            resultTitleElement.innerText = 'Tie';
        } else if (getUserWinsStatus(user + comp)) {
            resultTitleElement.innerText = 'You win';
            calculateScore(1);
        } else {
            resultTitleElement.innerText = 'You lose';
            calculateScore(-1);
        }
    }

    function getUserWinsStatus(result) {
        return userWinResults.some(winStr => winStr === result);
    }

    function buildChoiceElement(isItUserElement, className) {
        const el = document.createElement('div');
        el.classList = [`game-card ${className}`];
        el.innerHTML = `<img src="/images/icon-${className}.svg" alt="${className}">`;
        if (isItUserElement) {
            userPickElement.append(el);
        } else {
            pcPickElement.append(el);
        }
    }

    function tryAgain() {
        userChoiceElement.classList.remove('hidden');
        pickedElement.classList.add('hidden');
    }

    function clearResultBeforeAppend() {
        userPickElement.innerHTML = '';
        pcPickElement.innerHTML = '';
    }

    function calculateScore(roundResult) {
        currentScore += roundResult;
        updateScoreBoard();
    }

    function retrieveScoreFromLocalStorage() {
        const score = +window.localStorage.getItem('gameScore') || 0;
        currentScore = score;
        updateScoreBoard();
    }

    function updateScoreBoard() {
        scoreCountElement.innerText = currentScore;
        window.localStorage.setItem('gameScore', currentScore);
    }

    //work with modal
    const rulesBtn = document.querySelector('.rules-btn');
    const modalBg = document.querySelector('.modal-bg');
    const modal = document.querySelector('.modal');

    rulesBtn.addEventListener('click', () => {
        modal.classList.add('active');
        modalBg.classList.add('active');
    });

    modalBg.addEventListener('click', (event) => {
        if (event.target === modalBg) {
            hideModal();
        }
    });

    document.querySelector('.close').addEventListener('click', hideModal);

    function hideModal() {
        modal.classList.remove('active');
        modalBg.classList.remove('active');  
    }
}

game();