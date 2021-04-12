'use strict';

{
    let t = 0;
    function draw() {
        const canvas = document.querySelector('canvas');
        if (typeof canvas.getContext === 'undefined') {
            return;
        }
        const ctx = canvas.getContext('2d');
        // 高解像度に対応させる
        const CANVAS_WIDTH = 600;
        const CANVAS_HEIGHT = 240;
        const dpr = window.devicePixelRatio || 1; // ディスプレイの密度を取得 window.devicePixelRatioを取得できなかった場合は等倍を表す1を返す
        // 毎回確認されるので関数に後で書き換える
        canvas.width = CANVAS_WIDTH * dpr;
        canvas.height = CANVAS_HEIGHT * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = CANVAS_WIDTH + 'px';
        canvas.style.height = CANVAS_HEIGHT + 'px';
        console.log(dpr);
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'pink';
        ctx.fillRect(0, 0, 200, 200);

        // ctx.beginPath();
        // ctx.ellipse(100, 100, 40, 30, 0, 0, 2 * Math.PI);
        // ctx.fillStyle = 'black';
        // ctx.fill();

        // ctx.beginPath();
        // ctx.ellipse(80, 100, 8, 8, 0, 0, 2 * Math.PI);
        // ctx.ellipse(120, 100, 8, 8, 0, 0, 2 * Math.PI);

        // アニメーションさせる
        ctx.ellipse(80 + 2 * Math.sin(t / 30), 100, 8, 8, 0, 0, 2 * Math.PI);
        ctx.ellipse(120 + 2 * Math.sin(t / 30), 100, 8, 8, 0, 0, 2 * Math.PI);
        ctx.fillStyle = 'white';
        ctx.fill();

        t++;
        setTimeout(draw, 10);

        // ctx.save(); // 設定を保存

        // // スケール変更
        // ctx.scale(0.5, 0.5);
        // ctx.translate(400, 0); // 移動
        // ctx.rotate(45 / 180 * Math.PI); // 回転
        // ctx.fillStyle = 'skyblue';
        // ctx.fillRect(0, 0, 200, 200);

        // ctx.beginPath();
        // ctx.ellipse(100, 100, 40, 30, 0, 0, 2 * Math.PI);
        // ctx.fillStyle = 'black';
        // ctx.fill();

        // ctx.beginPath();
        // ctx.ellipse(80, 100, 8, 8, 0, 0, 2 * Math.PI);
        // ctx.ellipse(120, 100, 8, 8, 0, 0, 2 * Math.PI);
        // ctx.fillStyle = 'white';
        // ctx.fill();

        ctx.restore(); // 設定を元に戻す
        // ctx.fillStyle = 'black';
        // ctx.fillRect(80, 120, 40, 40);

        
        ctx.font = 'bold 48px San-serif';
        ctx.strokeText('Sample', 200, 200);
    }

    draw();
}