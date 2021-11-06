

module.exports = async function(app){
    try {
        app.use("/users", require("./users/UserRoute"));
        app.use("/", require("./home/HomeRoute"))
    } finally{

    }
    
}