'use strict';

createTableHistory();


function goToMyAccount(){
  const dataUser = JSON.parse(localStorage.getItem('data_user')),
        request = new XMLHttpRequest();

  if(dataUser !== null) {

    request.open('POST', '../php/history_of_orders.php');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send(JSON.stringify(dataUser.email));
    request.addEventListener('load', () => {

      if (request.status === 200) {
        const answer = JSON.parse(request.response);

        if(answer) {
          console.log(answer);
          localStorage.setItem('data_history_of_orders', JSON.stringify(answer));
        }
        document.location.href = "http://yamahashop.zzz.com.ua/page/my_account.html";
      } else {
        callPopUp('Произошла ошибка, попробуйте позже!');
      }
    });
  } else {
    callPopUp('Авторизуйтесь для просмотра аккаунта!');
  }
}


function signOut() {
  localStorage.clear();
  document.location.href = "http://yamahashop.zzz.com.ua";
}


function createTableHistory() {
  const historyBlock = document.querySelector(".account"),
        historyData = JSON.parse(localStorage.getItem('data_history_of_orders'));
        

  if(historyBlock !== null && historyData !== null && historyData.length > 0) {
    //Удаляем все таблицы, которые были созданы до этого
    const tableOld = document.querySelectorAll(".table-history-orders");

    if(tableOld !==null) {
      tableOld.forEach((elem) => {
        elem.remove();
      });
    }

    //Изменяем заголовок если есть заказы
    document.querySelector(".account__heading-text").innerText = 'История заказов';

    //Перебирать заказы и каждый заказ создавать отдельную таблицу с обводкой
    historyData.forEach((order) => {
      const table = document.createElement("table");
      let tableTextHTML =  `<thead>
                              <tr>
                              <td class="table-history-orders__header">Заказ №${order[0]}</td>
                              </tr>
                            </thead>
                            <tr class="table-history-orders__row">
                              <th>Товар</th>
                              <th>Цена</th>
                              <th>Количество</th>
                            </tr>`;

      order[1].forEach((product) => {
        tableTextHTML += `<tr class="table-history-orders__row" data-id="${product.id}">
                            <td class="table-history-orders__row-name">${product.name}</td>
                            <td class="table-history-orders__row-price">${product.price}</td>
                            <td class="table-history-orders__row-amount">${product.counter}</td>
                          </tr>`;
      });

      table.classList.add('table-history-orders');
      table.innerHTML = tableTextHTML;
      historyBlock.append(table);
    });

  } else if(document.querySelector(".account__heading-text") !== null){
    document.querySelector(".account__heading-text").innerText = 'История заказов пуста';
  }
}