'use strict';

(() => {
    class IconDrawer {
        constructor(canvas) {
            this.ctx = canvas.getContext('2d');
            this.width = canvas.width;
            this.height = canvas.height;
            this.r = 60;
        }

        draw(angle) {
            // 塗り潰しを重ねてだんだん消えるように見せる
            // 今回は背景が白を指定しているので白で塗りつぶす
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3';
            this.ctx.fillRect(0, 0, this.width, this.height);

            // save, restoreで座標を保持
            this.ctx.save();
            // 座標空間の原点を円の中身にずらす
            this.ctx.translate(this.width / 2, this.height / 2);

            // 線を描画させる前に回転させる
            this.ctx.rotate(Math.PI / 180 * angle);

            this.ctx.beginPath();
            // this.ctx.arc(this.width / 2, this.height / 2, this.r, 0, 2 * Math.PI);
            // 原点をずらしたのでその分の位置調整
            // this.ctx.arc(0, 0, this.r, 0, 2 * Math.PI);
            // this.ctx.stroke();

            this.ctx.beginPath();
            // こちらもずらした分の位置調整
            // this.ctx.moveTo(this.width / 2, this.height / 2 - this.r - 5);
            // this.ctx.lineTo(this.width / 2, this.height / 2 - this.r + 5);
            // ローディングの線の描画
            this.ctx.moveTo(0, -this.r - 5);
            this.ctx.lineTo(0, -this.r + 5);
            this.ctx.strokeStyle = 'orange';
            this.ctx.lineWidth = 6;
            this.ctx.stroke();

            this.ctx.restore();
        }

    }
    class Icon {
        constructor(drawer) {
            this.drawer = drawer;
            this.angle = 0;
        }

        draw() {
            this.drawer.draw(this.angle);
        }
        
        update() {
            this.angle += 12;
        }

        run() {
            this.update();
            this.draw();

            setTimeout(() => {
                this.run(); 
            }, 100);
        }
    }

    const canvas = document.querySelector('canvas');
    if (typeof canvas.getContext === 'undefined') {
        return;
    }

    const icon = new Icon(new IconDrawer(canvas));
    icon.run();
})();
