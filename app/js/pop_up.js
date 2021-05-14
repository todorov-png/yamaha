'use strict';

//Плавное исчезновение уведомления
function callPopUp(classBlock, textBlock, text) {
  let popUp = document.querySelector(classBlock),
      blockText = popUp.querySelector(textBlock);

  popUp.style.display = 'block';
  blockText.textContent = text;
  popUp.style.opacity = 1;

  smoothTransparencyChange(popUp, 1500, 50);
}

function smoothTransparencyChange(block, timeStart, timeInterval) {
  let op = 1;
  setTimeout(()=>{
    setTimeout(function func() {
      if (op < 0) {
        block.style.display = 'none';
        return;
      }
      block.style.opacity = op;
      op -= 0.05;
      setTimeout (func, timeInterval);
    }, timeInterval); 
  }, timeStart);
}