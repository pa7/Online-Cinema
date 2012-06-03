$(function(){
  var startInHalfAMinute = new Date().getTime() + 30000;
  var film = {
    startsAt: startInHalfAMinute,
    sources: {
      mp4: "films/BigBuckBunny_640x360.m4v"
    },
    trailers: ["http://www.youtube.com/watch?v=cd-go0oBF4Y&controls=0", "http://www.youtube.com/watch?v=Zm7r491n-8o&controls=0"]
  };

  PopcornYoutubeSequencer.add(film.trailers);

  var startTrailers = function(){
    PopcornYoutubeSequencer.play();
  };
  
  var startFilm = function(){
    PopcornYoutubeSequencer.destroy();
    $('#player,video').show();
    var playerElement = $('#player_html5_api');
    for(source in film.sources){
      playerElement.append('<source src="'+ film.sources[source] +'" type="video/'+ source +'"  />')
    }
    playerElement[0].play();
    
    $('.vjs-controls .vjs-progress-control').remove();
    $('.vjs-controls .vjs-play-control').remove();
    $('#player_html5_api')[0].addEventListener('pause', function(){this.play();});
  };

  $('#start-film').click(startFilm);

  // open the curtains after a certain timeout
  var curtainDelay = 1000;
  var curtainAnimationDuration = 200;
  setTimeout(function(){
    var width = $('#curtain-left').width();
    $('#curtain-left').animate({'left': '-='+width+'px'}, curtainAnimationDuration, function(){
      startTrailers();
    });
    $('#curtain-right').animate({'left': '+='+width+'px'}, curtainAnimationDuration);
    $('#wrapper').addClass('dark-bg');
  }, curtainDelay);

  var interval = setInterval(function(){
    var currentTime = new Date().getTime();
    if(currentTime >= film.startsAt){
      clearInterval(interval);
      startFilm();
    }
  }, 1000);
});
