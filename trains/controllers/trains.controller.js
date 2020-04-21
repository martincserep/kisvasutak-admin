const database = database
exports.gettrains = (request, response) => {
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
        console.log("controller")
        response.send(resp)        
        
    })
}