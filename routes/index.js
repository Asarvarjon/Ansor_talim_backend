const NotFoundMiddleware = require('../middlewares/NotFoundMiddleware')

module.exports = async function(app){
    try { 
        app.use("/", require('./home/HomeRoute'));
        app.use("/apexschool", require("./users/UserRoute"));
        app.use("/admin_panel", require("./panel/AdminPanelRoute"))
    } finally{ 
        app.use(NotFoundMiddleware)
    }
    
}