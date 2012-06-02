$(function(){
  $('#open-curtains').click(function(){
    var width = $('#curtain-left').width();
    $('#curtain-left').animate({'left': '-='+width+'px'}, 7000);
    $('#curtain-right').animate({'left': '+='+width+'px'}, 7000);
    $('#wrapper').addClass('dark-bg');
  });
});