export default function SudokuGrid({sudokuTable}: {
    sudokuTable: number[][]
}) {
    return (
        <div className="grid grid-cols-9 grid-rows-9">
            {sudokuTable.map((row, rowIndex) => (
                row.map((cell, colIndex) => (
                    <div key={`${rowIndex}-${colIndex}`} className="flex text-xl items-center justify-center m-[1px] h-10 w-10 bg-white border-solid border-[1px] border-stone-300 rounded-sm hover:bg-slate-200">
                        {cell === 0 
                            ? ''
                            : cell}
                    </div>
                ))
            ))}
        </div>
    );
}