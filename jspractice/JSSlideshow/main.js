'use strict';

{
    const images = [
        'img/flower_ajisai1.png',
        'img/flower_ajisai2.png',
        'img/flower_ajisai3.png',
        'img/flower_ajisai4.png',
        'img/flower_ajisai5.png',
        'img/flower_ajisai6.png',
        'img/flower_ajisai7.png',
        'img/flower_ajisai8.png',
        'img/flower_ajisai9.png',
    ];

    let currentIndex = 0;

    const mainImage = document.getElementById('main');
    mainImage.src = images[currentIndex];

    images.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image;
        
        const li = document.createElement('li');
        li.appendChild(img);

        if (index === currentIndex) {
            li.classList.add('current');
        }

        li.addEventListener('click', () =>{
            mainImage.src = image;

            // サムネイル部分の表示切り替え
            const thumbnails = document.querySelectorAll('.thumbnails > li');
            thumbnails[currentIndex].classList.remove('current');
            currentIndex = index;
            thumbnails[currentIndex].classList.add('current');
        });

        document.querySelector('.thumbnails').appendChild(li);
    });

    const next = document.getElementById('next');
    next.addEventListener('click', () => {
        let nextIndex = currentIndex + 1;
        if (nextIndex === images.length) {
            nextIndex = 0;
        }
        document.querySelectorAll('.thumbnails > li')[nextIndex].click();
    });

    const prev = document.getElementById('prev');
    prev.addEventListener('click', () => {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = images.length - 1;
        }
        document.querySelectorAll('.thumbnails > li')[prevIndex].click();
    });
    
    let timeoutId;
    function slideshow() {
        timeoutId = setTimeout(() => {
            next.click();
            slideshow();
        }, 1000);
    }

    let isPlaying = false;
    const play = document.getElementById('play');
    play.addEventListener('click', () => {
        if(isPlaying === false) {
            slideshow();
            play.textContent = 'Pause';
        } else {
            clearTimeout(timeoutId);
            play.textContent = 'Play';
        }
        isPlaying = !isPlaying;
    });

}