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
                let data = {
                    userId : request.cookies.userId,
                    username : request.cookies.username
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
                    response.cookie("username", details.username);
                    let redirectUrl = '/sleep/display?date1=&date2=&userId=' + userId;
                    response.redirect(redirectUrl);
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
                data = {error: "Theres an error somewhere"};
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
                        let redirectUrl = '/sleep/display?date1=&date2=&userId=' + userResult.id;
                        response.redirect(redirectUrl);
                    }
                }
            }
        });
    };



    let slpPost = (request, response) => {
        let data = request.body
        if (data.sleepstart > data.sleepend) {
            data1 = {
                error: "Sleep Start needs to be Before Sleep End",
                username: request.cookies.username
            }
            response.render('rest/form/slp', data1)
        } else {
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
                    let link = "/sleep/display?date1=&date2=&userId=" + data.userId
                    response.redirect(link);
                };
            });
        }
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
        let search;
        let data;
        let queryParam = request.query;
        switch (true) {
            case ((queryParam.date1 != "") && (queryParam.date2 != "")):
                if (queryParam.date1 > queryParam.date2) {
                let data = {
                    error1: "Date 1 must be before Date 2",
                    username: request.cookies.username
                }
                response.render('rest/dis', data)
            } else {
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
            }
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
                    } else if (sleepData.length > 0) {
                        data = {
                            sleepData,
                            username: request.cookies.username
                            };
                        response.render('rest/slp', data)
                    } else {
                        response.redirect('/sleep/new')
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
            if (queryParam.date1 > queryParam.date2) {
                let data = {
                    error2: "Date 1 must be before Date 2",
                    username: request.cookies.username
                }
                response.render('rest/dis', data)
            } else {
                search = "WHERE userid='" + queryParam.userId + "' AND start BETWEEN '" + queryParam.date1 + "' AND '" + queryParam.date2 +"' ";
                db.main.selectAct(search, (error, actData) => {
                    if (error) {
                        console.log(error);
                        data = {
                            error: "something is wrong at actDis"
                        };
                        response.render('error', data);
                    } else {
                        data = {
                            actData,
                            username: request.cookies.username
                        };
                        response.render('rest/act', data)
                    }
                })
            }
            break;
            case ((queryParam.date1 != "") && (queryParam.date2 == "")):
                search = "WHERE userid='" + queryParam.userId + "' AND start>'" + queryParam.date1 + "' ";
                db.main.selectAct(search, (error, actData) => {
                    if (error) {
                        console.log(error);
                        data = {
                            error: "something is wrong at actDis"
                        };
                        response.render('error', data);
                    } else {
                        data = {
                            actData,
                            username: request.cookies.username
                        };
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
                            error: "something is wrong at actDis"
                        };
                        response.render('error', data);
                    } else {
                        data = {
                            actData,
                            username: request.cookies.username
                        };
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
                            error: "something is wrong at actDis"
                        };
                        response.render('error', data);
                    } else {
                        data = {
                            actData,
                            username: request.cookies.username
                        };
                        response.render('rest/act', data)
                    }
                })
        }
    };


    let allDis = (request, response) => {
        let search = {};
        let data;
        let queryParam = request.query;
        switch (true) {
            case ((queryParam.date1 != "") && (queryParam.date2 != "")):
                search.act = "WHERE userid='" + queryParam.userId + "' AND start BETWEEN '" + queryParam.date1 + "' AND '" + queryParam.date2 +"' ";
                search.slp = "WHERE userid='" + queryParam.userId + "' AND sleepstart BETWEEN '" + queryParam.date1 + "' AND '" + queryParam.date2 +"' ";
                db.main.selectBoth(search, (error, allData) => {
                    if (error) {
                        console.log(error);
                        data = {
                            error: "something is wrong at allDis"
                        };
                        response.render('error', data);
                    } else {
                        data = {
                            allData,
                            username: request.cookies.username
                        };
                        response.render('rest/act', data)
                    }
                })
            break;
            case ((queryParam.date1 != "") && (queryParam.date2 == "")):
                search.act = "WHERE userid='" + queryParam.userId + "' AND start>'" + queryParam.date1 + "' ";
                search.slp = "WHERE userid='" + queryParam.userId + "' AND sleepstart>'" + queryParam.date1 + "' ";
                db.main.selectAct(search, (error, allData) => {
                    if (error) {
                        console.log(error);
                        data = {
                            error: "something is wrong at allDis"
                        };
                        response.render('error', data);
                    } else {
                        data = {
                            allData,
                            username: request.cookies.username
                        };
                        response.render('rest/act', data)
                    }
                })
            break;
            case ((queryParam.date1 == "") && (queryParam.date2) != ""):
                search.act = "WHERE userid='" + queryParam.userId + "' AND start<'" + queryParam.date2 + "' ";
                search.slp = "WHERE userid='" + queryParam.userId + "' AND sleepstart<'" + queryParam.date2 + "' ";
                console.log(search)
                db.main.selectAct(search, (error, allData) => {
                    if (error) {
                        console.log(error);
                        data = {
                            error: "something is wrong at allDis"
                        };
                        response.render('error', data);
                    } else {
                        data = {
                            allData,
                            username: request.cookies.username
                        };
                        response.render('rest/act', data)
                    }
                })
            break;
            default:
                search.act = "WHERE userid='" + queryParam.userId + "' ";
                search.slp = "WHERE userid='" + queryParam.userId + "' ";
                db.main.selectAct(search, (error, allData) => {
                    if (error) {
                        console.log(error);
                        data = {
                            error: "something is wrong at allDis"
                        };
                        response.render('error', data);
                    } else {
                        data = {
                            allData,
                            username: request.cookies.username
                        };
                        response.render('rest/act', data)
                    }
                })
        }
    };


    let users = (request, response) => {
        let data;
        if (sha256(request.cookies.userId + SALT) === request.cookies.logSess) {
            data = {
                username: request.cookies.username
            }
            response.render('rest/users', data)
        } else {
            response.render('rest/users')
        }
    }






    let userLogout = (request, response) => {
        response.clearCookie('logSess');
        response.clearCookie('userId');
        response.clearCookie('username')
        response.redirect('/');
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
        users,
        userLogout,
        test
    };

}