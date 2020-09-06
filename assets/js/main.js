(function ( ) {
    const mobileNavigation = document.querySelector('.header__mobile-navigation');
    document.querySelector('.menu-icon').onclick = function () {
        mobileNavigation.classList.add('open');
    }
    document.querySelector('.close-icon').onclick = function () {
        mobileNavigation.classList.remove('open');
    }
})()