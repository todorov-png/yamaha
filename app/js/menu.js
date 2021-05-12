'use strict';

//import setOpacity from './pop_up.js';

const header = document.querySelector(".header"),
      burgerMenu = header.querySelector(".menu-burger__header"),
      headerNav = header.querySelector(".header__nav"),
      headerItem = header.querySelectorAll(".header__item");

headerNav.style.top = header.offsetHeight + 'px';

burgerMenu.onclick = () => {
  burgerMenu.classList.toggle("open-menu");
  headerNav.classList.toggle("open-menu");
};

headerItem[0].style.width = headerItem[2].offsetWidth + 'px';