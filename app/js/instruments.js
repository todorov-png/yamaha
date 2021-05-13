'use strict';

//Появление надписи при наведении на блок с инструментом
const instruments = document.querySelectorAll(".instruments-item");

instruments.forEach((elem)=>{
  elem.addEventListener('mouseover', ()=> {
    elem.querySelector(".instruments-item__hover-text").style.display="block";
  });

  elem.addEventListener('mouseout', ()=> {
    elem.querySelector(".instruments-item__hover-text").style.display="none";
  });
});

//При изменении ширины окна работаем с блоками
/*window.addEventListener('resize', function(event){
  instruments.forEach((elem)=>{
    elem.addEventListener('mouseover', ()=> {
      elem.querySelector(".instruments-item__hover-text").style.display="block";
    });

    elem.addEventListener('mouseout', ()=> {
      elem.querySelector(".instruments-item__hover-text").style.display="none";
    });
    /* elem.addEventListener('touchstart', ()=> {
      elem.querySelector(".instruments-item__hover-text").style.display="block";
    }); 
  
    /* elem.addEventListener('touchend', ()=> {
      elem.querySelector(".instruments-item__hover-text").style.display="none";
    }); 
  
    /* elem.addEventListener('mousedown', ()=> {
      alert('нажали купить');
    }); 
  });
});*/