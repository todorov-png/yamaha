'use strict';

const header = document.querySelector(".header"),
      burgerMenu = header.querySelector(".menu-burger__header"),
      headerNav = header.querySelector(".header__nav"),
      headerItem = header.querySelectorAll(".header__item");

burgerMenu.onclick = () => {
  burgerMenu.classList.toggle("open-menu");
  headerNav.classList.toggle("open-menu");
};

function headerRendering() {
  if (header.offsetWidth > 960) {
    headerItem[0].style.width = headerItem[2].offsetWidth + 'px';
  } else {
    headerItem[0].style.width = 'auto';
  }
  headerNav.style.top = header.offsetHeight + 'px';
}

headerRendering();

//При изменении ширины окна перерисовываем шапку
window.addEventListener('resize', function(event){
  headerRendering();
});