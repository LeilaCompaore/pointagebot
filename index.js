const express = require('express');
const app = express();

app.set('port', process.env.PORT || 5000)
app.get('/', function(req, res) {
  res.send('allo le monde');
})

app.listen(app.get('port'), function() {
  console.log("sooo, we're listening fam, check port: "+app.get('port'));
});
