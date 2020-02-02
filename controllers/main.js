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
        response.cookie('logSess', sha256(1 + SALT));
        if (sha256(request.cookies.userId + SALT) === request.cookies.logSess) {
            db.main.checkUser(request.cookies.userId, (error, username) => {
                if (error) {
                    let data = {error};
                    response.render('error', data)
                }
                let data = {username}
                response.render('rest/home', data);
            })
        } else {
            response.render('rest/home');
        }
    };


    let slpForm = (request, response) => {
        if (sha256(request.cookies.userId + SALT) === request.cookies.logSess){
            db.main.checkUser(request.cookies.userId, (error, username) => {
                let data = {
                    userId : request.cookies.userId,
                    username : username
                };
                response.render('rest/form/slp', data);
            });
        } else {
            let data = {
                error : "Please Login"
            };
            response.render('error', data)
        };
    };


    let actForm = (request, response) => {
        if (sha256(request.cookies.userId + SALT) === request.cookies.logSess){
            db.main.checkUser(request.cookies.userId, (error, username) => {
                let data = {
                    userId : request.cookies.userId,
                    username : username
                };
                response.render('rest/form/act', data);
            });
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
        db.main.insertSleep(details, (error, sleepId) => {
            if (error) {
                response.render('error', error);
            } else {
                let link = "/sleep/" + sleepId
                response.redirect(link);
            };
        });
    };


    let actPost = (request, response) => {
        let data = request.body
        let benefit;
        if (data.benefit) {
            benefit = true
        } else {
            benefit = false
        };
        let details = {
            userId : data.userId,
            name : data.name,
            start : data.start,
            benefit
        };
        db.main.insertAct(details, (error, actId) => {
            if (error) {
                response.render('error', error);
            } else {
                let link = "/activity/" + actId
                response.redirect(link);
            };
        });
    };


    let slpDisAll = (request, response) => {
        //will set the page up later
        response.redirect('/');
    };











    //testing purpose. delete when done
    let test = (request, response) => {
        db.main.test((error, testResult) => {
/*            let start = new Date(testResult.sleepstart);
            let end = new Date(testResult.sleepend);
            let duration = end.getTime() - start.getTime();
            response.send();*/
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
        actPost,
        slpDisAll,
        test
    };

}