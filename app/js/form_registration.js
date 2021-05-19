'use strict';

//Получение данных с формы регистрации без перезагрузки JS formData
document.addEventListener('DOMContentLoaded', function(){
  const form = document.querySelector(".form-reg-speed__form");
  if (form !== null) {
    form.addEventListener('submit', (e)=> {
      e.preventDefault();
      const request = new XMLHttpRequest(),
            formData = new FormData(form);
      callPopUp('Проверяю данные, подождите!');
      request.open('POST', '../php/registration_form.php');
      request.send(formData);
      request.addEventListener('load', () => {
        if (request.status === 200) {
          if (JSON.parse(request.response)) {
            callPopUp('Регистрация прошла успешно!');
            form.reset();
            localStorage.setItem('data_user', request.response);
            setTimeout(function() {
              document.location.href = "http://yamahashop.zzz.com.ua/";
            }, 1000);
          } else {
            callPopUp('Пользователь с таким email уже зарегистрирован, перейдите на страницу входа!');
          }
        } else {
          callPopUp('Произошла ошибка, попробуйте еще!');
        }
      });
    });
  }
});