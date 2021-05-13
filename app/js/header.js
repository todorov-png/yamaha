'use strict';

//import setOpacity from './pop_up.js';

const header = document.querySelector(".header"),
      burgerMenu = header.querySelector(".menu-burger__header"),
      headerNav = header.querySelector(".header__nav"),
      headerItem = header.querySelectorAll(".header__item");

burgerMenu.onclick = () => {
  burgerMenu.classList.toggle("open-menu");
  headerNav.classList.toggle("open-menu");
};

//При изменении ширины окна работаем с блоками
window.addEventListener('resize', function(event){
  if (header.offsetWidth > 960) {
    headerItem[0].style.width = headerItem[2].offsetWidth + 'px';
  } else {
    headerItem[0].style.width = 'auto';
  }

  headerNav.style.top = header.offsetHeight + 'px';
});