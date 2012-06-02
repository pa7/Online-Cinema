var PopcornYoutubeSequencer = (function(){
  var player = null;
  var urls = [];
  var currentTrailer = 0;

  var add = function(youtubeUrls){
    urls = youtubeUrls;
  };

  var play = function(){
    player = Popcorn.youtube('#trailers', urls[currentTrailer]);
    player.on('ended', next );
    player.play();
  };

  var next = function(){
    currentTrailer++;
    player.destroy();
    if(currentTrailer >= urls.length){
      currentTrailer = 0;
    }
    play();
  };

  var destroy = function(){
    player.destroy();
  };

  return {
    add: add,
    play: play,
    destroy:  destroy
  };
}());