/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {


    //for checking logins
    let login = (username, callback) => {
        let query = "";
        dbPoolInstance.query(query, (err, queryResult) => {
            if( err ){
                // invoke callback function with results after query has executed
                callback(err, null);
            }else{
                // invoke callback function with results after query has executed
                if( queryResult.rows.length > 0 ){
                    /*console.log("Result.rows :", queryResult.rows)*/
                    callback(null, queryResult.rows[0]);
                }else{
                    callback(null, null);
                }
            }
        });
    };



    return {
        login
    };
};