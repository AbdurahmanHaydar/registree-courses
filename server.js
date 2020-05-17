const express = require('express')
var request = require('request');
var path = require('path');
const app = express()
const port = 3001

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api', function(req, res){

    var arr = []


    request('https://registree-coding-challenge.glitch.me/cornell' , function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var data1 = JSON.parse(body);

            request('https://registree-coding-challenge.glitch.me/stanford' , function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var data2 = JSON.parse(body);
                    console.log('data1', data1, 'data2', data2);

                    var arr = data1.concat(data2)

                    console.log(arr);

                    res.send(arr)

                }
            });
        }
    });



})




app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
