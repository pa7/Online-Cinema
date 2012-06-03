var slider = $('input[type=range]');
var holders = $('.holder');
var tickets = $('.ticket');
var ticketHeight = holders.outerHeight();
var ticketCount = tickets.size();
var minHeight = 5;
var paper = $('.paper').height(ticketCount*ticketHeight);
var printer = $('.printer');

slider.change(function(){
  updateHeight(this.value/100 * ticketHeight);
});

holders.each( function(i, el){ placeHolder(i, el); });

function placeHolder(i, holder){
  $(holder).css('webkitTransform', 'translateY('+(i*ticketHeight)+'px)');
}

function placeTicket(i, top, height){
  holder = holders.eq(i);
  holder.css('webkitTransform', 'translateY('+top+'px)');
  
  var alpha = getAngle(height);
  var depth = (Math.sin(alpha) * ticketHeight) % ticketHeight/2;
  
  // convert alpha to degrees
  alpha *= 180/Math.PI;
  
  if(i % 2){
    alpha *= -1;
  } else {
    depth *= -1;
  }
  
  holder.find('.ticket').css('webkitTransform', 'translateZ('+depth+'px) rotateX('+alpha+'deg)');
}

function getAngle(height){
  return Math.acos(height/ticketHeight);
}

tickets.mousedown(function(event){
  paper.data('posY', event.pageY);
  $(document).mousemove(drag);
  $(document).mouseup(stopToDrag);
});

function drag(event){
  if(event.pageY !== paper.data('posY')){
    paper.css('top', "+=" + (event.pageY - paper.data('posY')));
    paper.data('posY', event.pageY);
    collisionDetection();
  }
}

function stopToDrag(){
  $(this).unbind('mousemove');
}

function getOverflow(){
  return paper.height() + paper.offset().top - printer.height() - printer.offset().top;
}

function getRestHeights(restHeight, ticketHeight){
  var heights = new Array();
  var nextHeight = restHeight/2;
  
  while(Math.floor(ticketHeight/nextHeight) > 2){
    nextHeight = 2 * nextHeight;
    heights.push(nextHeight);
  }
  heights.push(ticketHeight - nextHeight);
  
  return heights;
}

function collisionDetection(){
  var overflow = getOverflow();
  var fullRounds = Math.floor(overflow/(ticketHeight-minHeight));
  var restHeight = overflow - fullRounds*(ticketHeight-minHeight);
  var restHeights = getRestHeights(restHeight, ticketHeight);
  var pos = ticketCount - fullRounds - restHeights.length;
  var lastHeight = pos*ticketHeight;
  
  for(var i=restHeights.length-1; i >= 0; i--, pos++){
    console.log(pos, lastHeight, restHeights[i]);
    placeTicket(pos, lastHeight, restHeights[i]);
    lastHeight += restHeights[i];
  }

  for(var i=ticketCount-fullRounds, j=0; i<=ticketCount; i++, j++){
    var top = lastHeight+j*minHeight;
    placeTicket(i, top, minHeight);
    console.log(i, top, minHeight);
  }
}

collisionDetection();

//updateHeight(ticketHeight/2);