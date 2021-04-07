'use strict';
{
    function createColumn(c) {
        const source = [];
        for (let i = 0;i < 15 ; i++) {
            source[i] = i + 1 + 15 * c;
        }
    
        const column = [];
        for (let i = 0; i < 5; i++) {
            column[i] = source.splice(Math.floor(Math.random() * source.length), 1)[0];
        }

        return column;
    }

    function createColumns() {
        const columns = [];
        
        for(let i = 0; i < 5; i++) {
            columns[i] = createColumn(i);
        }
        columns[2][2] = 'FREE';

        console.table(columns)

        return columns;
    }
    
    // function createBingo(columns) {
    //     const bingo = [];
    //     for (let row = 0; row < 5; row++) {
    //         bingo[row] = [];
    //         for (let col = 0; col < 5; col++) {
    //             bingo[row][col] = columns[col][row];
    //         }
    //     }
    //     console.table(bingo);
    //     return bingo
    // }
    function render(columns) {
        for(let row = 0; row < 5; row++) {
            const tr = document.createElement('tr');
            for (let col = 0; col < 5; col++) {
                const td = document.createElement('td');
                td.textContent = columns[col][row]; // 行と列の値を反転
                tr.appendChild(td);
            }
            document.querySelector('tbody').appendChild(tr);
        }
    }

    const columns = createColumns();
    // const bingo = createBingo(columns);
    render(columns);

}