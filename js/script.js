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
    const deadline = '2025-12-31';
    
    const getTimeRemaining = (endtime) => {
        const t = Date.parse(endtime) - Date.parse(new Date());
        
        const seconds = Math.floor((t/1000) % 60),
              minutes = Math.floor((t/1000/60) % 60),
              hours = Math.floor(t/(1000*60*60));

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
            const addZero = num => num <= 9 ? `0${num}` : num;

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
        
        updateClock();
        const timeInterval = setInterval(updateClock, 1000);
    };

    setClock('timer', deadline);

    // Modal windows
    const modalWindows = () => {
        const more = document.querySelector('.more'),
              overlay = document.querySelector('.overlay'),
              close = document.querySelector('.popup-close');

        const showModal = () => {
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            overlay.style.display = 'none';
            document.body.style.overflow = '';
        };

        more.addEventListener('click', showModal);
        close.addEventListener('click', closeModal);
    };

    modalWindows();

    // Forms handler
    const formsHandler = () => {
        const forms = document.querySelectorAll('form');
        
        const message = {
            loading: '⏳ Загрузка...',
            success: '✅ Данные успешно отправлены!',
            failure: '❌ Ошибка соединения!'
        };

        const postData = async (url, data) => {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
                return await response.json();
            } catch (error) {
                throw error;
            }
        };

        forms.forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                statusMessage.textContent = message.loading;
                form.appendChild(statusMessage);

                const formData = new FormData(form);
                const dataObject = Object.fromEntries(formData.entries());

                try {
                    await postData('server.php', dataObject);
                    statusMessage.textContent = message.success;
                } catch (error) {
                    statusMessage.textContent = message.failure;
                    console.error(error);
                } finally {
                    form.reset();
                    setTimeout(() => statusMessage.remove(), 5000);
                }
            });
        });
    };

    formsHandler();
});
