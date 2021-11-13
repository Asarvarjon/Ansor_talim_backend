const {Sequelize} = require("sequelize");
const UserModel = require("../../models/UserModel");
const init = require("./init");
const SessionModel = require("../../models/SessionModel");
const relations = require("./relations");
const ApplicantModel = require("../../models/ApplicantModel");
const NewsModel = require("../../models/NewsModel");
const CourseModel = require("../../models/CourseModel");
const CommentsModel = require("../../models/CommentsModel");
const ScenesModel = require("../../models/ScenesModel");
const ResultsModel = require("../../models/ResultsModel"); 
const AddressModel = require("../../models/AddressModel");
const StudentsModel = require("../../models/StudentsModel");
const ContactModel = require("../../models/ContactModel");


const sequelize = new Sequelize(process.env.POSTGRES_URL, {
    logging: false
});


module.exports = async function(){
    try {
        await sequelize.authenticate();

        console.log("Connection established sucesfully");

        let db = {};

        db.users = await UserModel(sequelize, Sequelize);
        db.sessions = await SessionModel(sequelize, Sequelize);
        db.applicants = await ApplicantModel(sequelize, Sequelize)
        db.news = await NewsModel(sequelize, Sequelize);
        db.courses = await CourseModel(sequelize, Sequelize);
        db.comments = await CommentsModel(sequelize, Sequelize);
        db.scenes = await ScenesModel(sequelize, Sequelize);
        db.results = await ResultsModel(sequelize, Sequelize);
        db.address = await AddressModel(sequelize, Sequelize);
        db.students = await StudentsModel(sequelize, Sequelize);
        db.contacts = await ContactModel(sequelize, Sequelize);


 
        await init(db);
        await relations(db);
        await sequelize.sync({force: false})

        return db;
    } catch (error) {
        console.log("Postgres ERROR", error);
    }
}