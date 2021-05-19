'use strict';

//Получение данных с формы регистрации без перезагрузки jquery
$(document).ready(function() {
	$(".form-authorization__form").submit(function() {
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "../php/account_form.php", 
			data: th.serialize()
		}).done(function(response) {
      const answer = $.parseJSON(response);
      if (answer) {
        th.trigger("reset");
      }
		});
		return false;
	});
});














//Получение данных с формы регистрации без перезагрузки JS formData
document.addEventListener('DOMContentLoaded', function(){
  const form = document.querySelector(".form-authorization__form");
  if (form !== null) {
    form.addEventListener('submit', (e)=> {
      e.preventDefault();

      const request = new XMLHttpRequest(),
            formData = new FormData(form);

      console.log('Данные на отправку', formData); //данные на отправку

      request.open('POST', 'server.php');
      request.send(formData);
      request.addEventListener('load', () => {
        if (request.status === 200) {
            console.log('Ответ сервера', request.response); //ответ от сервера
            form.reset();
        } else {
            console.log('Error');
        }
      });
    });
  }
});
//Код на сервере php
/* <?php
  echo json_encode($_POST['name'], JSON_UNESCAPED_UNICODE);  // Отправляет данные клиенту
> */















//Получение данных с формы регистрации без перезагрузки JS JSON
document.addEventListener('DOMContentLoaded', function(){
  const form = document.querySelector(".form-authorization__form");
  if (form !== null) {
    form.addEventListener('submit', (e)=> {
      e.preventDefault();

      const request = new XMLHttpRequest(),
            dataJson = formToJSON(form);

      console.log('Данные на отправку', dataJson); //данные на отправку

      request.open('POST', 'server.php');
      request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      request.send(dataJson);
      request.addEventListener('load', () => {
        if (request.status === 200) {
            console.log('Ответ сервера', request.response); //ответ от сервера
            form.reset();
        } else {
            console.log('Error');
        }
      });
    });
  }
});
//Преобразование FormData в JSON формат
function formToJSON(elem) {
  let output = {};
  new FormData(elem).forEach((value, key) => {
    // Проверить, существует ли уже собственность
    if (Object.prototype.hasOwnProperty.call(output, key)) {
      let current = output[key];
      if (!Array.isArray(current)) {
        // Если это не массив, преобразуйте его в массив.
        current = output[key] = [current];
      }
      current.push(value); // Добавьте новое значение в массив.
    } else {
      output[key] = value;
    }
  });
  return JSON.stringify(output);
}
//Код на сервере php
/* <?php
  $_POST = json_decode(file_get_contents('php://input'), true);
  echo json_encode($_POST['name'], JSON_UNESCAPED_UNICODE); // Отправляет данные клиенту
> */