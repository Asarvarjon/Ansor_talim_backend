const {Sequelize} = require("sequelize");
const UserModel = require("../../models/UserModel");
const init = require("./init");


const sequelize = new Sequelize(process.env.POSTGRES_URL, {
    logging: false
});


module.exports = async function(){
    try {
        await sequelize.authenticate();

        console.log("Connection established sucesfully");

        let db = {};

        db.users = await UserModel(sequelize, Sequelize);






        await init(db);
        await sequelize.sync({force: false})

        return db;
    } catch (error) {
        console.log("Postgres ERROR", error);
    }
}