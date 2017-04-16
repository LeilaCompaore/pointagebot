const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();


const pageToken = "EAAbCIOVgkUQBAFozVNwThYJAqtNC4dUyO8B6EiOyYrFAdJGl5oyPzvfXWEvzLtqNKm8ZAaOAYZBjfE6zXSeZBUVyKyKC0BgwZCOtit1UZAQD5EyPcrA4n8SZB7HSCSlqZAufPyyTPfkw0bhmUZBGJ2itHzkTw4V3282oaDHfDETZCgjXjNfhMZAXcF";

app.set('port', process.env.PORT || 5000)
app.listen(app.get('port'), function() {
  console.log("sooo, we're listening fam, check port: "+app.get('port'));
});

app.use(bodyParser.json());
app.get('/', function(req, res) {
  res.send('allo le monde');
})

//MESSENGER PAGE TOKEN VERIFICATION
app.get('/webhook/', function(req, res) {
  if (req.query['hub.verify_token'] === 'PRINCESSE_YENNENGA') {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('are you trynna fool me?? Your token is not working')
  }
});


app.post('/webhook/', function (req, res) {

  var event = req.body.entry[0].messaging[0]
  var senderID = event.sender.id;
    if (event.message && event.message.text) {
      replyfunction(senderID,"you: "+ event.message.text);

      switch (event.message.text) {
        //punch in
        case 'pin':
          punch(senderID, 'punchin');
          break;
        //punch out
        case 'pout':
            punch(senderID, 'punchout');
            break;
        default:
          replyfunction(senderID,"echo: "+ event.message.text);
      }


      } else {
        console.log("AAA");
        console.log("Webhook received unknown event: ", event);
        console.log("BBB");
      }

      //the following will mess up with your brain for hours if missing
      res.sendStatus(200)

});


function replyfunction (senderID, text){

  let messageecho = { text:text }
      request({
          url: 'https://graph.facebook.com/v2.6/me/messages',
          qs: {access_token:pageToken},
          method: 'POST',
          json: {
              recipient: {id:senderID},
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


function punch (senderID, text) {

  let message = {text: "not punch in nor punch out"}
  switch (text) {
    case "punchin":
      message.text = "Welcome to the office";
      break;
    case "punchout":
      message.text = "Bye, see you!";
      break;
  }

  request ({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token:pageToken},
    method: 'POST',
    json: {
      recipient: {id: senderID},
      message: message
    }
  }, function (err, res, body) {
    if(err) {
      console.log('Error sending messages (punch()): ', err)
    } else if (response.body.error) {
        console.log('Error: ', response.body.error)
    }
  })
}
