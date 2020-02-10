const http = require('http');

// const hostname = '127.0.0.1';
// const port = 4000;


var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')

var admin = require('firebase-admin')

var serviceAccount = require('./secret/kisvasutak.json')

var firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://kisvasutak-admin-8f710.firebaseio.com/'
})

var database = firebaseAdmin.database()

// Create instance of express app
var app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/trains/:userId', function(request, response){
    response.header("Access-Control-Allow-Origin", "*" ); // update to match the domain you will make the request from
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var trainsRef = database.ref("/trains")
    var userId = request.params.userId
    
    trainsRef.once('value', function(snapshot){
        var rawData = snapshot.val()
        var data = []
        var resp = []
        var test = []
        Object.keys(rawData).map(item=> {
            data.push({'key': item, 'value': rawData[item]});
        })
        data.forEach(current => {
            if(Array.isArray(current.value.users)) {
                if(current.value.users.find(u => u === userId)) {
                    resp.push(current)
                }
            }
        })
        
        response.send(resp)        
        
    })
})

app.get('/sights/:trainId', function(request, response){
    response.header("Access-Control-Allow-Origin", "*" ); // update to match the domain you will make the request from
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var sightsRef = database.ref("/sights")
    var trainId = '-'+request.params.trainId
    
    sightsRef.once('value', function(snapshot){
        var rawData = snapshot.val()
        var data = []
        var resp = []
        Object.keys(rawData).map(item=> {
            if(item==trainId){

                data.push({'key': item, 'value': rawData[item]});
            }
        })
        data.forEach(current => {
            Object.keys(current).map(item=> {
                resp.push(current[item])
                     })
                });
        
        response.send(resp)        
        
    })
})

app.get('/accomodations/:trainId', function(request, response){
    response.header("Access-Control-Allow-Origin", "*" ); // update to match the domain you will make the request from
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var accomodationsRef = database.ref("/accomodations")
    var trainId = '-'+request.params.trainId
    
    accomodationsRef.once('value', function(snapshot){
        var rawData = snapshot.val()
        var data = []
        var resp = []
        Object.keys(rawData).map(item=> {
            if(item==trainId){

                data.push({'key': item, 'value': rawData[item]});
            }
        })
        data.forEach(current => {
            Object.keys(current).map(item=> {
                resp.push(current[item])
                     })
                });
        
        response.send(resp)        
        
    })
})

app.get('/csa/:name', function (req, res) {
    console.log('Accessing the secret section ...')
  res.send('csa ' + req.params.name)
})

app.listen(process.env.PORT || 8080, () => console.log('All is ok.'))