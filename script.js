"use strict";
class Game {
    field;
    players;
    currentPlayer;
    draw = false;
    gameOver = false;
    constructor(player1, player2) {
        this.field = new Field();
        if (player1.myMark === player2.myMark) {
            throw new Error("Такая метка уже существует!");
        }
        this.players = [player1, player2];
        this.currentPlayer = player1;
    }
    get thisField() {
        return this.field;
    }
    checkWin(player) {
        const mark = player.myMark;
        for (let i = 0; i < 3; i++) {
            if ((this.field.getCellValue(0, i) === mark) && (this.field.getCellValue(1, i) === mark) && (this.field.getCellValue(2, i) === mark)) {
                this.gameOver = true;
                this.draw = false;
                return this.gameOver;
            }
        }
        for (let i = 0; i < 3; i++) {
            if ((this.field.getCellValue(i, 0) === mark) && (this.field.getCellValue(i, 1) === mark) && (this.field.getCellValue(i, 2) === mark)) {
                this.gameOver = true;
                this.draw = false;
                return this.gameOver;
            }
        }
        if ((this.field.getCellValue(0, 0) === mark) && (this.field.getCellValue(1, 1) === mark) && (this.field.getCellValue(2, 2) === mark)) {
            this.gameOver = true;
            this.draw = false;
            return this.gameOver;
        }
        if ((this.field.getCellValue(0, 2) === mark) && (this.field.getCellValue(1, 1) === mark) && (this.field.getCellValue(2, 0) === mark)) {
            this.gameOver = true;
            this.draw = false;
            return this.gameOver;
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.field.getCellValue(i, j) === -1) {
                    this.gameOver = false;
                    this.draw = false;
                    return this.gameOver;
                }
            }
        }
        this.gameOver = true;
        this.draw = true;
        return this.gameOver, this.draw;
    }
    makeMove(x, y, player) {
        if (this.gameOver) {
            throw new Error("Игра окончена!");
        }
        if (this.currentPlayer !== player) {
            throw new Error("Не ваш ход!");
        }
        this.field.checkCell(x, y, player.myMark);
        this.currentPlayer = this.currentPlayer === this.players[0] ? this.players[1] : this.players[0];
        this.checkWin(player);
    }
}
class Field {
    field = [[-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]];
    getField() {
        console.log(this.field);
    }
    getCellValue(x, y) {
        if (this.field == undefined) {
            throw new Error("TODO");
        }
        if (this.field[x] == undefined) {
            throw new Error("TODO2");
        }
        return this.field[x][y];
    }
    checkCell(x, y, playerNumber) {
        if (this.field == undefined) {
            throw new Error("TODO");
        }
        if (this.field[x] == undefined) {
            throw new Error("TODO2");
        }
        if (this.field[x][y] !== -1) {
            throw new Error("Ячейка занята!");
        }
        this.field[x][y] = playerNumber;
    }
}
class Player {
    mark;
    constructor(mark) {
        if (mark !== 0 && mark !== 1) {
            throw new Error("Метка игрока должна быть 0 или 1");
        }
        this.mark = mark;
    }
    get myMark() {
        return this.mark;
    }
    move(x, y, game) {
        game.makeMove(x, y, this);
    }
}
window.onload = function () {
    const startButton = document.getElementById("start-game");
    if (startButton) {
        startButton.onclick = startGame;
    }
};
function delay(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            const userConfirm = confirm("Начать заново");
            if (userConfirm) {
                resolve("Пользователь нажал Ok");
            }
            else {
                reject("Пользователь нажал Отмена");
            }
        }, ms);
    });
}
function changeMark(game, cell) {
    let change = document.querySelector(".current-player");
    if (change) {
        if (game.currentPlayer.myMark === 0) {
            change.textContent = "Ход: X";
            cell.textContent = "O";
        }
        if (game.currentPlayer.myMark === 1) {
            change.textContent = "Ход: O";
            cell.textContent = "X";
        }
        if (game.gameOver === true) {
            if (game.draw) {
                change.textContent = "Игра окончена. Ничья!";
            }
            else {
                if (game.currentPlayer.myMark === 0) {
                    change.textContent = "Игра окончена. Победил игрок O!";
                }
                if (game.currentPlayer.myMark === 1) {
                    change.textContent = "Игра окончена. Победил игрок X!";
                }
            }
            delay(1500).then(function () {
                startGame();
            }, function () {
            });
        }
    }
}
function makeTurn(x, y, game, player) {
    player.move(x, y, game);
}
function startGame() {
    const home = document.getElementById("home-screen");
    const game = document.getElementById("game-screen");
    if (home) {
        home.hidden = true;
    }
    if (game) {
        game.hidden = false;
    }
    let playerX = new Player(0);
    let playerO = new Player(1);
    let newGame = new Game(playerX, playerO);
    const cells = document.querySelectorAll(".cell");
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        if (cell) {
            cell.textContent = "";
        }
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let index = 3 * i + j;
            const cell = cells[index];
            if (cell) {
                cell.onclick = function () {
                    console.log(cell);
                    makeTurn(j, i, newGame, newGame.currentPlayer);
                    changeMark(newGame, cell);
                };
            }
        }
    }
}
//# sourceMappingURL=script.js.map