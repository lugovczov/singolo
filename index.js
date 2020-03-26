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
    //modal window
    showModelWindowSendMessage();
    //nav burger menu
    burgerMenuActive();
}

window.oninput = function() {
    //limited letters in textarea (form__description) and (form__subject)
    limitLettersInForm();
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
        if (e.target.classList.contains('portfolio-btn__item-no-active')) {
            filterPortfolioImg();
        }
        if (e.target.classList.contains('portfolio-btn__item')) {
            
            let clickedPortfolioBtn = e.target;
            
            //let textPortfolioBtn = clickedPortfolioBtn.innerText;
            
            removeSelectedPortfolioBtn();
            selectedClickPortfolioBtn(clickedPortfolioBtn);

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

const filterPortfolioImg = () => {
    let portfolioImages = document.querySelector('.portfolio-example ');
    console.log(portfolioImages);
    
    let firstImg = portfolioImages.children[0];

    portfolioImages.appendChild(firstImg);
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

//modal window 

const showModelWindowSendMessage = () => {
    let modalScreen = document.querySelector('.screen-modal'); 
    
    let form = document.querySelector('.form');
    

    
    document.querySelector('.form').addEventListener('click', (e) => {
        if ( form.checkValidity() & e.target.classList.contains('form__submit')) {

            addValueTextSubjectInModal();
            addValueTextDescriptionInModal();

            modalScreen.classList.remove('screen-modal_hidden');
        }
    })
    hiddenModalWindow();
}

const hiddenModalWindow = () => {
    let modalScreen = document.querySelector('.screen-modal'); 
    let form = document.querySelector('.form');
    window.location.hash = '#contact';
    
    modalScreen.addEventListener('click', (e) => {
        if (e.target.classList.contains('screen-modal') | e.target.classList.contains('modal__btn')) {
            modalScreen.classList.add('screen-modal_hidden'); 
            form.reset();   //ввел тему, описание; после закрытия можального окна эти значения не обнуляются
        }
    })
}

const addValueTextSubjectInModal = () => {
    let subjectModal = document.querySelector('.modal__subject');
    let subjectForm = document.querySelector('.form__subject')

    if (subjectForm.value.length > 0) {
        subjectModal.innerText = 'Subject: ' + subjectForm.value;
    }
}

const addValueTextDescriptionInModal = () => {
    let descriptionModal = document.querySelector('.modal__description');
    let descriptionForm = document.querySelector('.form__description');

    if (descriptionForm.value.length > 0) {
        descriptionModal.innerText = 'Description: ' + descriptionForm.value;
    }
}



//limited letters

const limitLettersInForm = () => {
    let subject = document.querySelector('.form__subject');
    let description = document.querySelector('.form__description');

    if (subject.value.length > 50) {
        return subject.value = subject.value.substring(0, 50) + '...';
    }

    if (description.value.length > 1000) {
        return description.value = description.value.substring(0, 1000) + '...';
    }
}

//nav burger menu 

const burgerMenuActive = () => {
    let burgerBtn = document.querySelector('.header__burger'); 
    let nav = document.querySelector('.top-nav');
    let navHideScreen = document.querySelector('.top-nav_hidescreen');

    document.querySelector('.header__burger').addEventListener('click', () => {
        burgerBtn.classList.toggle('header__burger_active');
        navHideScreen.classList.toggle('top-nav_hidescreen-active')
        nav.classList.toggle('top-nav_active');

    })
    
    hiddenBurgerMenuActive();
    
    function hiddenBurgerMenuActive() {
        
        navHideScreen.addEventListener('click', (e) => {
            if (e.target.classList.contains('top-nav_hidescreen-active')) {
                burgerBtn.classList.remove('header__burger_active');
                navHideScreen.classList.remove('top-nav_hidescreen-active')
                nav.classList.remove('top-nav_active');  
            }
        })
        
        nav.addEventListener('click', (e) => {
            if (e.target.classList.contains('top-nav__item')) {
                burgerBtn.classList.remove('header__burger_active');
                navHideScreen.classList.remove('top-nav_hidescreen-active')
                nav.classList.remove('top-nav_active');  
            }
        })
    }
}