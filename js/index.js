
// tabs
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.tab__btn').forEach(function(tabBtn) {
        tabBtn.addEventListener('click', function(event) {
            const path = event.currentTarget.dataset.path

            document.querySelectorAll('.tab__content').forEach(function(tabContent) {
                tabContent.classList.remove('tab__content-active')
            })
            document.querySelector(`[data-target="${path}"]`).classList.add('tab__content-active')
        })
    })
})

// wrapper
const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });


// burger
const menuBurger = document.querySelector('.header__burger');
const navItem = document.querySelectorAll('.header__menu-link');
const menuBody = document.querySelector('.header__menu')

if (menuBurger) {
  menuBurger.addEventListener("click", function(e) {
    document.body.classList.toggle('_lock');
    menuBurger.classList.toggle('_active');
    menuBody.classList.toggle('_active');
  })

  if  (navItem.length > 0 ) {
    for (let item of navItem) {
        item.addEventListener("click", function() {
        document.body.classList.remove('_lock');
        menuBurger.classList.remove('_active');
        menuBody.classList.remove('_active');
        })
       }
  }
}

// popup

const popupLinks = document.querySelectorAll('.popup__link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function(e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        })
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup._open');
        if (popupActive) {
            popupClose(popupActive, false);
        }else{
            bodyLock();
        }
        curentPopup.classList.add('_open');
        curentPopup.addEventListener('click', function(e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if(unlock) {
        popupActive.classList.remove('_open');
        if (doUnlock) {
            bodyUnlock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + 'px';

    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('_lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    },  timeout);
}

function bodyUnlock() {
    setTimeout(function () {
        if ( lockPadding.length > 0 ) {
            for ( let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('_lock');
    },  timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

document.addEventListener('keydown', function (e) { 
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
})



const searchBtn = document.querySelector('.header__search');
const searchForm = document.querySelector('.search');


if (searchBtn) {
    searchBtn.addEventListener("click", function(e) {
    searchForm.classList.toggle('open')
    })
}


// accordeon

/*всё тоже самое, кроме...*/
let allElems = document.querySelectorAll('.accordion .accordion__elem');

allElems.forEach((elem)=>{
    elem.addEventListener('click', function(){
        /*находим все активные элементы*/
        let descActive = document.querySelectorAll('.active');
        /*прогоняем через цикл и удаляем класс active*/
        descActive.forEach((elem)=>{
            elem.classList.remove('active');
        })

        let parentElem = this.parentNode;

        let contentBlock = parentElem.querySelector('.accordion__text')

        if(contentBlock.classList.contains("active")) {
            contentBlock.classList.remove('active');
        }
        else {
            contentBlock.classList.add('active');
        }
    })
})




