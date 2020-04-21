const express = require('express');
const app = express();
const server = require("http").Server(app);
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
// const TrainsRouter = require('./trains/routes.config');
// const AccomodationsRouter = require('./accomodations/routes.config');
// const SightsRouter = require('./sights/routes.config');

const serviceAccount = require('./secret/kisvasutak.json');

const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://kisvasutak-admin-8f710.firebaseio.com/'
});

const database = firebaseAdmin.database();
// exports.database
const PORT = process.env.PORT || 8080;

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.send(200);
    } else {
        return next();
    }
});

app.use(bodyParser.json());

// TrainsRouter.routesConfig(app);
// AccomodationsRouter.routesConfig(app);
// SightsRouter.routesConfig(app);


// app.listen(process.env.PORT || 8080, () => console.log('All is ok.'))

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

app.patch('/trains/:trainId', function(request, response){
    const bodyParams = request.body
    const trainRef = firebaseAdmin.database().ref(`trains/${bodyParams.id}`)
    console.log(trainRef)
    trainRef.set(bodyParams.trainObject)
    response.send(200)
})

app.get('/gettrain/:trainId', function(request, response){
    response.header("Access-Control-Allow-Origin", "*" ); // update to match the domain you will make the request from
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var sightsRef = database.ref("/trains")
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

app.get('/getsight/:trainId/:id', function(request, response){
    response.header("Access-Control-Allow-Origin", "*" ); // update to match the domain you will make the request from
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var sightsRef = database.ref("/sights")
    var trainId = '-'+request.params.trainId
    var id = '-'+request.params.id
    
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
            Object.keys(current.value).map(item=> {
                if(item == id){
                resp.push(current.value[item])
                     }})
                });
        response.send(resp)        
        
    })
})

app.get('/getacc/:trainId/:id', function(request, response){
    response.header("Access-Control-Allow-Origin", "*" ); // update to match the domain you will make the request from
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var sightsRef = database.ref("/accomodations")
    var trainId = '-'+request.params.trainId
    var id = '-'+request.params.id
    
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
            Object.keys(current.value).map(item=> {
                if(item == id){
                resp.push(current.value[item])
                     }})
                });
        response.send(resp)        
        
    })
})

app.get('/allsights/:trainId', function(request, response){
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

app.get('/allaccomodations/:trainId', function(request, response){
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


app.patch('/sights/:trainId', function(request, response){
    const bodyParams = request.body
    const sightRef = firebaseAdmin.database().ref(`sights/${bodyParams.trainId}/${bodyParams.id}`)
    sightRef.set(bodyParams.sightObject)
    response.send(200)

})

app.patch('/accomodations/:trainId', function(request, response){
    const bodyParams = request.body
    const accRef = firebaseAdmin.database().ref(`accomodations/${bodyParams.trainId}/${bodyParams.id}`)
    accRef.set(bodyParams.accObject)
    response.send(200)
})


app.listen(process.env.PORT || 8080, () => console.log('All is ok.'))