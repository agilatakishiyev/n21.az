(function ( ) {
    const mobileNavigation = document.querySelector('.header__mobile-navigation');
    const mobileCategoriesList = document.querySelectorAll('.header__mobile-navigation__categories-list__item');
    const mobileBackToCatalogueLinks = document.querySelectorAll('a[href="back-to-categories"]');
    const scrollToTopButton = document.querySelector('.scroll-to-top');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    menuIcon.onclick = function () {
        mobileNavigation.classList.add('open');
    }
    closeIcon.onclick = function () {
        mobileNavigation.classList.remove('open');
        document.querySelector('.header__mobile-navigation__categories-list__item__sub-categories-wrapper.open')?.classList.remove('open');
    }

    mobileCategoriesList.forEach(function (mobileCategory ) {
        mobileCategory.onclick = function () {
            mobileCategory.querySelector('.header__mobile-navigation__categories-list__item__sub-categories-wrapper').classList?.add('open');
        }
    });
    
    mobileBackToCatalogueLinks.forEach(function (mobileBackToCatalogueLink) {
        mobileBackToCatalogueLink.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            mobileBackToCatalogueLink.parentElement?.classList.remove('open');
        }
    })

    // Scroll to top button click function 
    scrollToTopButton.onclick = function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    // Scroll to top button visibilty check  below
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
        const endDate = new Date(endDateElement?.innerText).getTime();
        const timerDays = document.querySelector('.timer-days');
        const timerHours = document.querySelector('.timer-hours');
        const timerMinutes = document.querySelector('.timer-minutes');
        const timerSeconds = document.querySelector('.timer-seconds');

        // if there is a timer in the page
        if(endDate) {
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
        }
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
    const mainCarousel = new Flickity('.carousel-main', {
        prevNextButtons: false,
        wrapAround: true,
        imagesLoaded: true,
        lazyLoad: false,
    });

    // Carousel in product details page
    const carousel = new Flickity('.carousel');
    const carouselNav = document.querySelector('.carousel-nav');
    const carouselNavCells = carouselNav?.querySelectorAll('.carousel-cell');
    carouselNavCells?.forEach(carouselNavCell => {
        carouselNavCell.onclick = function (event) {
            carouselNavCells.forEach(prevCell => {
                prevCell.classList.remove('is-nav-selected');
            })
            event.currentTarget.classList.add('is-nav-selected');
            carousel.select([...carouselNavCells].indexOf(event.currentTarget));
        }
    });

    // Throttle util for delaying some frequent events like typing in a search input
    function throttle (delay, fn) {
        let inThrottle = false;
    
        return args => {
            if (inThrottle) {
                return;
            }

            inThrottle = true;
            fn(args);
            setTimeout(
                function () {
                    inThrottle = false;
                }, 
                delay
            );
        };
    }

    // Search input event for mobile and desktop code is down below
    const searchInput = window.innerWidth >= 1320 ?  document.querySelector('.header__center-part__input-wrapper__input') :
        document.querySelector('.header__mobile-search__input-wrapper__input');
    const searchResults = window.innerWidth >=1320 ?  document.querySelector('.header__center-part__input-wrapper__search-results') :
        document.querySelector('.header__mobile-search__input-wrapper__search-results');
    const searchResultsCountPlaceholder = document.querySelector('.header__center-part__input-wrapper__search-results--count');
    const sendRequestThrottle = throttle(1000, search);
    function search (query) {
        // send request here
        console.log('sent a request with following query:', query);
        // template for results
        `<a href="#" class="header__center-part__input-wrapper__search-results__item d-flex align-center">
            <img width="30" height="30" src="./assets/images/washing-machine.png" alt="washing machine">
            <p>Paltaryuyan maşın BOSCH WAJ20180ME</p>
        </a>`
        searchResults.classList.add('active');
        searchResultsCountPlaceholder.innerText = '120'
    }
    searchInput.onkeyup = function (e) {
        if(!e.currentTarget.value) {
            searchResults.classList.remove('active');
        }else {
            sendRequestThrottle(e.currentTarget.value);
        }
    }

    // Accordion code starts here
    const accordionItemHeaders = document.querySelectorAll(".accordion-item-header");
    accordionItemHeaders.forEach(accordionItemHeader => {
        accordionItemHeader.addEventListener("click", _ => {

            accordionItemHeader.classList.toggle("active");
            const accordionItemBody = accordionItemHeader.nextElementSibling;
            if(accordionItemHeader.classList.contains("active")) {
            accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
            }
            else {
            accordionItemBody.style.maxHeight = 0;
            }
        });
    });

})()