'use strict';

//Появление надписи при наведении на блок с инструментом
const instruments = document.querySelectorAll(".instruments-item");

instruments.forEach((elem)=>{
  //Обработчики событий вешаем только если элементы достаточно большие для нормального отображения
  if (elem.offsetHeight > 140) {

    elem.addEventListener('mouseover', ()=> {
      elem.querySelector(".instruments-item__hover-text").style.display="block";
    });

    elem.addEventListener('mouseout', ()=> {
      elem.querySelector(".instruments-item__hover-text").style.display="none";
    });
  }
  /* elem.addEventListener('touchstart', ()=> {
    elem.querySelector(".instruments-item__hover-text").style.display="block";
  }); */

  /* elem.addEventListener('touchend', ()=> {
    elem.querySelector(".instruments-item__hover-text").style.display="none";
  }); */

  /* elem.addEventListener('mousedown', ()=> {
    alert('нажали купить');
  }); */
});