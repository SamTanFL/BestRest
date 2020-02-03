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
        let data
        if (request.cookies.userId && request.cookies.logSess) {
            if (sha256(request.cookies.userId + SALT) === request.cookies.logSess) {
                data = {
                    username: request.cookies.username
                };
                response.render('rest/home', data)
            } else {
                data = {
                    error: "Something is wrong here"
                }
                response.render('error', data)
            } // end of else if something is wrong
        } else {
            response.render('rest/home')
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
                    passhash,
                    age: parseInt(details.age)
                }
                db.main.insertUser(data, (error, userId) => {
                    response.cookie("userId", userId);
                    response.cookie("logSess", sha256(userId + SALT));
                    response.cookie("username", details.username)
                    response.redirect('/');
                })
            }
        });
    };


    let userLogin = (request, response) => {
        let data;
        let details = {
            username : request.body.username.toString(),
            passhash : sha256(request.body.password + SALT)
        };
        let searchPara = "WHERE username='" + details.username + "'";
        db.main.checkUser(searchPara, (error, userResult) => {
            if (error) {
                data.error = "Theres an error somewhere";
                response.render('error', data);
            } else {
                if (userResult === null) {
                    data = {error: "Invalid Username"}
                    response.render('rest/home', data)
                } else {
                    if (details.passhash !== userResult.passhash) {
                        data = {error : "Invalid Password"}
                        response.render('rest/home', data)
                    } else {
                        response.cookie("username", userResult.username);
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


    let dis = (request, response) => {
        let data = {};
        if (request.cookies.logSess === sha256(request.cookies.userId + SALT)) {
            data.userId = request.cookies.userId;
            data.username = request.cookies.username;
            response.render('rest/dis', data)
        } else {
            data.error = "Please Login Or Register An Account"
            response.render('error', data)
        }
    };


    let slpDis = (request, response) => {
        //SELECT * FROM sleep WHERE userid='3' AND sleepstart BETWEEN '2020-01-01' AND '2020-12-31';
        let search;
        let data;
        let queryParam = request.query;
        switch (true) {
            case ((queryParam.date1 != "") && (queryParam.date2 != "")):
                search = "WHERE userid='" + queryParam.userId + "' AND sleepstart BETWEEN '" + queryParam.date1 + "' AND '" + queryParam.date2 +"' ";
                db.main.selectSleep(search, (error, sleepData) => {
                    if (error) {
                        console.log(error);
                        data = {
                            error: "something is wrong at slpDis"
                        };
                        response.render('error', data);
                    } else {
                        data = {
                            sleepData,
                            username: request.cookies.username
                            };
                        response.render('rest/slp', data)
                    }
                })
            break;
            case ((queryParam.date1 != "") && (queryParam.date2 == "")):
                search = "WHERE userid='" + queryParam.userId + "' AND sleepstart>'" + queryParam.date1 + "' ";
                db.main.selectSleep(search, (error, sleepData) => {
                    if (error) {
                        console.log(error);
                        data = {
                            error: "something is wrong at slpDis"
                        };
                        response.render('error', data);
                    } else {
                        data = {
                            sleepData,
                            username: request.cookies.username
                            };
                        response.render('rest/slp', data)
                    }
                })
            break;
            case ((queryParam.date1 == "") && (queryParam.date2) != ""):
                search = "WHERE userid='" + queryParam.userId + "' AND sleepstart<'" + queryParam.date2 + "' ";
                db.main.selectSleep(search, (error, sleepData) => {
                    if (error) {
                        console.log(error);
                        data = {
                            error: "something is wrong at slpDis"
                        };
                        response.render('error', data);
                    } else {
                        data = {
                            sleepData,
                            username: request.cookies.username
                            };
                        response.render('rest/slp', data)
                    }
                })
            break;
            default:
                search = "WHERE userid='" + queryParam.userId + "' ";
                db.main.selectSleep(search, (error, sleepData) => {
                    if (error) {
                        console.log(error);
                        data = {
                            error: "something is wrong at slpDis"
                        };
                        response.render('error', data);
                    } else {
                        data = {
                            sleepData,
                            username: request.cookies.username
                            };
                        response.render('rest/slp', data)
                    }
                })
        }
    };


    let actDis = (request, response) => {
        let search;
        let data;
        let queryParam = request.query;
        switch (true) {
            case ((queryParam.date1 != "") && (queryParam.date2 != "")):
                search = "WHERE userid='" + queryParam.userId + "' AND start BETWEEN '" + queryParam.date1 + "' AND '" + queryParam.date2 +"' ";
                db.main.selectAct(search, (error, actData) => {
                    if (error) {
                        console.log(error);
                        data = {
                            error: "something is wrong at slpDis"
                        };
                        response.render('error', data);
                    } else {
                        data = { actData };
                        response.render('rest/act', data)
                    }
                })
            break;
            case ((queryParam.date1 != "") && (queryParam.date2 == "")):
                search = "WHERE userid='" + queryParam.userId + "' AND start>'" + queryParam.date1 + "' ";
                db.main.selectAct(search, (error, actData) => {
                    if (error) {
                        console.log(error);
                        data = {
                            error: "something is wrong at slpDis"
                        };
                        response.render('error', data);
                    } else {
                        data = { actData };
                        response.render('rest/act', data)
                    }
                })
            break;
            case ((queryParam.date1 == "") && (queryParam.date2) != ""):
                search = "WHERE userid='" + queryParam.userId + "' AND start<'" + queryParam.date2 + "' ";
                db.main.selectAct(search, (error, actData) => {
                    if (error) {
                        console.log(error);
                        data = {
                            error: "something is wrong at slpDis"
                        };
                        response.render('error', data);
                    } else {
                        data = { actData };
                        response.render('rest/act', data)
                    }
                })
            break;
            default:
                search = "WHERE userid='" + queryParam.userId + "' ";
                db.main.selectAct(search, (error, actData) => {
                    if (error) {
                        console.log(error);
                        data = {
                            error: "something is wrong at slpDis"
                        };
                        response.render('error', data);
                    } else {
                        data = { actData };
                        response.render('rest/act', data)
                    }
                })
        }
    };


    let allDis = (request, response) => {
        let queryParam = request.query;
        switch (true) {
            case (queryParam.date1 && queryParam.date2):

            break;
            case (queryParam.date1 && !queryParam.date2):

            break;
            case (!queryParam.date1 && queryParam.date2):

            break;
            default:

        }
        //not done yet
        response.redirect('/');
    };


    let userLogout = (request, response) => {
        response.clearCookie('logSess');
        response.clearCookie('userId');
        response.clearCookie('username')
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
        dis,
        slpDis,
        actDis,
        allDis,
        userLogout,
        test
    };

}