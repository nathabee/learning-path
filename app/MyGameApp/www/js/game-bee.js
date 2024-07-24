const GRID_SIZE = 10;
const NB_BIRD_DEMENTIA = 3;
const NB_BIRD_ILL = 10;

let beePosition = { x: 0, y: 0 };
let flowerPosition = { x: 2, y: 2 };
let birdPosition = { x: 5, y: 5 };
let birdActive = true;
let birdIllCounter = 0;

let snakePositions = [
    { x: 7, y: 7 },
    { x: 7, y: 6 },
    { x: 7, y: 5 },
    { x: 7, y: 4 },
    { x: 7, y: 3 }
]; // Initial snake position with length 5

let highestScore = 50;  // Variable to hold the current score
let motivationPoints = 50;  // Variable to hold the current score
let movesWithoutFlower = 0;
let birdMoveCounter = 0;

let height = 50;
let width = 50;
var beeImg = document.createElement("img");
beeImg.src = 'img/bee.png';
beeImg.setAttribute("height", height);
beeImg.setAttribute("width", width);
beeImg.className = "classImg"; 
var snakeImg = document.createElement("img");
snakeImg.src = 'img/snake.png';
snakeImg.setAttribute("height", height);
snakeImg.setAttribute("width", width);
snakeImg.className = "classImg"; 
var birdImg = document.createElement("img");
birdImg.src = 'img/bird.png';
birdImg.setAttribute("height", height);
birdImg.setAttribute("width", width);
birdImg.className = "classImg"; 
var flowerImg = document.createElement("img");
flowerImg.src = 'img/flower.png';
flowerImg.setAttribute("height", height);
flowerImg.setAttribute("width", width);
flowerImg.className = "classImg"; 

/************************************* */
 
// Create text nodes for the title
var textNode1 = document.createTextNode(" wants to eat "); 
var textNode2 = document.createTextNode(" Get your distance from the snake and the ");

const gameTitle1 = document.getElementById('gameTitle1');
const img1 = document.createElement('img');
img1.src = 'img/bee.png';
img1.setAttribute("height", height);
img1.setAttribute("width", width);
gameTitle1.appendChild(img1); 

gameTitle1.appendChild(textNode1);
const img2 = document.createElement('img');
img2.src = 'img/flower.png';
img2.setAttribute("height", height);
img2.setAttribute("width", width);
gameTitle1.appendChild(img2);

const gameTitle2 = document.getElementById('gameTitle2');
gameTitle2.appendChild(textNode2);
const img3 = document.createElement('img');
img3.src = 'img/bird.png';
img3.setAttribute("height", height);
img3.setAttribute("width", width);
gameTitle2.appendChild(img3);
 
/************************************************************************************* */

function createGameBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 50px)`;
    gameBoard.style.gridTemplateRows = `repeat(${GRID_SIZE}, 50px)`;
    gameBoard.innerHTML = '';
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            const field = document.createElement('div');
            field.classList.add('field');
            field.id = `field-${x}-${y}`;
            gameBoard.appendChild(field);
        }
    }
    updateGameBoard();
}

function moveBee(direction) {
    logMessage('Moving bee ' + direction);
    switch (direction) {
        case 'up':
            if (beePosition.y > 0) beePosition.y--;
            break;
        case 'down':
            if (beePosition.y < GRID_SIZE - 1) beePosition.y++;
            break;
        case 'left':
            if (beePosition.x > 0) beePosition.x--;
            break;
        case 'right':
            if (beePosition.x < GRID_SIZE - 1) beePosition.x++;
            break;
    }
    movesWithoutFlower++;
    birdMoveCounter++;
    moveBird();
    moveSnake();
    if (movesWithoutFlower >= GRID_SIZE * 2) {
        moveFlower();
        movesWithoutFlower = 0;
    }
    updateGameBoard();
    checkGameStatus();
}

function moveBird() {
    if (!birdActive) {
        birdIllCounter--;
        if (birdIllCounter <= 0) {
            birdActive = true;
        }
        return;
    }

    if (birdMoveCounter >= NB_BIRD_DEMENTIA) {
        moveBirdToRandomAdjacentPosition();
        birdMoveCounter = 0;
    } else {
        const dx = beePosition.x - birdPosition.x;
        const dy = beePosition.y - birdPosition.y;

        if (Math.abs(dx) > Math.abs(dy)) {
            birdPosition.x += Math.sign(dx);
        } else {
            birdPosition.y += Math.sign(dy);
        }
    }
}

function moveFlower() {
    let newX, newY;
    do {
        newX = Math.floor(Math.random() * GRID_SIZE);
        newY = Math.floor(Math.random() * GRID_SIZE);
    } while (isOccupied(newX, newY));
    flowerPosition = { x: newX, y: newY };
}

function moveBirdToRandomAdjacentPosition() {
    const possibleMoves = [
        { x: birdPosition.x - 1, y: birdPosition.y },
        { x: birdPosition.x + 1, y: birdPosition.y },
        { x: birdPosition.x, y: birdPosition.y - 1 },
        { x: birdPosition.x, y: birdPosition.y + 1 }
    ];
    const validMoves = possibleMoves.filter(pos => 
        pos.x >= 0 && pos.x < GRID_SIZE &&
        pos.y >= 0 && pos.y < GRID_SIZE &&
        !isOccupied(pos.x, pos.y)
    );
    if (validMoves.length > 0) {
        const randomIndex = Math.floor(Math.random() * validMoves.length);
        birdPosition = validMoves[randomIndex];
    }
}

function moveSnake() {
    const head = snakePositions[0];
    const possibleMoves = [
        { x: head.x - 1, y: head.y },
        { x: head.x + 1, y: head.y },
        { x: head.x, y: head.y - 1 },
        { x: head.x, y: head.y + 1 }
    ];
    const validMoves = possibleMoves.filter(pos => 
        pos.x >= 0 && pos.x < GRID_SIZE &&
        pos.y >= 0 && pos.y < GRID_SIZE &&
        !isOccupied(pos.x, pos.y)
    );

    if (validMoves.length > 0) {
        const randomIndex = Math.floor(Math.random() * validMoves.length);
        const newHead = validMoves[randomIndex];

        snakePositions.unshift(newHead);
        snakePositions.pop();

        if (newHead.x === birdPosition.x && newHead.y === birdPosition.y) {
            birdActive = false;
            birdIllCounter = NB_BIRD_ILL;
        }
    }
}

function isOccupied(x, y) {
    return (x === beePosition.x && y === beePosition.y) ||
           (x === flowerPosition.x && y === flowerPosition.y) ||
           snakePositions.some(segment => segment.x === x && segment.y === y);
}

function updateGameBoard() {
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            const field = document.getElementById(`field-${x}-${y}`);
            field.className = 'field'; // Reset classes
            field.innerHTML = ''; // Clear content
            if (x === beePosition.x && y === beePosition.y) {
                field.appendChild(beeImg);
            } else if (x === flowerPosition.x && y === flowerPosition.y) {
                field.appendChild(flowerImg);
            } else if (x === birdPosition.x && y === birdPosition.y) {
                field.appendChild(birdImg);
            } else if (snakePositions.some(segment => segment.x === x && segment.y === y)) {
                field.classList.add('snake');
                field.innerHTML = 'S'; // Display S for Snake
            }
        }
    }
    document.getElementById('motivation').innerText = `Motivation: ${motivationPoints}`;
 
    getHighestScore(function(highestScore) {
        console.log('Highest Score:', highestScore);
        document.getElementById('highestscore').textContent = 'Highest Score: ' + highestScore;
    });
}

// Function to show confetti and play applause sound
function celebrateWin() {
    const confettiContainer = document.getElementById('confettiContainer');
    const numConfetti = 50; // Number of confetti pieces
    for (let i = 0; i < numConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}%`; // Random horizontal position
        confetti.style.animationDelay = `${Math.random() * 2}s`; // Random delay
        confettiContainer.appendChild(confetti);
    }
    
    const applauseSound = document.getElementById('applauseSound');
    applauseSound.currentTime = 0; // Reset audio to start
    applauseSound.play();
}

// Function to play boo sound
function playBooSound() {
    const booSound = document.getElementById('booSound');
    booSound.currentTime = 0; // Reset audio to start
    booSound.play();
}

function checkGameStatus() {
    if (beePosition.x === flowerPosition.x && beePosition.y === flowerPosition.y) {
        motivationPoints += 1;
        moveFlower();
        movesWithoutFlower = 0;
    }

    if (beePosition.x === birdPosition.x && beePosition.y === birdPosition.y) {
        motivationPoints -= 10;
        moveBirdToRandomPosition();
        if (motivationPoints <= 0) {
            alert('LOST GAME : no Motivation anymore, the bird was too hard on the bee');
            resetGame();
            playBooSound();
        }
    }

    if (snakePositions.some(segment => segment.x === beePosition.x && segment.y === beePosition.y)) {
        alert('LOST GAME : The Bee was eaten by the snake');
        resetGame();
        playBooSound();
    }

    if (snakePositions.some(segment => segment.x === birdPosition.x && segment.y === birdPosition.y)) {
        alert('WINNER! The Bird was eaten by the snake');
        celebrateWin();
        resetGame();
    }
}

function moveBirdToRandomPosition() {
    let newX, newY;
    do {
        newX = Math.floor(Math.random() * GRID_SIZE);
        newY = Math.floor(Math.random() * GRID_SIZE);
    } while (isOccupied(newX, newY));
    birdPosition = { x: newX, y: newY };
}

function resetGame() {
    saveScore('PlayerName', motivationPoints);

    beePosition = { x: 0, y: 0 };
    flowerPosition = { x: 2, y: 2 };
    birdPosition = { x: 5, y: 5 };
    birdActive = true;
    snakePositions = [
        { x: 7, y: 7 },
        { x: 7, y: 6 },
        { x: 7, y: 5 },
        { x: 7, y: 4 },
        { x: 7, y: 3 }
    ]; // Reset initial snake position
    motivationPoints = 50;
    movesWithoutFlower = 0;
    birdMoveCounter = 0;
    birdIllCounter = 0;

    updateGameBoard();
}

// Function to save the current score
function saveScore(name, score) {
    addScore(name, score);

    if (score > highestScore) {
        console.log('New High Score: ' + score);
        alert("New High Score: " + score);
    }
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            moveBee('up');
            break;
        case 'ArrowDown':
            moveBee('down');
            break;
        case 'ArrowLeft':
            moveBee('left');
            break;
        case 'ArrowRight':
            moveBee('right');
            break;
    }
});

createGameBoard();
