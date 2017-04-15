const express = require('express');
const app = express();


const pageToken = "EAAbCIOVgkUQBAFozVNwThYJAqtNC4dUyO8B6EiOyYrFAdJGl5oyPzvfXWEvzLtqNKm8ZAaOAYZBjfE6zXSeZBUVyKyKC0BgwZCOtit1UZAQD5EyPcrA4n8SZB7HSCSlqZAufPyyTPfkw0bhmUZBGJ2itHzkTw4V3282oaDHfDETZCgjXjNfhMZAXcF";

app.set('port', process.env.PORT || 5000)
app.listen(app.get('port'), function() {
  console.log("sooo, we're listening fam, check port: "+app.get('port'));
});

app.get('/', function(req, res) {
  res.send('allo le monde');
})

//MESSENGER PAGE TOKEN VERIFICATION
app.get('/webhook', function(req, res) {
  if (req.query['hub.verify_token'] === 'PRINCESSE_YENNENGA') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('are you trynna fool me?? Your token is not working')
  }
});


app.post('/webhook', function (req, res) {
  var data = req.body;

  // if( data.object === 'page' ){
    for(var i = 0; i<data.entry.length; i++) {
      var eventTime = data.entry[i].time;

      for (var j = 0; j<data.entry[i].messaging.length; j++) {
        if (data.entry[i].messaging[j].message) {
          replyfunction(data.entry[i].messaging[j]);
        } else {
          console.log("Webhook received unknown event: ", event);
        }
      }
    }
  // }
});


function replyfunction (event){

  let messageecho = { text:"echoing: "+event.message }
      request({
          url: 'https://graph.facebook.com/v2.6/me/messages',
          qs: {access_token:pageToken},
          method: 'POST',
          json: {
              recipient: {id:event.sender.id},
              message: messageecho,
          }
      }, function(error, response, body) {
          if (error) {
              console.log('Error sending messages: ', error)
          } else if (response.body.error) {
              console.log('Error: ', response.body.error)
          }
      })
}
