const { generateHash } = require("../bcrypt");

module.exports = async function init(db) {
    const count = await db.users.count(0);

    const password = process.env.password;
    const username = process.env.username

    if(count === 0){
        const admin = await db.users.create({
            user_username: username.toLowerCase(), 
            user_password: generateHash(password), 
        })
 
    }
}
