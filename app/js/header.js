'use strict';

const header = document.querySelector(".header"),
      burgerMenu = header.querySelector(".menu-burger__header"),
      headerNav = header.querySelector(".header__nav"),
      headerItem = header.querySelectorAll(".header__item");

if (header !== null) {
  headerRendering();

  //При изменении ширины окна перерисовываем шапку
  window.addEventListener('resize', function(event){
    headerRendering();
  });
  
  burgerMenu.onclick = () => {
    burgerMenu.classList.toggle("open-menu");
    headerNav.classList.toggle("open-menu");
  };
}

//Меняем кнопки в шапке если есть авторизация пользователя
const userData = JSON.parse(localStorage.getItem('data_user'));

if(userData !== null) {
  updataUserData();
} else {
  //Скрываем корзину до авторизации
  const basketLink = header.querySelector(".header__item-basket");

  if(basketLink !== null) {
    basketLink.style.display="none";
  }
}

//При обновлении данных в localStorage обновляем шапки сайта
window.addEventListener('storage', () => {
  updataUserData();
  createTableBasket();
});

//Выравниваем эмблему по центру
function headerRendering() {
  if (header.offsetWidth > 960) {
    headerItem[0].style.width = headerItem[2].offsetWidth + 'px';
  } else {
    headerItem[0].style.width = 'auto';
  }
  headerNav.style.top = header.offsetHeight + 'px';
}

//Функция обновления данных если пользователь авторизовался
function updataUserData() {
  const accountLoginLink = header.querySelectorAll(".account-login"),
        registrationLink = header.querySelectorAll(".registration"),
        basketLink = header.querySelector(".header__item-basket"),
        basketData = JSON.parse(localStorage.getItem('data_basket')),
        counterBasketText = document.querySelector(".counter-basket-text");

  //Скрываем все кнопки входа
  if(accountLoginLink !== null) {
    accountLoginLink.forEach((elem)=>{
      elem.style.display="none";
    });
  }

  //Изменяем все кнопки регистрации на Мой аккаунт
  if(registrationLink !== null) {
    registrationLink.forEach((elem)=>{
      elem.textContent ="Мой аккаунт";
      elem.setAttribute("href", 'javascript:void(0);');
      elem.setAttribute("onclick", 'goToMyAccount();');
    });
  }

  //Проверяем есть ли что в корзине и обновляем счетчик
  if(basketData !== null && counterBasketText !== null) {
    //Считаем товары и изменяем счетчик корзины
    let i = 0;
    basketData.forEach(() => {
      i++;
    });
    counterBasketText.textContent = i;  
  }
}


function goToBasket() {
  const basketData = JSON.parse(localStorage.getItem('data_basket')),
        basketLink = document.querySelector(".header__item-basket");
  if(basketData !== null) {
    let i = 0;
    basketData.forEach(() => {
      i++;
    });
    if(i>0) {
      document.location.href = "http://yamahashop.zzz.com.ua/page/basket.html";
      basketLink.setAttribute("href", 'http://yamahashop.zzz.com.ua/page/basket.html');
    }
  } else {
    callPopUp('Ваша корзина пуста!');
  }
}