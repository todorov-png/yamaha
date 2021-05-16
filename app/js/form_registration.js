'use strict';

//Получение данных с формы регистрации без перезагрузки
$(document).ready(function() {
	$(".form-reg-speed__form").submit(function() {
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "../php/registration_form.php", 
			data: th.serialize()
		}).done(function(response) {
      if ($.parseJSON(response)) {
        callPopUp('.pop-up-notification', '.pop-up-notification__text', 'Регистрация прошла успешно!');
        th.trigger("reset");
        //Сохранить данные в локал сторедж или куки
        setTimeout(function() {
          document.location.href = "http://yamahashop.zzz.com.ua/";
        }, 1000);
      } else {
        callPopUp('.pop-up-notification', '.pop-up-notification__text', 'Пользователь с таким email уже зарегистрирован, перейдите на страницу входа!');
      }
		});
		return false;
	});
});