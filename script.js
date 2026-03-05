"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Game {
    field;
    currentPlayer;
    players;
    gameOver = false;
    constructor(player1, player2) {
        this.field = new Field();
        if (player1.myMark === player2.myMark) {
            throw new Error("Такая метка уже существует!");
        }
        this.players = [player1, player2];
        this.currentPlayer = player1;
    }
    getField() {
        this.field.getField();
    }
    checkWin(player) {
        const mark = player.myMark;
        for (let i = 0; i < 3; i++) {
            if (this.field.getCell(0, i) && this.field.getCell(1, i) && this.field.getCell(2, i) === mark) {
                this.gameOver = true;
                return this.gameOver;
            }
        }
        for (let i = 0; i < 3; i++) {
            if (this.field.getCell(i, 0) && this.field.getCell(i, 1) && this.field.getCell(i, 2) === mark) {
                this.gameOver = true;
                return this.gameOver;
            }
        }
        if (this.field.getCell(0, 0) && this.field.getCell(1, 1) && this.field.getCell(2, 2) === mark) {
            this.gameOver = true;
            return this.gameOver;
        }
        if (this.field.getCell(0, 2) && this.field.getCell(1, 1) && this.field.getCell(2, 0) === mark) {
            this.gameOver = true;
            return this.gameOver;
        }
        return this.gameOver;
    }
    makeMove(x, y, player) {
        this.checkWin(player);
        if (this.gameOver) {
            throw new Error("Игра окончена!");
        }
        if (this.currentPlayer !== player) {
            throw new Error("Не ваш ход!");
        }
        this.field.checkCell(x, y, player.myMark);
        this.currentPlayer = this.currentPlayer === this.players[0] ? this.players[1] : this.players[0];
    }
}
class Field {
    field = [[-1, -1, -1],
        [-1, -1, -1],
        [-1, -1, -1]];
    getField() {
        console.log(this.field);
    }
    getCell(x, y) {
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
let playerR = new Player(0);
let playerV = new Player(1);
let game = new Game(playerR, playerV);
playerR.move(0, 1, game);
playerV.move(0, 0, game);
playerR.move(1, 1, game);
playerV.move(2, 0, game);
playerR.move(2, 1, game);
game.getField();
//# sourceMappingURL=script.js.map