'use strict';

(() => {
    class Renderer {
        constructor(canvas) {
            this.ctx = canvas.getContext('2d')
        }
    }

    class Meiro {
        constructor(row, col, canvas) {
            // 棒倒し法では迷路のサイズは縦横奇数でないといけないのでそのためのチェック
            if (row < 5 || col < 5 || row % 2 === 0 || col % 2 === 0) {
                alert('size not vaild');
            }
            this.ctx = canvas.getContext('2d');
            this.row = row;
            this.col = col;

            this.WALL_SIZE = 10;
            // canvasはクラス内で変更するが、クラスで保持するものではない
            canvas.height = this.row * this.WALL_SIZE;
            canvas.width = this.col * this.WALL_SIZE;

            // 1が迷路の壁、0が通路

            // 迷路を作る部分は関数にする
            this.data = this.getData();
        }
        
        getData() {
            const data = [];

            for (let row = 0; row < this.row; row++) {
                // n行番目は最初何も入ってないので空配列を入れる
                data[row] = [];
                for (let col = 0; col < this.col; col++) {
                    data[row][col] = 1;
                }
            }
            // 中身を0で埋める
            for (let row = 1; row < this.row - 1; row++) {
                for (let col = 1; col < this.col - 1; col++) {
                    data[row][col] = 0;
                }
            }
            // 内側の壁(柱)を作成
            for (let row = 2; row < this.row - 2; row += 2) {
                for (let col = 2; col < this.col - 2; col += 2) {
                    data[row][col] = 1;
                }
            }

            // 壁（柱）を上下左右に倒して壁を作る
            for (let row = 2; row < this.row - 2; row += 2) {
                for (let col = 2; col < this.col - 2; col += 2) {
                    let destRow;
                    let destCol;

                    // 倒す先が既に壁だった場合はやり直す
                    do {
                        // 最初の行の柱(この場合のrow=2)にのみ上方向へ倒すことができるようにする
                        const dir = row === 2 ? 
                        Math.floor(Math.random() * 4) : // 0~4
                        Math.floor(Math.random() * 3) + 1; // 1~3
                        
                        switch (dir) {
                            case 0: // 上側に倒す
                                destRow = row - 1;
                                destCol = col;
                                break;
                            case 1: // 下
                                destRow = row + 1;
                                destCol = col;
                                break;
                            case 2: // 左
                                destRow = row;
                                destCol = col - 1;
                                break;
                            case 3: // 右
                                destRow = row;
                                destCol = col + 1;
                                break;
                            default:
                                break;
                        }
                    } while (data[destRow][destCol] === 1);

                    data[destRow][destCol] = 1;
                }
            }


            return data;
        }

        render() {
            for (let row = 0; row < this.data.length; row++) {
                for (let col = 0; col < this.data[row].length; col++) {
                    if (this.data[row][col] === 1) {
                        // fillRect(x座標, y座標, x幅, y幅)
                        this.ctx.fillRect(
                            col * this.WALL_SIZE, 
                            row * this.WALL_SIZE, 
                            this.WALL_SIZE, 
                            this.WALL_SIZE
                        );
                    }
                }
            }
        }
    }

    const canvas = document.querySelector('canvas');
    if (typeof canvas.getContext === 'undefined') {
        return;
    }

    // Meiro(迷路の横の大きさ(行), 列の大きさ, canvas情報)
    const meiro = new Meiro(21, 13, canvas);
    // const meiro = new Meiro(21, 13, new Renderer(canvas));
    meiro.render();

})();