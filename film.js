$(function(){
  var film = {
    startsAt : 333,
    url: "films/big_buck_bunny_480p_surround-fix.avi"
  }
  var curtainAnimationDuration = 200;
  PopcornYoutubeSequencer.add(["http://www.youtube.com/watch?v=cd-go0oBF4Y&controls=0", "http://www.youtube.com/watch?v=Zm7r491n-8o&controls=0"]);
  var startPlaying = function(){
    PopcornYoutubeSequencer.play();
  };
  $('#open-curtains').click(function(){
    var width = $('#curtain-left').width();
    $('#curtain-left').animate({'left': '-='+width+'px'}, curtainAnimationDuration, function(){
      startPlaying();
    });
    $('#curtain-right').animate({'left': '+='+width+'px'}, curtainAnimationDuration);
    $('#wrapper').addClass('dark-bg');
  });
});
