import { Cell } from "./Cell"
import { Colors } from "./Colors";
import { Pawn } from "./figures/Pawn";
import { King } from "./figures/King";
import { Bishop } from "./figures/Bishop";
import { Knight } from "./figures/Knight";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";

export class Board {
    cells: Cell[][] = [];

    public initCells() {
        for (let y = 0; y < 8; y++) {
            const row: Cell[] = [];
            
            for (let x = 0; x < 8; x++) {
                if ((y + x) %2 !== 0) {
                    row.push(new Cell(this, x, y, Colors.BLACK, null)); // black
                } else {
                    row.push(new Cell(this, x, y, Colors.WHITE, null)); // white
                }
            }

            this.cells.push(row);
        }
    }
    
    public getCell(x: number, y: number) {
        return this.cells[y][x];
    }

    public hightlightCells(selectedCell: Cell | null) {
        for (let y = 0; y < this.cells.length; y++) {
            const row = this.cells[y];
            
            for (let x = 0; x < row.length; x++) {
               const target = row[x];
               target.available = !!selectedCell?.figure?.canMove(target);
            }
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;

        return newBoard;
    }

    public addFigures() {
        this.addBishop();
        this.addKing();
        this.addKnight();
        this.addPawn();
        this.addQueen();
        this.addRook();
    }

    private addBishop() {
        new Bishop(Colors.BLACK, this.getCell(2, 0));
        new Bishop(Colors.BLACK, this.getCell(5, 0));

        new Bishop(Colors.WHITE, this.getCell(2, 7));
        new Bishop(Colors.WHITE, this.getCell(5, 7));
    }

    private addKing() {
        new King(Colors.BLACK, this.getCell(4, 0));
        new King(Colors.WHITE, this.getCell(4, 7));
    }

    private addKnight() {
        new Knight(Colors.BLACK, this.getCell(1, 0));
        new Knight(Colors.BLACK, this.getCell(6, 0));

        new Knight(Colors.WHITE, this.getCell(1, 7));
        new Knight(Colors.WHITE, this.getCell(6, 7));
    }

    private addPawn() {
        for (let i = 0; i < 8; i++) {
            new Pawn(Colors.BLACK, this.getCell(i, 1));
            new Pawn(Colors.WHITE, this.getCell(i, 6));
        }
    }

    private addQueen() {
        new Queen(Colors.BLACK, this.getCell(3, 0));
        new Queen(Colors.WHITE, this.getCell(3, 7));
    }

    private addRook() {
        new Rook(Colors.BLACK, this.getCell(0, 0));
        new Rook(Colors.BLACK, this.getCell(7, 0));

        new Rook(Colors.WHITE, this.getCell(0, 7));
        new Rook(Colors.WHITE, this.getCell(7, 7));
    }
}
