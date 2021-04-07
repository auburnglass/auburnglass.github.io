'use strict';

{
    
    
    const words = [
        'red',
        'blue',
        'pink',
    ];
    let word; 
    let loc;
    let startTime;
    let isPlaying = false;
    
    function setWord() {
        word = words.splice([Math.floor(Math.random() * words.length)], 1)[0];
        target.textContent = word;
        loc = 0;
    }
    
    const target = document.getElementById('target');
    
    document.addEventListener('click', () => {
        if(isPlaying === true) {
            return;
        }
        isPlaying = true;
        startTime = Date.now();
        setWord();
    });

    document.addEventListener('', () => {
        if(isPlaying === true) {
            return;
        }
        isPlaying = true;
        startTime = Date.now();
        setWord();
    });

    document.addEventListener('keydown', e => {
        if (isPlaying === false) { // Enterキーでもゲームスタートさせる
            if (e.key === 'Enter') {
                isPlaying = true;
                startTime = Date.now();
                setWord();
            }
        }

        console.log(e.key);
        if (e.key !== word[loc]) { // 早期リターン目的
            return;
        }

        loc++;
        target.textContent = '_'.repeat(loc) + word.substring(loc);
        if (loc === word.length) {
            if (words.length === 0) {
                const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
                const result = document.getElementById('result');
                result.textContent = `Finished! ${elapsedTime} seconds`;
                return;
            }
            setWord();
        }

    });
}