`use strict`;

{
    function draw() {
        const canvas = document.querySelector('canvas');
        // canvasをサポートしているか確認
        if (typeof canvas.getContext === 'undefined') {
            return;
        }
        const ctx = canvas.getContext('2d');
        
        // 画像の操作
        const img = document.createElement('img');
        // img.src = 'img/food_pi-tan_tofu.png';
        img.src = 'img/sprite.png';
        // 画像の場合は読み込みが終わったあとに描画したいので、 イベントを指定する
        img.addEventListener('load', () => {
            
            // ctx.drawImage(img, 0, 0);
            // ctx.drawImage(img, 0, 0, 40, 40);

            // パターン
            // const pattern = ctx.createPattern(img, 'repeat');
            // ctx.fillStyle = pattern;
            // ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 画像の一部分を切り出す
            // ctx.drawImage(img,  
            //     70 * 2, 70, 70, 70, 
            //     0, 0, 35, 35);
        });

        // 文字の練習
        // 補助線
        // ctx.beginPath();
        // ctx.strokeStyle = 'black';
        // ctx.moveTo(0, 100);
        // ctx.lineTo(canvas.width, 100);
        // ctx.moveTo(100, 0);
        // ctx.lineTo(100, canvas.height);
        // ctx.stroke();
        // ctx.font = 'bold 64px Verdana';
        // ctx.textAlign = 'right';
        // ctx.textBaseline = 'top';

        // ctx.fillText('tokyo', 100, 100);
        // ctx.fillText('tokyo', 100, 100, 100); // fillText('文字', x, y, テキストの最大幅)
        //ctx.strokeText('tokyo', 100, 100, 100);


        // 楕円と四角形
        // ctx.ellipse(100, 100, 50, 30, 0, 0, 2 * Math.PI)
        // ctx.stroke();

        // ctx.rect(50, 50, 50, 50);
        // ctx.stroke();
        // // 円の描画
        // ctx.beginPath();
        // // ctx.arc(x, y, r, start, end);
        // ctx.moveTo(100, 100);
        // ctx.arc(100, 100, 50, 0, 5 / 6 * 2 * Math.PI);
        // // ctx.arc(100, 100, 50, 0, 5 / 6 * 2 * Math.PI, true); // trueを与えると逆方向の描画になる

        // ctx.fill();

        // ctx.beginPath();
        // ctx.moveTo(100, 50);
        // ctx.lineTo(200, 50);
        // ctx.setLineDash([5, 20]); // 線のスタイル設定1 配列で設定
        // ctx.stroke();
        
        // ctx.beginPath();
        // ctx.moveTo(100, 100);
        // ctx.lineTo(200, 100);
        // ctx.setLineDash([]); // 空の配列を渡すと実線になる
        // ctx.stroke();

        // ctx.beginPath();
        // ctx.moveTo(100, 150);
        // ctx.lineTo(200, 150);
        // ctx.lineWidth = 16;
        // ctx.lineCap = 'round'; // 線のスタイル設定2 線の終端を設定
        // ctx.stroke();

        // 線を描画
        // ctx.beginPath();
        // ctx.moveTo(50, 50);
        // ctx.lineTo(100, 50);
        // ctx.lineTo(100, 100);
        // ctx.closePath();
        // // ctx.stroke();
        // ctx.fill();

        // 影をつける
        // ctx.shadowOffsetX = 4;
        // ctx.shadowOffsetY = 4;
        // ctx.shadowBlur = 4;
        // ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        // ctx.fillRect(50, 50, 50, 50);

        // グラデーション
        // const g = ctx.createLinearGradient(0, 0, canvas.width, 0);
        // const g = ctx.createRadialGradient(
        // canvas.width / 2, canvas.height / 2, 50,
        // canvas.width / 2 + 100, canvas.height / 2 + 200, 400);
        // g.addColorStop(0, '#f00');
        // g.addColorStop(0.1, '#0f0');
        // g.addColorStop(1, '#00f');
        // ctx.fillStyle = g;
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    draw();
}