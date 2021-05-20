'use strict';

createTableBasket();

function deleteProduct(idRow) {
  const table = document.querySelector(".table-product"),
        row = table.querySelector(`[data-id="${idRow}"]`),
        basket = JSON.parse(localStorage.getItem('data_basket'));

  row.remove();
  if(basket.length !== 1) {
    const filteredBasket = basket.filter((item) => item.id !== idRow);
    console.log(filteredBasket);
    costBasket(filteredBasket);
    localStorage.setItem('data_basket', JSON.stringify(filteredBasket));
  } else {
    //Если удалены все позиции, то изменяем заголовок и удаляем таблицу и форму
    clearBasket();
  }
}


function plusProductCounter(idRow) {
  const table = document.querySelector(".table-product"),
        basket = JSON.parse(localStorage.getItem('data_basket')),
        row = table.querySelector(`[data-id="${idRow}"]`),
        price = row.querySelector(".table-product__row-price"),
        amount = row.querySelector(".table-product__row-amount").querySelector("span"),
        sum = row.querySelector(".table-product__row-sum"),
        priceValue = parseInt(price.innerText);
      
  let amountValue = parseInt(amount.innerText);

  amountValue++;
  if(amountValue > 19) {
    amountValue = 20;
    callPopUp('Максимальное количество товара 20!');
  }
  amount.innerText = String(amountValue);
  sum.innerText = String(amountValue * priceValue);

  basket.forEach(product => {
    if(product.id === idRow) {
      product.counter = amountValue;
      product.sum = amountValue*priceValue;
    }
  });

  costBasket(basket);
  localStorage.setItem('data_basket', JSON.stringify(basket));
}


function minusProductCounter(idRow) {
  const table = document.querySelector(".table-product"),
        basket = JSON.parse(localStorage.getItem('data_basket')),
        row = table.querySelector(`[data-id="${idRow}"]`),
        price = row.querySelector(".table-product__row-price"),
        amount = row.querySelector(".table-product__row-amount").querySelector("span"),
        sum = row.querySelector(".table-product__row-sum"),
        priceValue = parseInt(price.innerText);
      
  let amountValue = parseInt(amount.innerText);

  amountValue--;
  if(amountValue < 1) {
    amountValue = 1;
    callPopUp('Минимальное количество товара 1!');
  }
  amount.innerText = String(amountValue);
  sum.innerText = String(amountValue * priceValue);

  basket.forEach(product => {
    if(product.id === idRow) {
      product.counter = amountValue;
      product.sum = amountValue*priceValue;
    }
  });

  costBasket(basket);
  localStorage.setItem('data_basket', JSON.stringify(basket));
}


function createTableBasket() {
  const basketBlock = document.querySelector(".basket"),
        basketData = JSON.parse(localStorage.getItem('data_basket'));
        

  if(basketBlock !== null && basketData !== null && basketData.length > 0) {

    let table = document.querySelector(".table-product"),
        form = document.querySelector(".form-product"),
        tableTextHTML = ` <tr class="table-product__row">
                            <th>Товар</th>
                            <th>Цена</th>
                            <th>Количество</th>
                            <th>Сумма</th>
                          </tr>`,
        formTextHTML = `<p class="form-product__text">
                          Сумма заказа: 
                          <span class="form-product__sum"></span>&nbsp;грн.
                        </p>
                        <button>Заказать</button>`;

    basketData.forEach((product) => {
      tableTextHTML += ` <tr class="table-product__row" data-id="${product.id}">
                      <td class="table-product__row-name">${product.name}</td>
                      <td class="table-product__row-price">${product.price}</td>
                      <td class="table-product__row-amount-wraper">
                        <div class="table-product__row-amount">
                          <a href="javascript:void(0);" onclick="minusProductCounter('${product.id}');"><i class="far fa-minus-square"></i></a>
                          <span>${product.counter}</span>
                          <a href="javascript:void(0);" onclick="plusProductCounter('${product.id}');"><i class="far fa-plus-square"></i></a>
                        </div>
                        </td>
                      <td class="table-product__row-sum">${product.sum}</td>
                      <td class="table-product__row-close">
                        <a href="javascript:void(0);" onclick="deleteProduct('${product.id}');"><i class="fas fa-times"></i></a>
                      </td>
                    </tr>`;
    });

    if (table === null) {
      table = document.createElement("table");
    }
    if(form === null) {
      form = document.createElement("form");
    }

    table.classList.add('table-product');
    form.classList.add('form-product');
    table.innerHTML = tableTextHTML;
    form.innerHTML = formTextHTML;
    basketBlock.append(table);
    basketBlock.append(form);
    document.querySelector(".basket__heading-text").innerText = 'Корзина';
    costBasket(basketData);
  } else if(document.querySelector(".basket__heading-text") !== null){
    document.querySelector(".basket__heading-text").innerText = 'Корзина пуста';
  }
}


function costBasket(data) {
  const sumBlock = document.querySelector(".form-product__sum");
  let sum = 0;

  data.forEach(product => {
    sum += product.sum;
  });

  if(sumBlock !== null) {
    sumBlock.innerText = String(sum);
  }
}

function clearBasket() {
  const table = document.querySelector(".table-product"),
        form = document.querySelector(".form-product");

  if (form !== null && table !== null) {
    table.remove();
    form.remove();
    localStorage.removeItem('data_basket');
    document.querySelector(".basket__heading-text").innerText = 'Корзина пуста';
    callPopUp('Корзина пуста!');
  }
}


//Получение данных с формы регистрации без перезагрузки JS JSON
document.addEventListener('DOMContentLoaded', function(){
  const form = document.querySelector(".form-product");
  if (form !== null) {
    form.addEventListener('submit', (e)=> {
      e.preventDefault();

      let data = {},
          tools = `[`;

      const basketData = JSON.parse(localStorage.getItem('data_basket')),
            userData = JSON.parse(localStorage.getItem('data_user')),
            request = new XMLHttpRequest();

      if(userData !== null && basketData !== null) {

        basketData.forEach((product) => {
          tools += `{"id":"${product.id}","name":"${product.name}","price":"${product.price}","counter":"${product.counter}"},`;
        });

        tools = tools.substring(0, tools.length-1)+']';
        data.email = userData.email;
        data.tools = JSON.parse(tools);
      }

      request.open('POST', '../php/basket.php');
      request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      request.send(JSON.stringify(data));
      request.addEventListener('load', () => {
        if (request.status === 200) {
          clearBasket();
          callPopUp('Заказ принят, ожидайте, мы с вами свяжемся!');
        } else {
          callPopUp('Произошла ошибка, попробуйте еще!');
        }
      });
    });
  }
});