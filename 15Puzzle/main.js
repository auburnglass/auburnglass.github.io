'use strict';

(() => {
    class Puzzle {
        constructor(canvas, level) {
            this.canvas = canvas;
            this.level = level;
            this.tiles = [
                [0, 1, 2, 3],
                [4, 5, 6, 7],
                [8, 9, 10, 11],
                [12, 13, 14, 15],
            ];

            // 配列を使うことでswitchでの分岐を簡単に書く
            this.UDLR = [
                [0, -1], //up
                [0, 1], // down
                [-1, 0], // left
                [1, 0], // right
            ];

            this.isCompleted = false;
            this.ctx = this.canvas.getContext('2d');
            this.img = document.createElement('img');
            this.img.src = 'img/15puzzle.png';

            // ロード時にタイルと読み込む
            this.img.addEventListener('load', () => {
                this.render();
            });

            // タイルがクリックされた時の動作
            this.canvas.addEventListener('click', e => {
                // ゲームをクリアした場合はタイルを動かさない
                if (this.isCompleted === true) {
                    return;
                }
                const rect = this.canvas.getBoundingClientRect();

                // どこのタイルがクリックされたか確認
                const col = Math.floor((e.clientX - rect.left) / 70);
                const row = Math.floor((e.clientY - rect.top) / 70);
                console.log(col, row);
                
                // 空きタイルと交換して再描画
                this.swapTiles(col, row);
                this.render();

                if (this.isComplete() === true) {
                    this.isCompleted = true;
                    this.renderGamerClear();
                }
            });

            // 初期状態がゲームクリア状態の場合はシャッフルしなおす
            // levelを2にした場合などで確認できる
            do {
                this.shuffle(this.level);
            } while (this.isComplete() === true);
        }

        shuffle(n) {
            // 空白タイルの初期位置
            let blankCol = 3;
            let blankRow = 3;

            
            for (let i = 0; i < n; i++) {
                let destCol;
                let destRow;

                do {
                    const dir = Math.floor(Math.random() * 4); 
                    
                    // プロパティに設定した値を使用して
                    destCol = blankCol + this.UDLR[dir][0];
                    destRow = blankRow + this.UDLR[dir][1];

                    
                    // switch (dir) {
                    //     case 0: // up
                    //         destCol = blankCol;
                    //         destRow = blankRow - 1;
                    //         break;
                    //     case 1: // down
                    //         destCol = blankCol;
                    //         destRow = blankRow + 1;
                    //         break;
                    //     case 2: // left
                    //         destCol = blankCol - 1;
                    //         destRow = blankRow;
                    //         break;
                    //     case 3: // right 
                    //         destCol = blankCol + 1;
                    //         destRow = blankRow;
                    //         break;
                    // }
                } while (this.isOutside(destCol, destRow) === true);
                 // タイルの範囲外はやり直し

                
                // タイルを更新
                [
                    this.tiles[blankRow][blankCol],
                    this.tiles[destRow][destCol],
                ] = [
                    this.tiles[destRow][destCol],
                    this.tiles[blankRow][blankCol],
                ];

                // 空白タイルの位置を更新
                [blankCol, blankRow] = [destCol, destRow];
            }
        }

        swapTiles(col, row) {
            if (this.tiles[row][col] === 15) {
                return; 
            }

            for (let i = 0; i < 4; i++) {
                const destCol = col + this.UDLR[i][0];
                const destRow = row + this.UDLR[i][1];

                // switch (i) {
                //     case 0: // up
                //         destCol = col;
                //         destRow = row - 1;
                //         break;
                //     case 1: // down
                //         destCol = col;
                //         destRow = row + 1;
                //         break;
                //     case 2: // left
                //         destCol = col - 1;
                //         destRow = row;
                //         break;
                //     case 3: // right 
                //         destCol = col + 1;
                //         destRow = row;
                //         break;
                // }

                // 配列の範囲外の数値の場合は無視
                if (this.isOutside(destCol, destRow) === true) {
                    continue;
                }

                // 分割代入を使って位置を入れ替え
                if (this.tiles[destRow][destCol] === 15) {
                    [
                        this.tiles[row][col], 
                        this.tiles[destRow][destCol]
                    ] = [
                        this.tiles[destRow][destCol], 
                        this.tiles[row][col]
                    ];
                    break;
                }
            }
        }

        isOutside (destCol, destRow) {
            return (
                destCol < 0 || destCol > 3 ||
                    destRow < 0 || destRow > 3
            );
        }
        
        isComplete() {
            let checkNum = 0;
            for (let row = 0; row < 4; row++) {
                for (let col = 0; col < 4; col++) {
                    if(this.tiles[row][col] !== checkNum++) {
                        return false;
                    }
                }
            }
            return true;
        }

        // ゲームクリア画面
        renderGamerClear() {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.font = '28px Arial';
            this.ctx.fillStyle = '#fff';
            this.ctx.fillText('GAME CLEAR!!', 40, 150);
        }

        render() {
            for (let row = 0; row < 4; row++) {
                for (let col = 0; col < 4; col++) {
                    this.renderTile(this.tiles[row][col], col, row);
                }
            }
        }

        renderTile(n, col, row) {
            this.ctx.drawImage(
                this.img,
                (n % 4) * 70, Math.floor(n / 4) * 70, 70, 70,
                col * 70, row * 70, 70, 70
            );
        }
    }

    const canvas = document.querySelector('canvas');

    // この処理のために即時関数で全体を囲む
    if (typeof canvas.getContext === 'undefined') {
        return;
    }

    new Puzzle(canvas, 2);
})();