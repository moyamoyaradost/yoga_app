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
              close = document.querySelector('.popup-close'),
              statusModal = document.querySelector('.status-modal');

        const showModal = (modal) => {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        };

        const closeModal = (modal) => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        };

        // Main modal
        more.addEventListener('click', () => showModal(overlay));
        close.addEventListener('click', () => closeModal(overlay));
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal(overlay);
        });

        // Status modal
        const showStatusModal = (message) => {
            statusModal.querySelector('.status-message').textContent = message;
            showModal(statusModal);
        };
        
        return { showStatusModal };
    };

    const { showStatusModal } = modalWindows();

    // Forms handler
    const forms = () => {
        const forms = document.querySelectorAll('form');
        
        const message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Мы скоро с вами свяжемся!',
            failure: 'Что-то пошло не так...'
        };

        const postData = async (url, data) => {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: data
            });
            return await res.text();
        };

        const clearInputs = (form) => {
            form.querySelectorAll('input').forEach(input => {
                if (input.type !== 'submit') input.value = '';
            });
        };

        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const statusMessage = document.createElement('div');
                statusMessage.textContent = message.loading;
                form.appendChild(statusMessage);

                const formData = new FormData(form);
                const json = JSON.stringify(Object.fromEntries(formData.entries()));

                postData('server.php', json)
                    .then(() => {
                        statusMessage.remove();
                        showStatusModal(message.success);
                    })
                    .catch(() => {
                        statusMessage.textContent = message.failure;
                    })
                    .finally(() => {
                        clearInputs(form);
                    });
            });
        });
    };

    forms();
});
