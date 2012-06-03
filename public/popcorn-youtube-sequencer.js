/*
 * PopcornYoutubeSequencer
 *
 * Public Interface
 * - add: sets an array of youtube urls
 * - play: starts a loop of set trailers
 * - next: shows the next trailer in the looping queue  
 * - destroy: destroys the player used for the trailer-loop
 */
var PopcornYoutubeSequencer = (function(){
  var player = null,
      urls = [],
      currentTrailer = 0,
      add = function(youtubeUrls){
        urls = youtubeUrls;
      },
      play = function(){
        player = Popcorn.youtube('#trailers', urls[currentTrailer]);
        player.on('ended', next );
        player.play();
      },
      next = function(){
        currentTrailer++;
        player.destroy();
        if(currentTrailer >= urls.length){
          currentTrailer = 0;
        }
        play();
      },
      destroy = function(){

        player.pause();
        player.destroy();
      };

  return {
    add: add,
    play: play,
    next: next,
    destroy:  destroy
  };
}());
