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


    let slpPutForm = (request, response) => {
        let data;
        if (sha256(request.cookies.userId + SALT) === request.cookies.logSess) {
            let searchPara = "WHERE id='" + request.query.slpid + "' ";
            db.main.selectSleep(searchPara, (error, slpDetails) => {
                if (error) {
                    console.log("ERROR HERE : ", error)
                } else {
                    if (slpDetails === null) {
                        data = {
                        error: "Unable to find entry in Sleep for Form",
                        username: request.cookies.username
                        }
                        response.render('error', data)
                    } else {
                        data = {
                            slpDetails: slpDetails[0],
                            userId : request.cookies.userId,
                            username : request.cookies.username
                        }
                        response.render('rest/form/slpedit', data)
                    }
                }
            })
        } else {
            data = {
                error: "Please Login",
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


    let actPutForm = (request, response) => {
        let data;
        if (sha256(request.cookies.userId + SALT) === request.cookies.logSess) {
            let actId = request.query.actid;
            let searchPara = "WHERE id='" + actId + "' ";
            db.main.selectAct(searchPara, (error, actData) => {
                data = {
                    actData: actData[0],
                    username: request.cookies.username,
                    userId: request.cookies.userId
                };
                response.render('rest/form/actedit', data)
            });
        } else {
            data = {
                error : "Please Login"
            };
            response.render('error', data)
        }
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
            benefit,
            notes: data.notes
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
                    } else if (sleepData != null) {
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
                    } else if (sleepData != null) {
                        data = {
                            sleepData,
                            username: request.cookies.username
                            };
                        response.render('rest/slp', data)
                    } else {
                        response.redirect('/sleep/new')
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
                    } else if (sleepData != null) {
                        data = {
                            sleepData,
                            username: request.cookies.username
                            };
                        response.render('rest/slp', data)
                    } else {
                        response.redirect('/sleep/new')
                    }
                })
            break;
            default:
                search = "WHERE userid='" + queryParam.userId + "' ";
                db.main.selectSleep(search, (error, sleepData) => {
                    if (error) {
                        console.log("Hello Error :")
                        console.log(error);
                        data = {
                            error: "something is wrong at slpDis"
                        };
                        response.render('error', data);
                    } else if (sleepData != null) {
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
                    } else if (actData != null) {
                        data = {
                            actData,
                            username: request.cookies.username
                        };
                        response.render('rest/act', data)
                    } else {
                        response.redirect('/activity/new')
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
                    } else if (actData != null) {
                        data = {
                            actData,
                            username: request.cookies.username
                        };
                        response.render('rest/act', data)
                    } else {
                        response.redirect('/activity/new')
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
                    } else if (actData != null) {
                        data = {
                            actData,
                            username: request.cookies.username
                        };
                        response.render('rest/act', data)
                    } else {
                        response.redirect('/activity/new')
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


    let usersSum = (request, response) => {
        switch (request.query.duration) {
            case "week":
                response.redirect('/')
            break;
            case "month":
                response.redirect('/')
            break;
            case "year":
                response.redirect('/')
            break;
            default:
                response.redirect('/')
        }
    }






    let userLogout = (request, response) => {
        response.clearCookie('logSess');
        response.clearCookie('userId');
        response.clearCookie('username')
        response.redirect('/');
    }




    let slpDel = (request, response) => {
        let id = request.body.slpid;
        db.main.delSleep(id, (error, slpid) => {
            if (slpid === null) {
                let data = {
                    error: "Unable to find entry"
                }
                response.render('error', data)
            } else {
                let url = "/sleep/display?date1=&date2=&userId=" + request.cookies.userId
                response.redirect(url)
            }
        })
    }


    let slpPut = (request, response) => {
        let details = {
            userid: request.body.userId,
            start: request.body.sleepstart,
            end: request.body.sleepend,
            duration: moment(request.body.sleepend) - moment(request.body.sleepstart),
            notes: request.body.notes,
            id: request.body.slpid
        }
        db.main.editSleep(details, (error, userid) => {
            if (error) {
                console.log("ERROR IN SLPPUT : ", error);
                let data = {
                    error: "THERES AN ERROR MATE IN SLP PUT"
                }
                response.render('error', data)
            } else {
                if (userid === null) {
                let data = {
                    error: "Unable to find entry"
                }
                response.render('error', data)
                } else {
                    let url = "/sleep/display?date1=&date2=&userId=" + request.cookies.userId
                    response.redirect(url)
                }
            }
        });
    };


    let actDel = (request, response) => {
        let id = request.body.actid;
        db.main.delAct(id, (error, userid) => {
            if (userid === null) {
                let data = {
                    error: "Unable to find entry"
                }
                response.render('error', data)
            } else {
                let url = "/activity/display?date1=&date2=&userId=" + request.cookies.userId
                response.redirect(url)
            }
        })
    }


    let actPut = (request, response) => {
        let benefit = false;
        if (request.body.benefit == "true") {
            let benefit = true;
        }
        let details = {
            userid: request.body.userId,
            name: request.body.name,
            start: request.body.start,
            benefit,
            notes: request.body.notes,
            id: request.body.actid
        }
        db.main.editAct(details, (error, userid) => {
            if (error) {
                console.log("ERROR IN ACTPUT : ", error);
                let data = {
                    error: "THERES AN ERROR MATE IN ACT PUT"
                }
                response.render('error', data)
            } else {
                if (userid === null) {
                    let data = {
                        error: "Unable to find entry"
                    }
                    response.render('error', data)
                } else {
                    let url = "/activity/display?date1=&date2=&userId=" + request.cookies.userId
                    response.redirect(url)
                }
            }
        });
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
        userForm,
        slpForm,
        slpPutForm,
        actForm,
        actPutForm,
        userPost,
        userLogin,
        slpPost,
        actPost,
        dis,
        slpDis,
        actDis,
        allDis,
        users,
        usersSum,
        userLogout,
        slpDel,
        slpPut,
        actDel,
        actPut,
        test
    };

}