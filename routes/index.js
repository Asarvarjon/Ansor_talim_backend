const errorHandler = require("../helpers/errorHandler"); 

module.exports = async function(app){
    try { 
        app.use("/", require('./home/HomeRoute'))
        app.use("/oauth", require("./users/UserRoute"))
    } finally{
        app.use(errorHandler)
    }
    
}