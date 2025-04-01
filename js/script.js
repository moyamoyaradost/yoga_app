window.addEventListener('DOMContentLoaded', () => {
    'use strict';
    // Tabs functionality
    const tab = document.querySelectorAll('.info-header-tab'),
          info = document.querySelector('.info-header'),
          tabContent = document.querySelectorAll('.info-tabcontent');

    const hideTabContent = (a) => {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    };

    hideTabContent(1);

    const showTabContent = (b) => {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    };

    info.addEventListener('click', (event) => {
        const target = event.target;
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

    // Timer 
    const deadline = '2025-04-15'; // Обновлено на будущую дату

    const getTimeRemaining = (endtime) => {
        const t = Date.parse(endtime) - Date.parse(new Date());
        
        // Если дата уже прошла
        if (t <= 0) {
            return {
                'total': 0,
                'hours': 0,
                'minutes': 0,
                'seconds': 0
            };
        }
        
        const seconds = Math.floor((t/1000) % 60),
              minutes = Math.floor((t/1000/60) % 60),
              hours = Math.floor((t/(1000*60*60)));

        return {
            'total': t,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    const setClock = (id, endtime) => {
        const timer = document.getElementById(id),
              hours = timer.querySelector('.hours'),
              minutes = timer.querySelector('.minutes'),
              seconds = timer.querySelector('.seconds');
        
        const updateClock = () => {
            const t = getTimeRemaining(endtime);

            const addZero = (num) => num <= 9 ? `0${num}` : num;

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        };
        
        // Запускаем обновление часов
        updateClock();
        const timeInterval = setInterval(updateClock, 1000);
    };

    setClock('timer', deadline);

    // Modal - улучшенная версия с единой функцией
    const more = document.querySelector('.more'),
          overlay = document.querySelector('.overlay'),
          close = document.querySelector('.popup-close'),
          descriptionBtns = document.querySelectorAll('.description-btn');

    // Функция открытия модального окна
    const showModal = (btn) => {
        overlay.style.display = 'block';
        btn.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    };

    // Функция закрытия модального окна
    const closeModal = () => {
        overlay.style.display = 'none';
        document.querySelector('.more-splash').classList.remove('more-splash');
        document.body.style.overflow = '';
    };

    // Привязка к основной кнопке
    more.addEventListener('click', () => showModal(more));

    // Привязка ко всем кнопкам в табах
    descriptionBtns.forEach(btn => {
        btn.addEventListener('click', () => showModal(btn));
    });

    // Закрытие модального окна
    close.addEventListener('click', closeModal);
});
