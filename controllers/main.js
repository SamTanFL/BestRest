const sha256 = require('js-sha256');
const SALT = "Better Get Some Better Rest For The Best Rest.";

module.exports = (db) => {

    /**
     * ===========================================
     * Controller logic
     * ===========================================
     */

    let index = (request, response) => {
        //for testing purpose. delete later
        response.cookie('userId', 1);
        response.cookie('logSess', 1);
        response.render('rest/home');
    };


    let slpForm = (request, response) => {
        if (request.cookies.userId && request.cookies.logSess){
            response.render('rest/form/slp');
        } else {
            let data = {
                error : "Please Login"
            };
            response.render('error', data)
        }
    };


    let actForm = (request, response) => {
        if (request.cookies.userId && request.cookies.logSess){
            response.render('rest/form/act');
        } else {
            let data = {
                error : "Please Login"
            };
            response.render('error', data)
        }
    };



    /**
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */
    return {
        index,
        slpForm,
        actForm
    };

}