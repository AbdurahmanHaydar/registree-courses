const express = require('express')
var request = require('request');
var path = require('path');
const app = express()
const port = 3001

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api', function(req, res){

    var arr = [
  {"name":"Agriculture","level":"Coursework","duration":"2 year program","code":"AGRIC001"},
  {"name":"Agriculture","level":"Coursework","duration":"3 year program","code":"AGRIC002"},
  {"name":"Agriculture","level":"Bachelor","duration":"2 year program","code":"AGRIB001"},
  {"name":"Agriculture","level":"Bachelor","duration":"3 year program","code":"AGRIB002"},
  {"name":"Agriculture","level":"Master","duration":"2 year program","code":"AGRIM001"},
  {"name":"Agriculture","level":"Master","duration":"3 year program","code":"AGRIM002"},
  {"name":"Agriculture","level":"Master","duration":"4 year program","code":"AGRIM003"},
  {"name":"Architecture","level":"Coursework","duration":"2 year program","code":"ARCHC001"},
  {"name":"Architecture","level":"Coursework","duration":"3 year program","code":"ARCHC002"},
  {"name":"Architecture","level":"Bachelor","duration":"2 year program","code":"ARCHB001"},
  {"name":"Architecture","level":"Bachelor","duration":"3 year program","code":"ARCHB002"},
  {"name":"Biological and Biomedical Sciences","level":"Coursework","duration":"2 year program","code":"BIOLC001"},
  {"name":"Biological and Biomedical Sciences","level":"Coursework","duration":"3 year program","code":"BIOLC002"},
  {"name":"Biological and Biomedical Sciences","level":"Coursework","duration":"4 year program","code":"BIOLC003"},
  {"name":"Business","level":"Coursework","duration":"2 year program","code":"BUSIC001"},
  {"name":"Business","level":"Bachelor","duration":"2 year program","code":"BUSIB001"},
  {"name":"Business","level":"Bachelor","duration":"3 year program","code":"BUSIB002"},
  {"name":"Communications and Journalism","level":"Coursework","duration":"2 year program","code":"COMMC001"},
  {"name":"Communications and Journalism","level":"Coursework","duration":"3 year program","code":"COMMC002"},
  {"name":"Communications and Journalism","level":"Bachelor","duration":"2 year program","code":"COMMB001"},
  {"name":"Computer Sciences","level":"Coursework","duration":"2 year program","code":"COMPC001"},
  {"name":"Culinary Arts and Personal Services","level":"Coursework","duration":"2 year program","code":"CULIC001"},
  {"name":"Culinary Arts and Personal Services","level":"Coursework","duration":"3 year program","code":"CULIC002"},
  {"name":"Culinary Arts and Personal Services","level":"Bachelor","duration":"2 year program","code":"CULIB001"},
  {"name":"Culinary Arts and Personal Services","level":"Bachelor","duration":"3 year program","code":"CULIB002"},
  {"name":"Culinary Arts and Personal Services","level":"Bachelor","duration":"4 year program","code":"CULIB003"},
  {"name":"Culinary Arts and Personal Services","level":"Bachelor","duration":"5 year program","code":"CULIB004"},
  {"name":"Education","level":"Coursework","duration":"2 year program","code":"EDUCC001"},
  {"name":"Education","level":"Coursework","duration":"3 year program","code":"EDUCC002"},
  {"name":"Education","level":"Bachelor","duration":"2 year program","code":"EDUCB001"},
  {"name":"Education","level":"Bachelor","duration":"3 year program","code":"EDUCB002"},
  {"name":"Education","level":"Master","duration":"2 year program","code":"EDUCM001"},
  {"name":"Education","level":"Master","duration":"3 year program","code":"EDUCM002"},
  {"name":"Education","level":"Doctorate","duration":"2 year program","code":"EDUCD001"},
  {"name":"Education","level":"Doctorate","duration":"3 year program","code":"EDUCD002"},
  {"name":"Education","level":"Doctorate","duration":"4 year program","code":"EDUCD003"},
  {"name":"Engineering","level":"Coursework","duration":"2 year program","code":"ENGIC001"},
  {"name":"Engineering","level":"Coursework","duration":"3 year program","code":"ENGIC002"},
  {"name":"Engineering","level":"Bachelor","duration":"2 year program","code":"ENGIB001"},
  {"name":"Engineering","level":"Bachelor","duration":"3 year program","code":"ENGIB002"},
  {"name":"Engineering","level":"Bachelor","duration":"4 year program","code":"ENGIB003"},
  {"name":"Engineering","level":"Master","duration":"2 year program","code":"ENGIM001"},
  {"name":"Legal","level":"Coursework","duration":"2 year program","code":"LEGAC001"},
  {"name":"Legal","level":"Coursework","duration":"3 year program","code":"LEGAC002"},
  {"name":"Liberal Arts and Humanities","level":"Coursework","duration":"2 year program","code":"LIBEC001"},
  {"name":"Liberal Arts and Humanities","level":"Coursework","duration":"3 year program","code":"LIBEC002"},
  {"name":"Liberal Arts and Humanities","level":"Coursework","duration":"4 year program","code":"LIBEC003"},
  {"name":"Mechanic and Repair Technologies","level":"Coursework","duration":"2 year program","code":"MECHC001"},
  {"name":"Mechanic and Repair Technologies","level":"Coursework","duration":"3 year program","code":"MECHC002"},
  {"name":"Mechanic and Repair Technologies","level":"Coursework","duration":"4 year program","code":"MECHC003"},
  {"name":"Mechanic and Repair Technologies","level":"Bachelor","duration":"2 year program","code":"MECHB001"},
  {"name":"Mechanic and Repair Technologies","level":"Bachelor","duration":"3 year program","code":"MECHB002"},
  {"name":"Mechanic and Repair Technologies","level":"Master","duration":"2 year program","code":"MECHM001"},
  {"name":"Medical and Health Professions","level":"Coursework","duration":"2 year program","code":"MEDIC001"},
  {"name":"Medical and Health Professions","level":"Bachelor","duration":"2 year program","code":"MEDIB001"},
  {"name":"Medical and Health Professions","level":"Bachelor","duration":"3 year program","code":"MEDIB002"},
  {"name":"Medical and Health Professions","level":"Bachelor","duration":"4 year program","code":"MEDIB003"},
  {"name":"Physical Sciences","level":"Coursework","duration":"2 year program","code":"PHYSC001"},
  {"name":"Physical Sciences","level":"Coursework","duration":"3 year program","code":"PHYSC002"},
  {"name":"Physical Sciences","level":"Bachelor","duration":"2 year program","code":"PHYSB001"},
  {"name":"Physical Sciences","level":"Bachelor","duration":"3 year program","code":"PHYSB002"},
  {"name":"Psychology","level":"Coursework","duration":"2 year program","code":"PSYCC001"},
  {"name":"Psychology","level":"Coursework","duration":"3 year program","code":"PSYCC002"},
  {"name":"Psychology","level":"Coursework","duration":"4 year program","code":"PSYCC003"},
  {"name":"Psychology","level":"Bachelor","duration":"2 year program","code":"PSYCB001"},
  {"name":"Psychology","level":"Bachelor","duration":"3 year program","code":"PSYCB002"},
  {"name":"Psychology","level":"Bachelor","duration":"4 year program","code":"PSYCB003"},
  {"name":"Visual and Performing Arts","level":"Coursework","duration":"2 year program","code":"VISUC001"},
  {"name":"Visual and Performing Arts","level":"Bachelor","duration":"2 year program","code":"VISUB001"},
  {"name":"Visual and Performing Arts","level":"Bachelor","duration":"3 year program","code":"VISUB002"},
  {"name":"Visual and Performing Arts","level":"Bachelor","duration":"4 year program","code":"VISUB003"},
  {"name":"Visual and Performing Arts","level":"Bachelor","duration":"5 year program","code":"VISUB004"}
]

res.send(arr)

    // request('https://registree-coding-challenge.glitch.me/cornell' , function(error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         var data1 = JSON.parse(body);
    //
    //         request('https://registree-coding-challenge.glitch.me/stanford' , function(error, response, body) {
    //             if (!error && response.statusCode == 200) {
    //                 var data2 = JSON.parse(body);
    //                 console.log('data1', data1, 'data2', data2);
    //
    //                 var arr = data1.concat(data2)
    //
    //                 console.log(arr);
    //
    //                 res.send(arr)
    //
    //             }
    //         });
    //     }
    // });



})




app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
