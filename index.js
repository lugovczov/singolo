window.onload = function() {

    //top-nav
    addNavClickHandler();
    //off-iphone
    offScreenClickIphone();
    //slider
    slider();
    //portfolio-btn
    addPortfolioClickHandler();
    //portfolio-img active => border
    addBorderPortfolioImgClickHandler();

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
    //задержка для анимации чтобы не нажималось пока идёт слайд
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

//portfolio-btn

const addPortfolioClickHandler = () => {
    document.querySelector('.portfolio-btn').addEventListener('click', (e) => {
        if (e.target.classList.contains('portfolio-btn__item')) {
            
            let clickedPortfolioBtn = e.target;
            
            let textPortfolioBtn = clickedPortfolioBtn.innerText;
            
            removeSelectedPortfolioBtn();
            selectedClickPortfolioBtn(clickedPortfolioBtn);
            filterPortfolioImg(textPortfolioBtn);
        }
    })
}

const removeSelectedPortfolioBtn = () => {
    let PortfolioBtnItem = document.querySelectorAll('.portfolio-btn .portfolio-btn__item');

    PortfolioBtnItem.forEach(PortfolioBtn => {
        PortfolioBtn.classList.remove('portfolio-btn__item-active');
        PortfolioBtn.classList.add('portfolio-btn__item-no-active');
    })
}

const selectedClickPortfolioBtn = (clickedPortfolioBtn) => {
    clickedPortfolioBtn.classList.add('portfolio-btn__item-active');
    clickedPortfolioBtn.classList.remove('portfolio-btn__item-no-active');
}

const filterPortfolioImg = (textPortfolioBtn) => {
    let portfolioImages = document.querySelectorAll('.portfolio-example .portfolio-example__img');
    
    portfolioImages.forEach( (e) => { 
        
        e.classList.remove('portfolio__img_order1');  
        
        removeSelectedImg();

        if(e.alt == textPortfolioBtn) {       //как сделать, чтобы в img alt передать несколько фильтров('All Artwork'),
                                                        // а потом вот тут сделать проверку на вхождение одного из этих значений??
                                                        // на данный момент работае только при одном alt например ('Artwork'),
                                                        // так как сравнивается точный текст.
        e.classList.add('portfolio__img_order1');
        } 
    })

    if( textPortfolioBtn == 'All') {
        e.classList.remove('portfolio__img_order1');   
    }
}

//portfolio Img activate
const addBorderPortfolioImgClickHandler = () => {
    document.querySelector('.portfolio-example').addEventListener('click', (e) => {
        if (e.target.classList.contains('portfolio-example__img')) {
            
            console.log(e.toElement.children);
            let clickedImg = e.target;
            
            removeSelectedImg();
            selectedClickImg(clickedImg);
        }
    })
}

const removeSelectedImg = () => {
    let imgItem = document.querySelectorAll('.portfolio-example .portfolio-example__img');

    
    imgItem.forEach(img => {
        //console.log(img);
        img.classList.remove('portfolio__img-selected');
        img.classList.add('portfolio__img-no-selected');
    })
}

const selectedClickImg = (clickedImg) => {
    clickedImg.classList.add('portfolio__img-selected');
    clickedImg.classList.remove('portfolio__img-no-selected');
}