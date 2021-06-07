const express = require('express');
const mongoose = require('mongoose');
const config = require('./config.json');


mongoose.connect(config.databaseURL);
//

const app = express();

//-----------------

const schema = new mongoose.Schema({
    nev : String,
    szavazatok: Number
});

const model = mongoose.model('Opciok', schema ,'Opciok');


app.use(express.urlencoded());
app.use(express.static('public'));





//----------------------

app.post('/szavazas',function(request, response){
    console.log(request.body);

    model.findOne({ nev : request.body.teszta}, function(err,doc){
        if(doc){
            //console.log(request.body.teszta + 'már létezik');
            //változtatjuk
            doc.szavazatok++;
            doc.save();
        } else {
            new model({
                nev: request.body.teszta,
                szavazatok: 1
            }).save();
        }
    });
    response.redirect('/eredmeny.html');
});

app.get('/eredmenyek', function(request,response){
    model.find({}, function(error,dokumentumok){
        response.send(JSON.stringify(dokumentumok));
    });
});


//--------------------
app.listen(9000);