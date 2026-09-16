(() => {
    const header = document.querySelector('header');
    if (!header) return;

    const menuButton = header.querySelector('.open-menu');
    const menuBox = header.querySelector('.menu-box');
    const menuOpenIcon = header.querySelector('.open-menu-btn');
    const menuCloseIcon = header.querySelector('.off-menu-btn');
    const searchButton = header.querySelector('.search-btn');
    const searchBox = header.querySelector('.search-box');
    const searchOpenIcon = header.querySelector('.open-search-btn');
    const searchCloseIcon = header.querySelector('.off-search-btn');
    const searchInput = header.querySelector('#search');
    const searchClear = header.querySelector('#clear');
    const searchGo = header.querySelector('#go');
    const searchUnderline = header.querySelector('.bor-top');

    let lastScrollTop = window.scrollY;
    let menuOpen = false;
    let searchOpen = false;

    const setPageScroll = (locked) => {
        if (window.innerWidth <= 769) {
            document.documentElement.style.overflowY = locked ? 'hidden' : 'auto';
        }
    };

    const closeMenu = () => {
        if (!menuBox) return;
        menuBox.style.display = 'none';
        menuOpenIcon.style.top = '0';
        menuCloseIcon.style.top = 'var(--button)';
        menuOpen = false;
        setPageScroll(searchOpen);
    };

    const closeSearch = () => {
        if (!searchBox) return;
        searchBox.classList.remove('search-box-change');
        searchOpenIcon.style.top = '0';
        searchCloseIcon.style.top = 'var(--button)';
        searchOpen = false;
        setPageScroll(menuOpen);
    };

    window.addEventListener('scroll', () => {
        if (window.innerWidth < 770) return;

        const scrollTop = Math.max(window.scrollY, 0);
        const scrollingDown = scrollTop > lastScrollTop;

        if (scrollingDown && scrollTop > 10) {
            header.classList.add('nav-scr');
            menuButton.style.opacity = '1';
            menuButton.style.pointerEvents = 'all';
        } else if (!scrollingDown) {
            header.classList.remove('nav-scr');
            menuButton.style.opacity = '0';
            menuButton.style.pointerEvents = 'none';
            closeMenu();
        }

        lastScrollTop = scrollTop;
    }, { passive: true });

    menuButton?.addEventListener('click', () => {
        if (menuOpen) {
            closeMenu();
            return;
        }
        closeSearch();
        menuBox.style.display = 'flex';
        menuOpenIcon.style.top = '-100%';
        menuCloseIcon.style.top = '0';
        menuOpen = true;
        setPageScroll(true);
    });

    searchButton?.addEventListener('click', () => {
        if (searchOpen) {
            closeSearch();
            return;
        }
        closeMenu();
        searchBox.classList.add('search-box-change');
        searchOpenIcon.style.top = '-100%';
        searchCloseIcon.style.top = '0';
        searchOpen = true;
        setPageScroll(true);
    });

    header.querySelectorAll('.menu-open a').forEach((link) => {
        link.addEventListener('click', closeMenu);
    });

    const updateSearchControls = () => {
        const hasValue = Boolean(searchInput?.value);
        if (searchClear) searchClear.style.display = hasValue ? 'block' : 'none';
        if (searchGo) {
            searchGo.style.opacity = hasValue ? '1' : '0';
            searchGo.style.pointerEvents = hasValue ? 'all' : 'none';
        }
        if (searchUnderline) searchUnderline.textContent = searchInput?.value || '';
    };

    searchInput?.addEventListener('input', updateSearchControls);
    searchClear?.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
        updateSearchControls();
    });
})();