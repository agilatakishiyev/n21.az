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
    document.addEventListener('DOMContentLoaded', function () {
        const catalogButton = document.querySelector('.header__center-part__catalog-button');
        // const catalogSection = document.querySelector('.header__center-part__catalog-section');
        if(catalogButton) {
            document.querySelector('.header__center-part__input-wrapper').classList.add('with-catalog');
            // catalogButton.onclick = function () {
            //     catalogSection.classList.add('show');
            // }
        }
    });

    // countdown timer code starts
    document.addEventListener('DOMContentLoaded', function () {
        const endDateElement = document.querySelector('.end-date');
        const endDate = new Date(endDateElement.innerText).getTime();
        const timerDays = document.querySelector('.timer-days');
        const timerHours = document.querySelector('.timer-hours');
        const timerMinutes = document.querySelector('.timer-minutes');
        const timerSeconds = document.querySelector('.timer-seconds');

        setInterval(
            function () {
                const now = new Date().getTime();
                const t = endDate - now;

                if (t >= 0) {
                    let days = Math.floor(t / (1000 * 60 * 60 * 24));
                    let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    let mins = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
                    let secs = Math.floor((t % (1000 * 60)) / 1000);

                    timerDays.innerHTML = days;
                    timerHours.innerHTML = ("0" + hours).slice(-2);
                    timerMinutes.innerHTML = ("0" + mins).slice(-2);
                    timerSeconds.innerHTML = ("0" + secs).slice(-2);
                }
            },
            1000
        );
    });
    // countdown timer code ends

    // viewed products carousel code is here bcs it exists in a lot of pages
    const viewedProducts = new Flickity('.viewed-products--mobile__carousel', {
        prevNextButtons: false,
        pageDots: false,
        cellAlign: 'left',
        imagesLoaded: true,
        lazyLoad: false,
        wrapAround: true
    });
    // viewed products carousel code ends

    // products from a category carousel is here bcs it exists in a lot of pages
    const producstFromAcategory = new Flickity('.products-from-a-category--mobile__carousel', {
        prevNextButtons: false,
        pageDots: false,
        cellAlign: 'left',
        imagesLoaded: true,
        lazyLoad: false,
        wrapAround: true
    });
    // products from a category carousel ends here 

    // Products for mobile carousel view starts here
    const productsMobileCarousel = new Flickity('.products-carousel--mobile__carousel', {
        prevNextButtons: false,
        pageDots: false,
        cellAlign: 'left',
        imagesLoaded: true,
        lazyLoad: false,
        wrapAround: true
    });
    // Products for mobile carouse view 
})()