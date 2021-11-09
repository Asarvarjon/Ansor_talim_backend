const { generateHash } = require("../bcrypt");

module.exports = async function init(db) {
    const count = await db.users.count(0);

    const password = process.env.password;

    if(count === 0){
        const admin = await db.users.create({
            user_name: "admin",
            user_email: "ansor@gmail.com",
            user_password: generateHash(password),
            user_role: "admin"
        })

        console.log(admin);
    }
}
