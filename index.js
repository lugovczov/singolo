window.onload = function() {

    //top-nav
    addNavClickHandler();
    //off-iphone
    offScreenClickIphone();

    slider();
}

//top-nav
const addNavClickHandler = () => {
    document.querySelector('.nav').addEventListener('click', (e) => {
        if (e.target.classList.contains('top-nav__item')) {
            
            let clickedNav = e.target;

            removeSelectedNav();
            selectedClickNav(clickedNav);
        }
    })
}

const removeSelectedNav = () => {
    let navItem = document.querySelectorAll('.nav .top-nav__item');

    navItem.forEach(nav => {
        nav.classList.remove('nav-selected');
        nav.classList.add('nav-no-selected');
    })
}

const selectedClickNav = (clickedNav) => {
    clickedNav.classList.add('nav-selected');
    clickedNav.classList.remove('nav-no-selected');
}

//off-iphone
const offScreenClickIphone = () => {
    let i = 0;
    let j = 0;

    document.querySelector('.iphone-btn').addEventListener('click', () => {
        let screen = document.querySelector('.off-screen');

        if ( i == 0) {
            screen.style.opacity = '1';
            i++;
        } else {
            screen.style.opacity = '0';
            i = 0;
        }
    })

    document.querySelector('.iphone-btn_horizontal').addEventListener('click', () => {
        let screen = document.querySelector('.off-screen_horizontal');

        if ( j == 0) {
            screen.style.opacity = '1';
            j++;
        } else {
            screen.style.opacity = '0';
            j = 0;
        }
    })
}

const slider = () => {
    //slider
    let items = document.querySelectorAll('.slider .slider-item');
    let currentItem = 0;
    //задержка для анимации 
    let isEnabled = true;
    
    function changeCurrentItem(n) {
        currentItem = (n + items.length) % items.length;
    }
    
    function hideItem(direction) {
        isEnabled = false;
        items[currentItem].classList.add(direction);
        items[currentItem].addEventListener('animationend', function () {
            this.classList.remove('slider-active', direction);
        });
    }
    
    function showItem(direction) {
        items[currentItem].classList.add('next', direction);
        items[currentItem].addEventListener('animationend', function () {
            this.classList.remove('next', direction);
            this.classList.add('slider-active'); 
            isEnabled = true;
        });
    }
    
    function previousItem(n) {
        hideItem('to-right');
        changeCurrentItem(n - 1);
        showItem('from-left')
    }
    
    function nextItem(n) {
        hideItem('to-left');
        changeCurrentItem(n + 1);
        showItem('from-right');
    }
    
    document.querySelector('.slider .ctrl-left').addEventListener('click', function() {
        if (isEnabled) {
            previousItem(currentItem);
        }
    })
    
    document.querySelector('.slider .ctrl-right').addEventListener('click', function() {
        if (isEnabled) {
            nextItem(currentItem);
        }
    })
}
