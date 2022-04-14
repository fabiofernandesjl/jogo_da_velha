const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessage = document.querySelector("[data-winning-message]");
const contentMessage = document.querySelector("[data-content-message]");
const buttonReset = document.querySelector("[data-button-reset]");
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let isCircleTurn;

/* Iniciar game */
const startGame = () => {
    isCircleTurn = false;
    for (const cell of cellElements) {
        cell.classList.remove("x");
        cell.classList.remove("circle");
        cell.removeEventListener('click', handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    }

    setBoardHoverClass();

    contentMessage.classList.remove("show-winning-message");
}

/* Encerrar game */
const endGame = (isDraw) => {
    if (isDraw) {
        winningMessage.innerText = "Empate!";
    } else {
        winningMessage.innerText = isCircleTurn ? "O Venceu!" : "X Venceu!";
    };

    contentMessage.classList.add("show-winning-message");
};

/* Verificar vitória */
const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    })
}

/* Vericar empate */
const checkForDraw = () => {
    return [...cellElements].every((cell) => {
        return cell.classList.contains("x") || cell.classList.contains("circle");
    });
};

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
}

const setBoardHoverClass = () => {
    board.classList.remove('circle');
    board.classList.remove('x');

    if (isCircleTurn) {
        board.classList.add('circle');
    } else {
        board.classList.add('x');
    }
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    setBoardHoverClass();
}
const handleClick = (e) => {
    //Colocacar a marca (X ou Circulo)]
    const cell = e.target;
    const classToAdd = isCircleTurn ? 'circle' : 'x';

    placeMark(cell, classToAdd);

    /* Verificar por vitória */
    const isWin = checkForWin(classToAdd);
    /* Verificar por empate */
    const isDraw = checkForDraw();
    if (isWin) {
        endGame(false);
    } else if (isDraw) {
        endGame(true);
    } else {
    /* Mudar Símbolo */
    swapTurns();
    }

}

startGame();

buttonReset.addEventListener('click', startGame);

