'use strict';

{
    // Game -> Board -> Panel
    // ゲームボード
    
    class Game {
        constructor(level) {
            this.level = level;
            this.board = new Board(this);
            
            this.currentNum = undefined;
            this.startTime = undefined;
            this.timeoutId = undefined;
            
            const btn = document.getElementById('btn');
            btn.addEventListener('click', () => {
                this.start();
            });

            // セットアップを呼び出してボードの幅を設定
            this.setup();
        }

        //パネルの数が多くなった場合にそれに合わせてcssのスタイルを変更する
        setup() {
            const container = document.getElementById('container');
            const PWIDTH = 50;
            const PADDING = 10;
            container.style.width = PWIDTH * this.level + PADDING * 2 + 'px';
        }

        start() {
            // 既にゲームがスタートしていたらタイマーをリセット
            if (typeof this.timeoutId != 'undefined') {
                clearTimeout(this.timeoutId);
            }
            this.currentNum = 1;
            
            this.board.activate();
            this.startTime = Date.now();
            this.runTimer();
        }
    
        runTimer() {
            const timer = document.getElementById('timer');
            timer.textContent = ((Date.now() - this.startTime) / 1000).toFixed(2);
    
            this.timeoutId = setTimeout(() => {
                this.runTimer();
            }, 10);
        }
        
        // ゲッター セッター
        addCurrentNum() {
            this.currentNum++;
        }
        getCurrentNum() {
            return this.currentNum;
        }

        getTimeoutId() {
            return this.timeoutId;
        }
        getLevel() {
            return this.level;
        }
    }

    class Board {
        constructor(game) {
            this.game = game;
            this.panels = [];
            for (let i = 0; i < this.game.getLevel() ** 2; i++) {
                this.panels.push(new Panel(this.game));
            }
            this.setup();
        }

        setup() {
            const board = document.getElementById('board');
            this.panels.forEach(panel => {
                board.appendChild(panel.getEl());
            });
        }

        activate() {
            const nums = [];

            // 今回は2*2や4*4の正方形にする
            for (let i = 1; i < this.game.getLevel() ** 2 + 1; i++) {
                nums.push(i);
            }

            this.panels.forEach(panel => { 
                const num = nums.splice(Math.floor(Math.random() * nums.length), 1);[0]; //splice()は返り値が配列

                panel.activate(num);
            });
        }
    }

    // パネル
    class Panel {
        constructor(game) {
            this.game = game; // Gameクラスから引数を使って引っ張ってくる(currentNumやtimeoutIdを使うため)

            this.el = document.createElement('li');
            this.el.classList.add('clicked'); 
            this.el.addEventListener('click', () => {
                this.check();
            });
        }
        getEl() {
            return this.el;
        }
        activate(num) {
            this.el.classList.remove('clicked');
            this.el.textContent = num;
        }

        // パネルのイベント
        check() {
            if (this.game.getCurrentNum() === parseInt(this.el.textContent, 10)) { // 文字列なので数値に戻す
                this.el.classList.add('clicked');
                this.game.addCurrentNum();
                // 最後のパネルが押されたらタイマーストップ
                if (this.game.getCurrentNum() === this.game.getLevel() ** 2 + 1) { // 1からスタートさせるので+1する
                    clearTimeout(this.game.getTimeoutId());
                }
            }
        }
    }

    new Game(2);



}