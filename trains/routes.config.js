exports.routesConfig = function(app) {

    app.get('/trains/:userId', [
        UsersController.insert
    ]);

};