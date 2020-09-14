(function ( ) {
    const mobileNavigation = document.querySelector('.header__mobile-navigation');
    const mobileCategoriesList = document.querySelectorAll('.header__mobile-navigation__categories-list__item');
    const mobileBackToCatalogueLinks = document.querySelectorAll('a[href="back-to-categories"]');
    const scrollToTopButton = document.querySelector('.scroll-to-top');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    const mobileFilterButton  = document.querySelector('.open-filter-mobile');
    const mobileFilter = document.querySelector('.mobile-filter');
    const closeMobileFilter = document.querySelector('.close-mobile-filter');
    const shadowWrapper = document.querySelector('.shadow-wrapper');
    const catalogButton = document.querySelector('.header__center-part__catalog-button');
    const catalogList = document.querySelector('.header__center-part__catalog-section');

    if(shadowWrapper) {
        shadowWrapper.onclick = function () {
            catalogList.classList.remove('show');
            shadowWrapper.classList.remove('active');
        }
    }

    if(catalogButton) {
        catalogButton.onclick = function () {
            catalogList.classList.add('show');
            shadowWrapper.classList.add('active');
        }
    }

    if(closeMobileFilter) {
        closeMobileFilter.onclick = function () {
            mobileFilter.classList.add('d-none');
        }
    }

    if(mobileFilterButton) {
        mobileFilterButton.onclick = function () {
            mobileFilter.classList.remove('d-none');
        }
    }

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

    // categories code starts here
    const categoryItems = document.querySelectorAll('.main-left__categories-list__item');
    const subCategoriesWrapper = document.querySelector('.sub-categories-wrapper');
    const subCategoriesInner = document.querySelectorAll('.sub-categories');
    categoryItems.forEach(function (categoryItem) {
        const subCategoriesOfCurrentCategory = [...subCategoriesInner].find(function (subCat) {
            return subCat.getAttribute('data-category-id') === categoryItem.getAttribute('data-category-id');
        });
        categoryItem.onmouseover = function (e) {
            subCategoriesInner.forEach(function (subCat) {
                subCat.classList.add('d-none');
            })
            categoryItems.forEach(function (prevSelectedCat) {
                prevSelectedCat.classList.remove('hovered');
            })
            categoryItem.classList.add('hovered');
            subCategoriesWrapper.classList.remove('d-none');
            subCategoriesOfCurrentCategory?.classList.remove('d-none');
            shadowWrapper.classList.add('active');
        }
    });

    document.addEventListener('mousemove', function (e) {
        if(e.target === shadowWrapper) {
            if(!(catalogList && catalogList.classList.contains('show'))){
                subCategoriesWrapper.classList.add('d-none');
                shadowWrapper.classList.remove('active');
                categoryItems.forEach(function (prevSelectedCat) {
                    prevSelectedCat.classList.remove('hovered');
                });
            }
        }
    });

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

    // Pagination code starts
    const paginationItems = document.querySelectorAll('.pagination__item');
    paginationItems.forEach(function (paginationItem) {
        paginationItem.onclick = function () {
            paginationItems.forEach(function (pi) {
                pi.classList.remove('active');
            });
            paginationItem.classList.add('active');
        }
    });

    // ADD TO BASKET ICON CLICKS
    document.querySelectorAll('.product-item__pricing-and-basket__basket').forEach(function (addToBasketIcon) {
        addToBasketIcon.onclick = function () {
            this.classList.toggle('--in-basket');
        }
    });


    const likedProductRemoveIcons = document.querySelectorAll('.liked-product-item__remove-icon');
    const viewedProductRemoveIcons = document.querySelectorAll('.viewed-product-item__remove-icon');
    viewedProductRemoveIcons.forEach(function (removeIcon) { 
        removeIcon.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            requestConfirmationModal(function (result) {
                if(result) {
                    e.target.parentElement.parentElement.remove();
                    // removeProductFromStorage('viewed', '1');
                }
            });
        }
    });
    likedProductRemoveIcons.forEach(function (removeIcon) { 
        removeIcon.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            requestConfirmationModal(function (result) {
                if(result) {
                    e.target.parentElement.parentElement.remove();
                    // removeProductFromStorage('liked', '1');
                }
            });
        }
    });

    function removeProductFromStorage (type, id) {
        if(type === 'liked'){
            // clear liked product from storage
        }else if (type === 'viewed') {
            // clear viewed product from storage
        }
    }

    function requestConfirmationModal (cb) {
        const modalWrapper = document.createElement('div');
        modalWrapper.classList.add('modal-wrapper');
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-wrapper__content');
        const modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-wrapper__content__header');
        const modalButtonsWrapper = document.createElement('div');
        modalButtonsWrapper.classList.add('modal-wrapper__content__buttons');
        const headerElement = document.createElement('h2');
        headerElement.innerText = 'Silmək istədiyinizdən əminsiniz mi?';
        const closeIcon = document.createElement('img');
        closeIcon.alt = 'close icon';
        closeIcon.classList.add('modal-wrapper__content__header__close-icon');
        closeIcon.src = './assets/icons/close.svg';
        const closeButton = document.createElement('button');
        closeButton.className = 'button white close button--sm';
        closeButton.innerText = 'Xeyr, bağla';
        const approveButton = document.createElement('button');
        approveButton.className = 'button primary approve button--sm';
        approveButton.innerText = 'Bəli əminəm';
        modalHeader.append(headerElement, closeIcon);
        modalButtonsWrapper.append(closeButton, approveButton);
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalButtonsWrapper);
        modalWrapper.appendChild(modalContent);
        document.body.appendChild(modalWrapper);
        document.onclick = function (e) {
            if(e.target !== modalContent) {
                modalWrapper.remove();
                cb(false);
            }
        }
        modalContent.onclick = function (e) {
            e.stopPropagation();
        }
        approveButton.onclick = function () {
            modalWrapper.remove();
            cb(true);
        }
        closeIcon.onclick = function (){
            modalWrapper.remove();
            cb(false);
        }
        closeButton.onclick = function () {
            modalWrapper.remove()
            cb(false);
        }
    }
})()