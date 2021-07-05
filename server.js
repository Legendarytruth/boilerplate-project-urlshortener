require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const Database = require("@replit/database");
const database = new Database();
const dns = require("dns");
const url = require("url");
// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post("/api/shorturl", (req, res) => {
  console.log("Hello")
  var orig = url.parse(req.body.url);
  //console.log(orig);
  dns.lookup(orig.hostname, async (err, add, fam) => {
    if(add){
      var num = Math.floor(Math.random() * 25) 
      await database.set(num, orig.href)
      console.log({original_url: orig.href, short_url: num})
      res.json({original_url: orig.href, short_url: num})
    }
    res.json({ error: 'invalid url' })
  })
  })



app.get("/api/shorturl/:id", (req, res) =>{
  let url = req.params.id;
  database.get(url).then((value, error) => {
    res.redirect(value)
  })
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});


/*(async () => {
  const keys = await database.list();
  console.log(keys)
  for(i = 0; i < keys.length; i++){
    database.delete(keys[i])
  }
})();
*/