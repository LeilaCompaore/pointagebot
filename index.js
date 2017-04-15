const express = require('express');
const app = express();


app.get('/', function(req, res) {
  res.send('allo le monde');
})

app.listen(5000, function() {
  console.log("sooo, we're listening fam, check port 5000");
});
