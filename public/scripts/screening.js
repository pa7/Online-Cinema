$(function(){
  var activateBt = $('#activate');
  var keyInput = $('#keyInput');
  activateBt.click(function(){
    var key = keyInput.val();
    if(key)
      $.ajax({
        url: window.location.href + '/sources',
        type: 'POST',
        data: { key: key },
        success: function(){
          activateBt.remove();
          keyInput.remove();
          startTrailers();
        },
        error: function(err, xhr){
          console.log(err, xhr);
        }
      });
  });

  var startInHalfAMinute = new Date().getTime() + 30000;
  var film = {
    startsAt: startInHalfAMinute,
    sources: {
      mp4: "/films/BigBuckBunny_640x360.m4v"
    }
  };

  PopcornYoutubeSequencer.add(trailers);

  var startTrailers = function(){
    PopcornYoutubeSequencer.play();
  };
  
  var startFilm = function(){
    PopcornYoutubeSequencer.destroy();
    $('video, #player').removeClass('hidden');
    var playerElement = $('#player_html5_api');
    console.log(playerElement);
    for(source in film.sources){
      playerElement.append('<source src="'+ film.sources[source] +'" type="video/'+ source +'"  />')
    }
    playerElement[0].play();
    
    $('.vjs-controls .vjs-progress-control').remove();
    $('.vjs-controls .vjs-play-control').remove();
    $('#player_html5_api')[0].addEventListener('pause', function(){this.play();});
  };
  window.startFilm = startFilm;

  // open the curtains after a certain timeout
  var curtainDelay = 1000;
  var curtainAnimationDuration = 2000;
  setTimeout(function(){
    var width = $('#curtain-left').width();
    $('#curtain-left').animate({'left': '-='+width+'px'}, curtainAnimationDuration, function(){
      
    });
    $('#curtain-right').animate({'left': '+='+width+'px'}, curtainAnimationDuration);
    $('#wrapper').addClass('dark-bg');
  }, curtainDelay);

  var interval = setInterval(function(){
    var currentTime = new Date().getTime();
    if(currentTime >= film.startsAt){
      clearInterval(interval);
      //startFilm();
    }
  }, 1000);
});
