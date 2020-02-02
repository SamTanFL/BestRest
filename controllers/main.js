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
        if (sha256(request.cookies.userId + SALT) === request.cookies.logSess) {
            let searchPara = "WHERE id=" + request.cookies.userId;
            db.main.checkUser(searchPara, (error, userResult) => {
                if (error) {
                    let data = {error};
                    response.render('error', data)
                }
                let data = {
                    username: userResult.username
                }
                response.render('rest/home', data);
            })
        } else {
            response.render('rest/home');
        }
    };


    let userForm = (request, response) => {
        let data = {};
        if (request.cookies.logSess && request.cookies.userId) {
            data = {
                error : "User Already Logged In"
            };
            response.render('error', data);
        } else {
            response.render('rest/form/user')
        };
    };


    let slpForm = (request, response) => {
        if (sha256(request.cookies.userId + SALT) === request.cookies.logSess){
            let searchPara = "WHERE id=" + request.cookies.userId;
            db.main.checkUser(searchPara, (error, userResult) => {
                let data = {
                    userId : request.cookies.userId,
                    username : userResult.username
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
            let searchPara = "WHERE id=" + request.cookies.userId;
            db.main.checkUser(searchPara, (error, userResult) => {
                let data = {
                    userId : request.cookies.userId,
                    username : userResult.username
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


    let userPost = (request, response) => {
        let details = request.body;
        let search = "WHERE username=" + details.username;
        db.main.checkUser(search, (error, userResult) => {
            if (userResult !== null) {
                let data = {
                    nameError : "Username Already In-Use"
                }
                response.render("rest/form/user", data)
            } else {
                let passhash = sha256(details.password + SALT);
                let data = {
                    username : details.username,
                    passhash
                }
                db.main.insertUser(data, (error, userId) => {
                    response.cookie("userId", userId);
                    response.cookie("logSess", sha256(userId + SALT));
                    response.redirect('/');
                })
            }
        });
    };


    let userLogin = (request, response) => {
        let data = {};
        let details = {
            username : request.body.username,
            passhash : (sha256(request.body.password + SALT))
        };
        let search = "WHERE username=" + details.username
        db.main.checkUser(search, (error, userResult) => {
            if (error) {
                data.error = error;
                response.render('error', data);
            } else {
                if (userResult === null) {
                    data.error = "No such User Found";
                    response.render('rest/home', data)
                } else {
                    if (details.passhash !== userResult.passhash) {
                        data.error = "Invalid Password";
                        response.render('rest/home', data)
                    } else {
                        response.cookie("userId", userResult.id);
                        response.cookie("logSess", (sha256(userResult.id + SALT)));
                        response.redirect('/');
                    }
                }
            }
        });
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


    let userLogout = (request, response) => {
        response.clearCookie('logSess');
        response.clearCookie('userId');
        response.redirect('back');
    }











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
        userForm,
        slpForm,
        actForm,
        userPost,
        userLogin,
        slpPost,
        actPost,
        slpDisAll,
        userLogout,
        test
    };

}