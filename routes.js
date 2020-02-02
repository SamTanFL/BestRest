module.exports = (app, allModels) => {


    /*
     *  =========================================
     *  =========================================
     *  =========================================
     *  =========================================
     *    ALL ROUTES FOR MAIN CONTROLLER
     *  =========================================
     *  =========================================
     *  =========================================
     */

    // require the controller
    const mainControllerCallbacks = require('./controllers/main')(allModels);

    /*
     *  =========================================
     *  =========================================
     *  =========================================
     *  =========================================
     *              GET Routes
     *  =========================================
     *  =========================================
     *  =========================================
     */


    //home page
    app.get('/', mainControllerCallbacks.index);

    //form for registering a new user;
    app.get('/users/new', mainControllerCallbacks.userForm);

    //form for tracking sleep
    app.get('/sleep/new', mainControllerCallbacks.slpForm);

    //to display page for sleeping
    app.get('/sleep', mainControllerCallbacks.slpDisAll)

    //form for tracking activities
    app.get('/activity/new', mainControllerCallbacks.actForm);

    //test route
    app.get('*', mainControllerCallbacks.test);


    /*
     *  =========================================
     *  =========================================
     *  =========================================
     *  =========================================
     *              POST Routes
     *  =========================================
     *  =========================================
     *  =========================================
     */


     //post route for registering a new user
     app.post('/users/new', mainControllerCallbacks.userPost);

     //post route for logging in a user
     app.post('/users', mainControllerCallbacks.userLogin);

    //post route for inserting sleep
    app.post('/sleep', mainControllerCallbacks.slpPost);

    //post route for inserting activity
    app.post('/activity', mainControllerCallbacks.actPost);



    /*
     *  =========================================
     *  =========================================
     *  =========================================
     *  =========================================
     *              PUT Routes
     *  =========================================
     *  =========================================
     *  =========================================
     */




    /*
     *  =========================================
     *  =========================================
     *  =========================================
     *  =========================================
     *              DELETE Routes
     *  =========================================
     *  =========================================
     *  =========================================
     */


     //delete route to log user out
     app.delete('/users/logout', mainControllerCallbacks.userLogout);

};