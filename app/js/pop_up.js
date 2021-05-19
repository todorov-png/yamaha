'use strict';

//Плавное исчезновение уведомления
function callPopUp(text) {
  const divPopUp = document.createElement( "div" ),
      blockText = document.createElement( "p" ),
      body = document.querySelector('body'),
      oldDivPopUp = document.querySelector('.pop-up-notification');

  if (oldDivPopUp !== null) {
    oldDivPopUp.remove();
  }
  
  divPopUp.classList.add('pop-up-notification');
  blockText.classList.add('pop-up-notification__text');
  blockText.textContent = text;
  blockText.zIndex = 100000;
  divPopUp.append(blockText);
  body.insertAdjacentElement('afterBegin', divPopUp);
  smoothTransparencyChange(divPopUp, 1500, 50);
}

function smoothTransparencyChange(block, timeStart, timeInterval) {
  let op = 1;
  setTimeout(()=>{
    setTimeout(function func() {
      if (op < 0) {
        block.remove();
        return;
      }
      block.style.opacity = op;
      op -= 0.05;
      setTimeout (func, timeInterval);
    }, timeInterval); 
  }, timeStart);
}