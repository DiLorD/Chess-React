import React, { FC, useEffect, useState } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import CellComponent from "./CellComponent";

interface BoardProps {
    board: Board;
    setBoard:  (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            setSelectedCell(null);
        } else {
            setSelectedCell(cell);
        }
    }

    useEffect(() => {
        hightlightCells();
    }, [selectedCell]);

    function hightlightCells() {
        board.hightlightCells(selectedCell);
        updateBoard();
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <div
        className="board"
        >
        {board.cells.map((row: Cell[], i) => 
            <React.Fragment key={i}>
                {row.map((cell, j) => 
                    <CellComponent 
                        click={click}
                        key={j}
                        cell={cell}
                        selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                    />
                )}
            </React.Fragment>
        )}
        </div>
    );
};

export default BoardComponent;
