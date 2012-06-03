var cradle = require('cradle');

var connection = new cradle.Connection('online-cinema.iriscouch.com', 80);

var db = connection.database('development');

exports.Screening = (function() {

  function Screening() {}

  Screening.get = function(couchId, callback) {
    // db.get(couchId, function(err, doc) {
    //   doc.id = doc._id;
    //   callback(err, doc);
    // });
    callback(null, {
      film: {
        name: "The Dark Knight Rises"
      },
      trailers: [
        { youtubeUrl: "http://www.youtube.com/watch?v=sftuxbvGwiU" },
        { youtubeUrl: "http://www.youtube.com/watch?v=cd-go0oBF4Y" },
        { youtubeUrl: "http://www.youtube.com/watch?v=Zm7r491n-8o" }
      ]
    });
  };

  Screening.save = function(screeningData, callback) {
    var saveCb;
    saveCb = function(err, doc) {
      if (err != null) {
        console.log('error saving screening');
        callback(err);
        return;
      }
      screeningData.id = doc.id;
      screeningData._id = doc.id;
      screeningData._rev = doc.rev;
      return callback(null, screeningData);
    };
    if (screeningData._id && screeningData._rev) {
      return db.save(screeningData.id, screeningData._rev, saveCb);
    } else {
      return db.save(screeningData, saveCb);
    }
  };

  Screening.all = function(callback){
    db.view('design/screenings', {
        include_docs: true
      }, function(err, docs) {
        if(err)
          callback(err, docs);
        else{
          var screenings = [];
          var currentDoc = null;
          var currentIndex = 0;
          var temp = null;
          for(var i = 0; i < docs.length; i++){
            currentDoc = docs[i];
            
            if(currentDoc.key[1] === 1)
              currentIndex = screenings.push(currentDoc.doc) - 1;
            else if(currentDoc.key[1] === 2){
              screenings[currentIndex].film = currentDoc.doc;
            }
          }
          //console.log(screenings);
          callback(err, screenings);
        }
    });

  };

  return Screening;

})();