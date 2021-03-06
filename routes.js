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

    //Route for the form editing my sleep data
    app.get('/sleep/edit', mainControllerCallbacks.slpPutForm)

    //Route for the form editing my activity data
    app.get('/activity/edit', mainControllerCallbacks.actPutForm)

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

    //display summary for the user
    //app.get('/users/summary', mainControllerCallbacks.usersSum)

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


    //Route for editing my sleep data
    app.put('/sleep', mainControllerCallbacks.slpPut);

    //Route for editing my act data
    app.put('/activity', mainControllerCallbacks.actPut);



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


     //delete route for deleting slp
     app.delete('/sleep', mainControllerCallbacks.slpDel)

     //delete for activities
     app.delete('/activity', mainControllerCallbacks.actDel)

     //delete route to log user out
     app.delete('/users/logout', mainControllerCallbacks.userLogout);

};