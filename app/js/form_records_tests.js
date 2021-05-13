'use strict';

//Появление формы при наведении на блок "Поиграть на инструменте"
const tool = document.querySelectorAll(".tool-description__row"),
      hoverBtnTesting = document.querySelector(".registration-for-testing__text"),
      formTesting = document.querySelector(".registration-for-testing__form-wrapper");

function showFormTests() {
  formTesting.style.display = "flex";
	if (tool[2].offsetWidth > 480) {
		formTesting.style.height = tool[2].offsetHeight + 1 + 'px';
	} else {
		formTesting.style.height = tool[1].offsetHeight + tool[2].offsetHeight + 1 + 'px';
	}
}

hoverBtnTesting.addEventListener('mouseover', showFormTests);
hoverBtnTesting.addEventListener('touchstart', showFormTests);
window.addEventListener('resize', showFormTests);
//hoverBtnTesting.addEventListener('touchenter', showFormTests);

//Получение данных с формы заявки без перезагрузки
$(document).ready(function() {
	//E-mail Ajax Send
	$(".registration-for-testing__form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			callPopUp('.pop-up-notification', '.pop-up-notification__text', 'Ваша заявка принята, ожидайте звонка');
			th.trigger("reset");
			formTesting.style.display = "none";
			/* setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000); */
		});
		return false;
	});
});