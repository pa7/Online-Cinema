var buyButtons = document.querySelectorAll('.buy');
var printer = document.querySelector('.printer');

for(var i=0; i<buyButtons.length; i++) buyButtons[i].addEventListener('click', buy);

function buy(){
  printer.classList.toggle('printed');
}

$('.video').click(function(){
  var $this = $(this);
  var youtubeTrailerId = $this.data('trailerYtId');
  $(this).append('<iframe width="920" height="518" src="http://www.youtube.com/embed/'+youtubeTrailerId+'", frameborder="0", allowfullscreen>');
});