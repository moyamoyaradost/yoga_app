window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    // Добавляем CSS-классы, если их нет в стилях
    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
            tabContent[i].style.display = 'none';
        }
    }

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
            tabContent[b].style.display = 'flex';
        }
    }

    // Начальное состояние - показан первый таб, остальные скрыты
    hideTabContent(1);
    // Timer 
    let deadline = '2025-04-01T17:00:00'; // Будущее время


function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date());
    
    // Обнуляем значения при отрицательном времени
    if (t <= 0) {
        return {
            'total': 0,
            'hours': 0,
            'minutes': 0,
            'seconds': 0
        };
    }
    
    return {
        'total': t,
        'hours': Math.floor(t / (1000 * 60 * 60)),
        'minutes': Math.floor((t / (1000 * 60)) % 60),
        'seconds': Math.floor((t / 1000) % 60)
    };
}

function setClock(id, endtime) {
    let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds');

    // Функция добавления нуля
    const addZero = num => num <= 9 ? `0${num}` : num;

    function updateClock() {
        let t = getTimeRemaining(endtime);

        // Обновляем значения только если время не истекло
        hours.textContent = addZero(t.hours);
        minutes.textContent = addZero(t.minutes);
        seconds.textContent = addZero(t.seconds);

        // Останавливаем таймер при истечении времени
        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }

    // Первоначальный запуск
    updateClock();
    const timeInterval = setInterval(updateClock, 1000);
}

setClock('timer', deadline);


    // Обработчик клика по заголовкам табов
    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for(let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });
});
