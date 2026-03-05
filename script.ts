class Game {
    private field: Field
    private currentPlayer: Player
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
            if (this.field.getCell(0, i) && this.field.getCell(1, i) && this.field.getCell(2, i) === mark) {
                this.gameOver = true
                return this.gameOver
            }
        }

        for (let i = 0; i < 3; i++) {
            if (this.field.getCell(i, 0) && this.field.getCell(i, 1) && this.field.getCell(i, 2) === mark) {
                this.gameOver = true
                return this.gameOver
            }
        }

        if (this.field.getCell(0, 0) && this.field.getCell(1, 1) && this.field.getCell(2, 2) === mark) {
            this.gameOver = true
            return this.gameOver
        }

        if (this.field.getCell(0, 2) && this.field.getCell(1, 1) && this.field.getCell(2, 0) === mark) {
            this.gameOver = true
            return this.gameOver
        }

        return this.gameOver
    }

    public makeMove(x: number, y: number, player: Player): void {
        this.checkWin(player)

        if(this.gameOver) {
            throw new Error("Игра окончена!")
        }

        if (this.currentPlayer !== player) {
            throw new Error("Не ваш ход!")
        }

        this.field.checkCell(x, y, player.myMark)
        this.currentPlayer = this.currentPlayer === this.players[0] ? this.players[1] : this.players[0]
    }
}

class Field {
    private field: number[][] = [[-1, -1, -1], 
                                [-1, -1, -1], 
                                [-1, -1, -1]];

    public getField(): void {
        console.log(this.field)
    }

    public getCell(x: number, y: number): number {
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

let playerR = new Player(0);
let playerV = new Player(1);
let game = new Game(playerR, playerV);
playerR.move(0, 1, game);
playerV.move(0, 0, game);
playerR.move(1, 1, game);
playerV.move(2, 0, game);
playerR.move(2, 1, game);
game.getField();
