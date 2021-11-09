const errorHandler = require("../helpers/errorHandler"); 

module.exports = async function(app){
    try { 
        app.use("/", require('./home/HomeRoute'))
    } finally{
        app.use(errorHandler)
    }
    
}