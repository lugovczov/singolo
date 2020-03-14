window.onload = function() {

    //top-nav
    addNavClickHandler();

}

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