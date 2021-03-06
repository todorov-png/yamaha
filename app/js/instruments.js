'use strict';

//Появление надписи при наведении на блок с инструментом
const instruments = document.querySelectorAll(".instruments-item");

if(instruments !== null) {
  instruments.forEach((elem)=>{
    //Появление надписи купить на блоке при наведении
    elem.addEventListener('mouseover', ()=> {
      elem.querySelector(".instruments-item__hover-text").style.display="block";
    });

    //Убираем надпись купить, если курсор ушел с блока
    elem.addEventListener('mouseout', ()=> {
      elem.querySelector(".instruments-item__hover-text").style.display="none";
    });

    //Добавляем товар в корзину, если кликнули
    elem.addEventListener('click', ()=> {
      const user = JSON.parse(localStorage.getItem('data_user')),
            counterBasketText = document.querySelector(".counter-basket-text");

      if(user !== null) {
        let basket = JSON.parse(localStorage.getItem('data_basket')),
            attribute = elem.getAttribute("data-id");

        const price = parseInt(elem.querySelector("p").textContent);

        if(basket === null) {
          //Если корзина пуста, то сохраняем данные
          basket = [{
              id: attribute,
              name: elem.querySelector("h4").textContent,
              price: price,
              counter: 1,
              sum: price
          }];
          localStorage.setItem('data_basket', JSON.stringify(basket));
          counterBasketText.textContent = parseInt(counterBasketText.textContent) + 1;
          callPopUp('Товар добавлен в корзину!');
        } else {
          let i = 0;
          basket.forEach(obj => {
            if(obj.id === attribute) {
              i++;
            }
          });
          
          if(i === 0) {
            basket.push({
              id: attribute,
              name: elem.querySelector("h4").textContent,
              price: price,
              counter: 1,
              sum: price
            });
            localStorage.setItem('data_basket', JSON.stringify(basket));
            counterBasketText.textContent = parseInt(counterBasketText.textContent) + 1;
            callPopUp('Товар добавлен в корзину!');
          } else {
            callPopUp('Вы уже добавили этот товар в корзину!');
          }
        }
      } else {
        callPopUp('Для добавления в корзину необходимо авторизоваться!');
      }
    });
  });
}
