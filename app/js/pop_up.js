'use strict';

//Плавное исчезновение уведомления
function callPopUp(classBlock, textBlock, text) {
  let popUp = document.querySelector(classBlock),
      blockText = popUp.querySelector(textBlock),
      op = 1;

  popUp.style.display = 'block';
  blockText.textContent = text;
  popUp.style.opacity = 1;

  setTimeout(()=>{
    setTimeout(function func() {
      if (op < 0) {
        popUp.style.display = 'none';
        return;
      }
      popUp.style.opacity = op;
      op -= 0.05;
      setTimeout (func, 50);
    }, 50); 
  }, 1500);
}