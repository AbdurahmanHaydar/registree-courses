const express = require('express')
var request = require('request');
var path = require('path');
const app = express()
const port = 3001

// app.get('/api', (req, res) => res.send('Hello World!'))

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api', function(req, res){

    request('https://registree-coding-challenge.glitch.me/stanford', function (error, response, body) {
          console.log('error:', error); // Print the error if one occurred and handle it
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

          console.log( response );
          res.send(body)

    });

})




app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
