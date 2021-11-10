require("dotenv").config();

const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const app = express();
const path = require("path"); 
const UserMiddleware = require("./middlewares/UserMiddleware");
const postgres = require("./modules/pg/postgres");
const routes = require("./routes");


const PORT = process.env.PORT || 3030;

async function server(mode){
    try {
        app.listen(PORT, () => {
            console.log(`Server is ready at ${PORT}`);
        })


        const db = await postgres();


        // database middleware
        app.use(async (req, res, next) => {
            req.db = await db;
            next()
        })

        /// middlewares 

        app.use(express.json())
        app.use(express.urlencoded({extended: true})) 
        app.use(express.static(path.join(__dirname, "public"))); 
        app.use(cookieParser()); 


        // settings 
        app.set("view engine", "ejs");

        app.use(UserMiddleware)


        if(mode === "dev"){
            app.use(morgan("dev"))
        }
    } catch (error) {
        console.log("Server Error", error);
    }finally {
        routes(app)
    }
}

 
 
server(process.env.mode)