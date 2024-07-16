const GRID_SIZE = 10;
const NB_BAUER_DEMENTIA = 3;
const NB_BAUER_ILL = 10;

let goatPosition = { x: 0, y: 0 };
let cabbagePosition = { x: 2, y: 2 };
let farmerPosition = { x: 5, y: 5 };
let farmerActive = true;
let farmerIllCounter = 0;

let snakePositions = [
    { x: 7, y: 7 },
    { x: 7, y: 6 },
    { x: 7, y: 5 },
    { x: 7, y: 4 },
    { x: 7, y: 3 }
]; // Initial snake position with length 5

let motivationPoints = 50;
let movesWithoutCabbage = 0;
let farmerMoveCounter = 0;

let height = 50;
let width = 50;
var goatImg = document.createElement("img");
goatImg.src = 'goat.png';
goatImg.setAttribute("height", height);
goatImg.setAttribute("width", width);
goatImg.className = "classImg"; 
var snakeImg = document.createElement("img");
snakeImg.src = 'snake.png';
snakeImg.setAttribute("height", height);
snakeImg.setAttribute("width", width);
snakeImg.className = "classImg"; 
var farmerImg = document.createElement("img");
farmerImg.src = 'farmer.png';
farmerImg.setAttribute("height", height);
farmerImg.setAttribute("width", width);
farmerImg.className = "classImg"; 
var cabbageImg = document.createElement("img");
cabbageImg.src = 'cabbage.png';
cabbageImg.setAttribute("height", height);
cabbageImg.setAttribute("width", width);
cabbageImg.className = "classImg"; 
 

/************************************* */
 
 // Create text nodes for the title
var textNode1 = document.createTextNode(" wants to eat "); 
var textNode2 = document.createTextNode(" Get your distance from the snake and the ");

const gameTitle1 = document.getElementById('gameTitle1');
const img1 = document.createElement('img');
img1.src = 'goat.png';
img1.setAttribute("height", height);
img1.setAttribute("width", width);
gameTitle1.appendChild(img1); 

gameTitle1.appendChild(textNode1);
const img2 = document.createElement('img');
img2.src = 'cabbage.png';
img2.setAttribute("height", height);
img2.setAttribute("width", width);
gameTitle1.appendChild(img2);


const gameTitle2 = document.getElementById('gameTitle2');
gameTitle2.appendChild(textNode2);
const img3 = document.createElement('img');
img3.src = 'farmer.png';
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

function moveGoat(direction) {
    switch (direction) {
        case 'up':
            if (goatPosition.y > 0) goatPosition.y--;
            break;
        case 'down':
            if (goatPosition.y < GRID_SIZE - 1) goatPosition.y++;
            break;
        case 'left':
            if (goatPosition.x > 0) goatPosition.x--;
            break;
        case 'right':
            if (goatPosition.x < GRID_SIZE - 1) goatPosition.x++;
            break;
    }
    movesWithoutCabbage++;
    farmerMoveCounter++;
    moveFarmer();
    moveSnake();
    if (movesWithoutCabbage >= GRID_SIZE * 2) {
        moveCabbage();
        movesWithoutCabbage = 0;
    }
    updateGameBoard();
    checkGameStatus();
}

function moveFarmer() {
    if (!farmerActive) {
        farmerIllCounter--;
        if (farmerIllCounter <= 0) {
            farmerActive = true;
        }
        return;
    }

    if (farmerMoveCounter >= NB_BAUER_DEMENTIA) {
        moveFarmerToRandomAdjacentPosition();
        farmerMoveCounter = 0;
    } else {
        const dx = goatPosition.x - farmerPosition.x;
        const dy = goatPosition.y - farmerPosition.y;

        if (Math.abs(dx) > Math.abs(dy)) {
            farmerPosition.x += Math.sign(dx);
        } else {
            farmerPosition.y += Math.sign(dy);
        }
    }
}

function moveCabbage() {
    let newX, newY;
    do {
        newX = Math.floor(Math.random() * GRID_SIZE);
        newY = Math.floor(Math.random() * GRID_SIZE);
    } while (isOccupied(newX, newY));
    cabbagePosition = { x: newX, y: newY };
}

