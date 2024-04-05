'use client';

import { useEffect, useState } from 'react';

export default function SudokuGrid({sudokuTable}: {
    sudokuTable: number[][]
}) {
    const [sudoku, setSudoku] = useState(sudokuTable)
    const [currentNum, setCurrentNum] = useState<number>(1)
    
    const nums:number[] = [1,2,3,4,5,6,7,8,9]

    const handleOnCellClick = (rowIndex: number, colIndex:number) => {
        let sudCopy = JSON.parse(JSON.stringify(sudoku));
        if (sudCopy[rowIndex][colIndex] === currentNum) {
            sudCopy[rowIndex][colIndex] = 0
        } else {
            sudCopy[rowIndex][colIndex] = currentNum
        }
        setSudoku(sudCopy)
    }

    const handleOnNumClick = (num:number) => {
        setCurrentNum(num)
    }

    return (

        <div className="grid grid-cols-9 grid-rows-10 items-center justify-center">
            {nums.map(num => (
                <div 
                    key={num} 
                    className={`text-center m-[1px] h-6 border-solid border-[1px] border-stone-300 rounded-sm ${currentNum === num ? "text-bold bg-white hover:cursor-default" : 'hover:-translate-y-1 bg-slate-300'} hover:cursor-pointer`}
                    onClick={() => handleOnNumClick(num)}
                >
                    {num}
                </div>
            ))}
            
            {sudoku.map((row, rowIndex) => (
                row.map((cell, colIndex) => (
                    <div 
                        key={`${rowIndex}-${colIndex}`} 
                        className={`flex text-xl items-center justify-center h-10 w-10 bg-white border-solid border-[1px] border-stone-300 rounded-sm ${ cell === 0 ? "hover:bg-slate-200 hover:cursor-help" : 'hover:cursor-default'} ${rowIndex % 3 === 2 ? 'mb-[1px]' : ''} ${colIndex % 3 === 0 ? 'ml-[1px]' : ''}`}
                        onClick={cell === 0 || cell === currentNum ? () => handleOnCellClick(rowIndex, colIndex) : undefined}
                    >
                        { cell === 0 ? '' : cell }
                    </div>
                ))
            ))}
        </div>
    );
}