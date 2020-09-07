(function ( ) {
    const mobileNavigation = document.querySelector('.header__mobile-navigation');
    const scrollToTopButton = document.querySelector('.scroll-to-top');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    menuIcon.onclick = function () {
        mobileNavigation.classList.add('open');
    }
    closeIcon.onclick = function () {
        mobileNavigation.classList.remove('open');
    }
    scrollToTopButton.onclick = function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    window.onscroll = function (e) { 
        if(e.target.body.scrollTop === 0 ){
            scrollToTopButton.classList.remove('show');
        }
        if(e.target.body.scrollTop > 0) {
            scrollToTopButton.classList.add('show');
        }
    }

    // toggling select options states(open or close)
    document.querySelector('.custom-select-wrapper').addEventListener('click', function() {
        this.querySelector('.custom-select').classList.toggle('open');
    })

    // closing custom select on window click 
    window.addEventListener('click', function(e) {
        const select = document.querySelector('.custom-select')
        if (!select.contains(e.target)) {
            select.classList.remove('open');
        }
    });

    // selecting custom select option
    for (const option of document.querySelectorAll(".custom-option")) {
        option.addEventListener('click', function() {
            if (!this.classList.contains('selected')) {
                this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
                this.classList.add('selected');
                this.closest('.custom-select').querySelector('.custom-select__trigger span').innerHTML = this.innerHTML;
            }
        })
    }
})()