'use strict';

{
    const question = document.getElementById('question');
    const choices= document.getElementById('choices');
    const btn = document.getElementById('btn');
 
    // c[0]に正解をいれること！！
    const quizSet = shuffle([
        {q: 'What is A?', c: ['A1', 'A2', 'A3']},
        {q: 'What is B?', c: ['B1', 'B2', 'B3']},
        {q: 'What is C?', c: ['C1', 'C2', 'C3']},
    ]);

    let currentNum = 0;
    let isAnswered; // 回答したかのチェック
    let score = 0;

    
    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
        return arr;
    }
    
    function checkAnswer(li) {
        if (isAnswered) {
            return;
        }
        isAnswered = true;
        if (li.textContent === quizSet[currentNum].c[0]) {
            console.log('correct');
            li.classList.add('correct');
            score++;
        }
        else {
            li.classList.add('wrong');
            console.log('wrong');
        }

        btn.classList.remove('disabled');
    }
    function setQuiz() {
        isAnswered = false;
        question.textContent = quizSet[currentNum].q;
        
        // 初期化
        while(choices.firstChild) {
            choices.removeChild(choices.firstChild);
        }
        
        // スプレッド演算子を使って引数として使用する大元の配列自体はシャッフルされないようにする
        const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    
        console.log(quizSet[currentNum].c)

        shuffledChoices.forEach(choice => {
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click', () => {
                checkAnswer(li);
            });
            choices.appendChild(li);
        });


    }


    setQuiz();

    btn.addEventListener('click', () => {
        if(btn.classList.contains('disabled')) {
            return;
        }
        btn.classList.add('disabled');
        if (currentNum === quizSet.length - 1) {
            // console.log(`Score: ${score} / ${quizSet.length}`);
            const label = document.querySelector('#result > p');
            label.textContent = `Score: ${score} / ${quizSet.length}`;
            const result = document.getElementById('result');
            result.classList.remove('hidden');
        }
        else {
            currentNum++;
            if (currentNum === quizSet.length - 1) {
                btn.textContent = 'Show Score';
            }
            setQuiz();
        }
    });
}