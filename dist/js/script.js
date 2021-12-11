window.addEventListener("DOMContentLoaded", () => {

    // Tabs

    const tabs = document.querySelectorAll(".tabheader__item"),
          tabsContent = document.querySelectorAll(".tabcontent"),
          tabParent = document.querySelector(".tabheader__items");

    function hideTabsContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove("tabheader__item_active");

        });
    };

    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add("tabheader__item_active");


    };

    hideTabsContent();
    showTabContent();


    tabParent.addEventListener('click', (event)=> {
        const target = event.target;

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabsContent();
                    showTabContent(i);
                }
            });
        }

    });






// Timer

const deadline = '2021-12-31';

function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date);
    const days = Math.floor(t / (1000 * 60 * 60 * 24)); // сколько суток осталось до окончания даты
    const hours = Math.floor((t / (1000* 60 * 60 )) % 24);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const seconds = Math.floor((t / 1000) % 60);



    return {
        'total': t,
        "days": days,
        "hours": hours,
        "minutes": minutes,
        "seconds": seconds
    };
}


function getZero(num){
    if (num >= 0 && num < 10){
        return `0${num}`;
    } else {
        return num;
    }
}


function setClock(selector, endtime){
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds');
          timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <=0) {
            clearInterval(timeInterval);
        }
    }
}


setClock('.timer', deadline);


// Modal

const btn = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal'),
      modalClose = document.querySelector('[data-close]');


btn.forEach(button => {
    button.addEventListener('click', () => {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    });

});


function closeModal(){
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
};



modalClose.addEventListener('click', closeModal);


modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();

    }
});

document.addEventListener('keydown', (e)=> {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
        closeModal();
    }

});


// классы для карточек
/* class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

// Использование:
let user = new User("Иван");
user.sayHi();*/


class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.parent = document.querySelector(parentSelector);
        this.price = price;
        this.transfer = 27;
        this.changetoUAH
    }

    changetoUAH() {
        this.price = this.price * this.transfer;
    }

    render () {

        const element = document.createElement('div');
        element.innerHTML = `
            <div class="menu__item">
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        </div>`;
        this.parent.append(element);


    }
}

new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container'
).render();


});