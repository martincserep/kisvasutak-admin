const TrainController = require('./controllers/trains.controller')

exports.routesConfig = function(app) {
    app.get('/trains/:userId', [
        TrainController.gettrains
    ])
    
    // app.patch('/trains/:trainId', function(request, response){
    //     const bodyParams = request.body
    //     const trainRef = firebaseAdmin.database().ref(`trains/${bodyParams.id}`)
    //     console.log(trainRef)
    //     trainRef.set(bodyParams.trainObject)
    //     response.send(200)
    // })
    
    // app.get('/gettrain/:trainId', function(request, response){
    //     response.header("Access-Control-Allow-Origin", "*" ); // update to match the domain you will make the request from
    //     response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     var sightsRef = database.ref("/trains")
    //     var trainId = '-'+request.params.trainId
        
    //     sightsRef.once('value', function(snapshot){
    //         var rawData = snapshot.val()
    //         var data = []
    //         var resp = []
    //         Object.keys(rawData).map(item=> {
    //             if(item==trainId){
    
    //                 data.push({'key': item, 'value': rawData[item]});
    //             }
    //         })
    //         data.forEach(current => {
    //             Object.keys(current).map(item=> {
    //                 resp.push(current[item])
    //                      })
    //                 });
            
    //         response.send(resp)        
            
    //     })
    // })
}