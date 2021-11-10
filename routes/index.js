const NotFoundMiddleware = require('../middlewares/NotFoundMiddleware')

module.exports = async function(app){
    try { 
        app.use("/", require('./home/HomeRoute'))
        app.use("/admin", require("./users/UserRoute"))
        app.use("/profile", require("./profile/ProfileRoute"))
    } finally{ 
        app.use(NotFoundMiddleware)
    }
    
}