'use strict';

//Получение данных с формы регистрации без перезагрузки
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
        if (answer.password_status) {
          callPopUp('.pop-up-notification', '.pop-up-notification__text', 'Авторизация прошла успешно!');
          th.trigger("reset");
          //Сохранить данные в локал сторедж или куки
          setTimeout(function() {
            document.location.href = "http://yamahashop.zzz.com.ua/";
          }, 1000);
        } else {
          callPopUp('.pop-up-notification', '.pop-up-notification__text', 'Введён неверный пароль!');
        }
      } else {
        callPopUp('.pop-up-notification', '.pop-up-notification__text', 'Пользователь с таким email не найден!');
      }
		});
		return false;
	});
});