const express = require('express');
const app = express();

app.set('port', process.env.PORT || 5000)
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

app.listen(app.get('port'), function() {
  console.log("sooo, we're listening fam, check port: "+app.get('port'));
});
