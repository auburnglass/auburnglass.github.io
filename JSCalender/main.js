'use strict';
{
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();;

    // 先月
    function getCalenderHead() {
        const dates = [];
        const d = new Date(year, month, 0).getDate(); // 先月の末日の日付
        const n = new Date(year, month, 1).getDay(); // 今月初めの曜日
        for (let i = 0; i < n; i++) {
            dates.unshift({
                date: d - i,
                isToday: false,
                isDisabled: true,
            });
        }
        return dates;
    }

    // 来月
    function getCalenderTail() {
        const dates = [];
        const lastDay = new Date(year, month +1, 0).getDay(); // 末日の曜日

        for (let i = 1; i < 7 - lastDay; i++) {
            dates.push({
                date: i,
                isToday: false,
                isDisabled: true,
            });
        }
        return dates;
    }

    // 今月
    function getCalenderBody() {
        const dates = [];
        const lastDate = new Date(year, month + 1, 0).getDate(); // 末日 翌月の1日前(0日目を指定)

        // 日付を格納
        for (let i = 1; i <= lastDate; i++) {
            dates.push({
                date: i,
                isToday: false,
                isDisabled: false,
            });
        }
        if(year === today.getFullYear() && month === today.getMonth()) {
            dates[today.getDate() - 1].isToday  = true;
        }
        return dates;
    }

    function crearCalender() {
        const tbody = document.querySelector('tbody');

        // tbdodyの中身をチェックして中身があるなら消す
        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
    }

    function renderTitle() {
        const title = `${year}/${String(month + 1).padStart(2, '0')}`;
        document.getElementById('title').textContent = title;
    }

    function renderWeeks() {
        // スプレッド構文を使って配列の値を代入
        const dates = [
            ...getCalenderHead(),
            ...getCalenderBody(),
            ...getCalenderTail(),
        ];
        
        const weeks = [];
        const weeksCount = dates.length / 7;


        // 週ごとに分ける
        for(let i = 0; i < weeksCount; i++) {
            weeks.push(dates.splice(0, 7));
        }

        weeks.forEach(week => {
            const tr = document.createElement('tr');
            week.forEach(date => {
                const td = document.createElement('td');
                td.textContent = date.date;
                if (date.isToday) {
                    td.classList.add('today');
                }
                if (date.isDisabled) {
                    td.classList.add('disabled');
                }
                tr.appendChild(td);
            });
            document.querySelector('tbody').appendChild(tr);
        });
        // console.log(weeks);
        // console.log(dates);
    }
    function createCalender() {
        
        crearCalender();
        renderTitle();
        renderWeeks();
    }

    document.getElementById('prev').addEventListener('click', () => {
        month--;
        if (month < 0) {
            year--;
            month = 11;
        }
        createCalender();
    });
    document.getElementById('next').addEventListener('click', () => {
        month++;
        if (month > 11) {
            year++;
            month = 0;
        }
        createCalender();
    });
    document.getElementById('today').addEventListener('click', () => {
        year = today.getFullYear();
        month = today.getMonth();
        
        createCalender();
    });

    createCalender();
}