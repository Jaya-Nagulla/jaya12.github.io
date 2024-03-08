const columns = 7;
const rows = 6;
const dropSound = new Audio('soundtrack1.mp3');
let currentPlayer = 'red'; // Red starts
let gameActive = true;
let board = [];

function initGame() {
    board = Array(rows).fill().map(() => Array(columns).fill(null));
    drawBoard();
    document.getElementById('restartButton').addEventListener('click', restartGame);
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.addEventListener('mouseover', () => {
        gameBoard.style.borderColor = 'blue';
    });
    gameBoard.addEventListener('mouseout', () => {
        gameBoard.style.borderColor = '#333';
    });

}

function drawBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = ''; // Clear the board
    gameBoard.style.gridTemplateColumns = `repeat(${columns}, 50px)`;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const slot = document.createElement('div');
            slot.classList.add('slot');
            slot.dataset.column = c;
            slot.addEventListener('click', () => handleSlotClick(c));
            gameBoard.appendChild(slot);

            const piece = document.createElement('div');
            piece.classList.add('piece');
            if (board[r][c]) {
                piece.classList.add(board[r][c]);
                piece.style.animation = 'dropPiece 0.5s forwards'; // Add the animation
                piece.style.bottom = '5px'; // End position of the animation
            }
            slot.appendChild(piece);
        }
    }
}

function handleSlotClick(column) {
    if (!gameActive) return;

    for (let r = rows - 1; r >= 0; r--) {
        if (board[r][column] === null) {
            board[r][column] = currentPlayer;
            dropSound.play();

            drawBoard();
            if (checkWin(currentPlayer)) {
                const winMessage = document.createElement('div');
                winMessage.id = 'winMessage';
                winMessage.textContent = `${currentPlayer.toUpperCase()} wins!`;
                winMessage.style.animation = 'fadeIn 1s';
                document.body.appendChild(winMessage);
                winMessage.style.display = 'block'; // Show the win message
                gameActive = false;
        
        
        
        
        
                
            }
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            break;
        }
    }
}


function checkWin(player) {
        // Check horizontal
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns - 3; c++) {
                if (board[r][c] === player && board[r][c + 1] === player && board[r][c + 2] === player && board[r][c + 3] === player) {
                    return true;
                }
            }
        }
    
        // Check vertical
        for (let c = 0; c < columns; c++) {
            for (let r = 0; r < rows - 3; r++) {
                if (board[r][c] === player && board[r + 1][c] === player && board[r + 2][c] === player && board[r + 3][c] === player) {
                    return true;
                }
            }
        }
    
        // Check diagonal (bottom left to top right)
        for (let r = 3; r < rows; r++) {
            for (let c = 0; c < columns - 3; c++) {
                if (board[r][c] === player && board[r - 1][c + 1] === player && board[r - 2][c + 2] === player && board[r - 3][c + 3] === player) {
                    return true;
                }
            }
        }
    
        // Check diagonal (top left to bottom right)
        for (let r = 0; r < rows - 3; r++) {
            for (let c = 0; c < columns - 3; c++) {
                if (board[r][c] === player && board[r + 1][c + 1] === player && board[r + 2][c + 2] === player && board[r + 3][c + 3] === player) {
                    return true;
                }
            }
        }
    
        return false;
     }
    
    

function restartGame() {
    currentPlayer = 'red';
    gameActive = true;
    const winMessage = document.getElementById('winMessage');
    if (winMessage) winMessage.remove();
    initGame();
}

window.onload = initGame;
