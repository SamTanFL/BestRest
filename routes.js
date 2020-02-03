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

    //to page which asks for parameters to display
    app.get('/display', mainControllerCallbacks.dis);

    //display page for sleep
    app.get('/sleep/display', mainControllerCallbacks.slpDis);

    //display page for activities
    app.get('/activity/display', mainControllerCallbacks.actDis);

    //display page for both
    app.get('/all/display', mainControllerCallbacks.allDis);

    //form for tracking activities
    app.get('/activity/new', mainControllerCallbacks.actForm);

    //display user stuff
    app.get('/users', mainControllerCallbacks.users)

    //test route
    app.get('*', mainControllerCallbacks.index);


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

    //post route for inserting sleep
    app.post('/sleep', mainControllerCallbacks.slpPost);

    //post route for inserting activity
    app.post('/activity', mainControllerCallbacks.actPost);

     //post route for logging in a user
     app.post('/', mainControllerCallbacks.userLogin);



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