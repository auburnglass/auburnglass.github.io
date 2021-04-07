'use strict';

{
    const menuItems = document.querySelectorAll('.menu li a');
    const contents = document.querySelectorAll('.content');

    menuItems.forEach(clickedItem => {
        clickedItem.addEventListener('click', e => {
            e.preventDefault();
            menuItems.forEach(removeItem => {
                removeItem.classList.remove('active');
            });
            clickedItem.classList.add('active');

            contents.forEach(content => {
                content.classList.remove('active');
            });
            
            // console.log(clickedItem.dataset.id);
            document.getElementById(clickedItem.dataset.id).classList.add('active');
        });
    });
}