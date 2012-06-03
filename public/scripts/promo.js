var buyButtons = document.querySelectorAll('.buy');
var printer = document.querySelector('.printer');

for(var i=0; i<buyButtons.length; i++) buyButtons[i].addEventListener('click', buy);

function buy(){
  printer.classList.toggle('printed');
}