{
    const btn = document.getElementById('btn');
    btn.addEventListener('click', () => {
        // const result = ['吉', '大吉', '凶'];
        // btn.textContent = result[Math.floor(Math.random() * result.length)];

        // 確率操作
        const n = Math.random();
        if (n < 0.1) { // 10 %
            btn.textContent = '吉';
        }
        else if (n < 0.4) { // 30%
            btn.textContent = '大吉';
        }
        else { // 60%
            btn.textContent = '凶';
        }
    });
}