function moveFarmerToRandomAdjacentPosition() {
    const possibleMoves = [
        { x: farmerPosition.x - 1, y: farmerPosition.y },
        { x: farmerPosition.x + 1, y: farmerPosition.y },
        { x: farmerPosition.x, y: farmerPosition.y - 1 },
        { x: farmerPosition.x, y: farmerPosition.y + 1 }
    ];
    const validMoves = possibleMoves.filter(pos => 
        pos.x >= 0 && pos.x < GRID_SIZE &&
        pos.y >= 0 && pos.y < GRID_SIZE &&
        !isOccupied(pos.x, pos.y)
    );
    if (validMoves.length > 0) {
        const randomIndex = Math.floor(Math.random() * validMoves.length);
        farmerPosition = validMoves[randomIndex];
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

        if (newHead.x === farmerPosition.x && newHead.y === farmerPosition.y) {
            farmerActive = false;
            farmerIllCounter = NB_BAUER_ILL;
        }
    }
}

function isOccupied(x, y) {
    return (x === goatPosition.x && y === goatPosition.y) ||
           (x === cabbagePosition.x && y === cabbagePosition.y) ||
           snakePositions.some(segment => segment.x === x && segment.y === y);
}

function updateGameBoard() {
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            const field = document.getElementById(`field-${x}-${y}`);
            field.className = 'field'; // Reset classes
            field.innerHTML = ''; // Clear content
            if (x === goatPosition.x && y === goatPosition.y) {
                //field.classList.add('goat');
                // field.innerHTML = 'Z'; // Display Z for Ziege (Goat)
                field.appendChild(goatImg);
            } else if (x === cabbagePosition.x && y === cabbagePosition.y) {
                //field.classList.add('cabbage');
                //field.innerHTML = 'K'; // Display K for Kohl (Cabbage)
                field.appendChild(cabbageImg);
            } else if (x === farmerPosition.x && y === farmerPosition.y) {
                //field.classList.add('farmer');
                //field.innerHTML = 'B'; // Display B for Bauer (Farmer)
                field.appendChild(farmerImg);
            } else if (snakePositions.some(segment => segment.x === x && segment.y === y)) {
                field.classList.add('snake');
                field.innerHTML = 'S'; // Display S for Schlange (Snake)
                //field.appendChild(snakeImg);
            }
        }
    }
    document.getElementById('motivation').innerText = `Motivation: ${motivationPoints}`;
}

 

// Function to show confetti and play applause sound
function celebrateWin() {
    // Function to show confetti
    const confettiContainer = document.getElementById('confettiContainer');
    const numConfetti = 50; // Number of confetti pieces
    for (let i = 0; i < numConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}%`; // Random horizontal position
        confetti.style.animationDelay = `${Math.random() * 2}s`; // Random delay
        confettiContainer.appendChild(confetti);
    }
    
    // Play applause sound
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
    if (goatPosition.x === cabbagePosition.x && goatPosition.y === cabbagePosition.y) {
        motivationPoints += 1;
        moveCabbage();
        movesWithoutCabbage = 0;
    }

    if (goatPosition.x === farmerPosition.x && goatPosition.y === farmerPosition.y) {
        motivationPoints -= 10;
        moveFarmerToRandomPosition();
        if (motivationPoints <= 0) {
            alert('LOST GAME : no Motivation anmore , the bauer was to hard on the goat');
            resetGame();
            playBooSound();
        }
    }

    if (snakePositions.some(segment => segment.x === goatPosition.x && segment.y === goatPosition.y)) {
        alert('LOST GAME : The Goat was eaten by the snake');
        resetGame();
        playBooSound();
    }

    if (snakePositions.some(segment => segment.x === farmerPosition.x && segment.y === farmerPosition.y)) {
        alert('WINNER ! The Farmer was eaten by the snake');
        
        celebrateWin();
        resetGame();
    }
}

function moveFarmerToRandomPosition() {
    let newX, newY;
    do {
        newX = Math.floor(Math.random() * GRID_SIZE);
        newY = Math.floor(Math.random() * GRID_SIZE);
    } while (isOccupied(newX, newY));
    farmerPosition = { x: newX, y: newY };
}

function resetGame() {
    goatPosition = { x: 0, y: 0 };
    cabbagePosition = { x: 2, y: 2 };
    farmerPosition = { x: 5, y: 5 };
    farmerActive = true;
    snakePositions = [
        { x: 7, y: 7 },
        { x: 7, y: 6 },
        { x: 7, y: 5 },
        { x: 7, y: 4 },
        { x: 7, y: 3 }
    ]; // Reset initial snake position
    motivationPoints = 50;
    movesWithoutCabbage = 0;
    farmerMoveCounter = 0;
    farmerIllCounter = 0;
    updateGameBoard();
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            moveGoat('up');
            break;
        case 'ArrowDown':
            moveGoat('down');
            break;
        case 'ArrowLeft':
            moveGoat('left');
            break;
 
        case 'ArrowRight':
            moveGoat('right');
            break;
    }
});

createGameBoard();
