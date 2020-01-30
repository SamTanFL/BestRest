const sha256 = require('js-sha256');
const SALT = "Better Get Some Better Rest For The Best Rest.";

module.exports = (db) => {

    /**
     * ===========================================
     * Controller logic
     * ===========================================
     */

    let index = (request, response) => {
        response.render('rest/home');
    };




    /**
     * ===========================================
     * Export controller functions as a module
     * ===========================================
     */
    return {
        index
    };

}