'use strict';

{
    const targets = document.querySelectorAll('img');

    // 実行させる動作
    // entries = 複数の要素をもつ"配列", targetに対しての情報
    function callback(entries, obs) {
        console.log(entries); 

        // 同時に処理をする場合の対処

        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('appear');
            obs.unobserve(entry.target); // 監視の停止
        });

        // if (entries[0].isIntersecting) {
        //     entries[0].target.classList.add('appear');
        //     obs.unobserve(entries[0].target);
        // } else {
        //     entries[0].target.classList.remove('appear');
        // }
    }

    // 第2引数でオプションを設定できる
    // オブジェクト形式で渡す
    const options = {
        threshold: .2,  // 単数指定の場合
        // threshold: [0.2, 0.8], // 複数指定の場合

        // rootMargin: '0px 0px -100px',
    };

    const observer = new IntersectionObserver(callback, options);
    targets.forEach(target => {
        observer.observe(target);
    });
}