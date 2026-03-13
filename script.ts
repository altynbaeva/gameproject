class Game {
    private field: Field
    public currentPlayer: Player
    private players: [Player, Player]
    private gameOver: boolean = false

    constructor(player1: Player, player2: Player) {
        this.field = new Field();
        if (player1.myMark === player2.myMark) {
            throw new Error("Такая метка уже существует!")
        }
        this.players = [player1, player2];
        this.currentPlayer = player1;
    }

    public getField(): void {
        this.field.getField()
    }

    private checkWin(player: Player): boolean {
        const mark = player.myMark
        for (let i = 0; i < 3; i++) {
            if ((this.field.getCellValue(0, i) === mark) && (this.field.getCellValue(1, i) === mark) && (this.field.getCellValue(2, i) === mark)) {
                this.gameOver = true
                return this.gameOver
            }
        }

        for (let i = 0; i < 3; i++) {
            if ((this.field.getCellValue(i, 0) === mark) && (this.field.getCellValue(i, 1) === mark) && (this.field.getCellValue(i, 2) === mark)) {
                this.gameOver = true
                return this.gameOver
            }
        }

        if ((this.field.getCellValue(0, 0) === mark) && (this.field.getCellValue(1, 1) === mark) && (this.field.getCellValue(2, 2) === mark)) {
            this.gameOver = true
            return this.gameOver
        }

        if ((this.field.getCellValue(0, 2) === mark) && (this.field.getCellValue(1, 1) === mark) && (this.field.getCellValue(2, 0) === mark)) {
            this.gameOver = true
            return this.gameOver
        }

        return this.gameOver
    }

    public makeMove(x: number, y: number, player: Player): void {

        if (this.gameOver) {
            throw new Error("Игра окончена!")
        }

        if (this.currentPlayer !== player) {
            throw new Error("Не ваш ход!")
        }

        this.field.checkCell(x, y, player.myMark)
        this.currentPlayer = this.currentPlayer === this.players[0] ? this.players[1] : this.players[0]
        this.checkWin(player)
    }
}

class Field {
    private field: number[][] = [[-1, -1, -1], 
                                [-1, -1, -1], 
                                [-1, -1, -1]];

    public getField(): void {
        console.log(this.field)
    }

    public getCellValue(x: number, y: number): number {
        if (this.field == undefined) {
            throw new Error("TODO")
        }

        if (this.field[x] == undefined) {
            throw new Error("TODO2")
        }

        return this.field[x][y]!
    }

    public checkCell(x: number, y: number, playerNumber: number): void {
        if (this.field == undefined) {
            throw new Error("TODO")
        }

        if (this.field[x] == undefined) {
            throw new Error("TODO2")
        }

        if (this.field[x][y] !== -1) {
            throw new Error("Ячейка занята!")
        }

        this.field[x][y] = playerNumber;
    }
}

class Player {
    private mark: number

    constructor(mark: number) {
        if (mark !== 0 && mark !== 1) {
            throw new Error("Метка игрока должна быть 0 или 1")
        }
        
        this.mark = mark;
    }

    public get myMark(): number {
        return this.mark
    }

    public move(x: number, y: number, game: Game): void {
        game.makeMove(x, y, this)
    }
}

window.onload = function() {
    const startButton = document.getElementById("start-game");
    if (startButton) {
        startButton.onclick = startGame
    } 

    let playerX = new Player(0);
    let playerO = new Player(1);
    let newGame = new Game(playerX, playerO);
    const cells = document.querySelectorAll(".cell");
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let index = 3 * i + j;
            const cell = cells[index];
            if (cell) {
                cell.addEventListener("click", function() {
                console.log(cell);
                makeTurn(j, i, newGame, newGame.currentPlayer);
                changeMark(newGame, cell);
                })
            }
        }
    }
}

function changeMark (game: Game, cell: Element) {
    let change = document.querySelector(".current-player");
    if (change) {
        if (game.currentPlayer.myMark === 0) {
        change.textContent = "Ход: X";
        cell.textContent = "O";
    }   else {
        change.textContent = "Ход: O"
        cell.textContent = "X";
    }
}
}

function makeTurn(x: number, y: number, game: Game, player: Player) {
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
}



/*let playerR = new Player(0);
let playerV = new Player(1);
let game = new Game(playerR, playerV);
playerR.move(0, 1, game);
playerV.move(0, 0, game);
playerR.move(1, 1, game);
playerV.move(2, 0, game);
playerR.move(2, 1, game);
game.getField();*/
