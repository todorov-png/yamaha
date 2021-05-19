'use strict';

//Появление формы при наведении на блок "Поиграть на инструменте"
const tool = document.querySelectorAll(".tool-description__row"),
      hoverBtnTesting = document.querySelector(".registration-for-testing__text"),
      formTesting = document.querySelector(".registration-for-testing__form-wrapper");

function showFormTests() {
  formTesting.style.display = "flex";
	formTesting.style.opacity = 1;
	if (tool[2].offsetWidth > 480) {
		formTesting.style.height = tool[2].offsetHeight + 1 + 'px';
	} else {
		formTesting.style.height = tool[1].offsetHeight + tool[2].offsetHeight + 1 + 'px';
	}
}

if (hoverBtnTesting !== null) {
	hoverBtnTesting.addEventListener('mouseover', showFormTests);
	hoverBtnTesting.addEventListener('touchstart', showFormTests);
	window.addEventListener('resize', showFormTests);
	//hoverBtnTesting.addEventListener('touchenter', showFormTests);
}


//Получение данных с формы регистрации без перезагрузки JS formData
document.addEventListener('DOMContentLoaded', function(){
  const form = document.querySelector(".registration-for-testing__form");
	if (form !== null) {
		form.addEventListener('submit', (e)=> {
			const request = new XMLHttpRequest(),
						formData = new FormData(form);
			e.preventDefault();
			callPopUp('Записываю вашу заявку, подождите!');
			request.open('POST', '../php/mail.php');
			request.send(formData);
			request.addEventListener('load', () => {
				if (request.status === 200) {
					callPopUp('Ваша заявка принята, ожидайте звонка!');
					form.reset();
					let op = 1;
					setTimeout(()=>{
						setTimeout(function func() {
							if (op < 0) {
								formTesting.style.display = 'none';
								return;
							}
							formTesting.style.opacity = op;
							op -= 0.05;
							setTimeout (func, 50);
						}, 50); 
					}, 1000);
				} else {
					callPopUp('Произошла ошибка, попробуйте еще!');
				}
			});
		});
	}
});