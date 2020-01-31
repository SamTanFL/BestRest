const sha256 = require('js-sha256');
const SALT = "Better Get Some Better Rest For The Best Rest.";
var moment = require('moment');
moment().format();

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
            let data = {
                userId : request.cookies.userId
            };
            response.render('rest/form/slp', data);
        } else {
            let data = {
                error : "Please Login"
            };
            response.render('error', data)
        };
    };


    let actForm = (request, response) => {
        if (request.cookies.userId && request.cookies.logSess){
            let data = {
                userId : request.cookies.userId
            };
            response.render('rest/form/act', data);
        } else {
            let data = {
                error : "Please Login"
            };
            response.render('error', data)
        };
    };


    let slpPost = (request, response) => {
        let data = request.body
        let duration = moment(data.sleepend) - moment(data.sleepstart);
        let details = {
            userId : data.userId,
            sleepstart : data.sleepstart,
            sleepend : data.sleepend,
            duration,
            notes : data.notes
        };
        console.log(details);
        db.main.insertSleep(details, (error, sleepId) => {
            if (error) {
                response.render('error', error);
            } else {
                let link = "/sleep/" + sleepId
                response.redirect(link);
            };
        });
    };

















    //testing purpose. delete when done
    let test = (request, response) => {
        db.main.test((error, testResult) => {
            let start = new Date(testResult.sleepstart);
            let end = new Date(testResult.sleepend);
            let duration = end.getTime() - start.getTime();
            console.log(duration);
            response.send();
        });
    };



    /**
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */
    return {
        index,
        slpForm,
        actForm,
        slpPost,
        test
    };

}