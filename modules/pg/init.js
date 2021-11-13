const { generateHash } = require("../bcrypt");

module.exports = async function init(db) {
    const count = await db.users.count();

    const password = process.env.password;
    const username = process.env.username

    if(count === 0){
        const admin = await db.users.create({
            user_username: username.toLowerCase(), 
            user_password: generateHash(password), 
        })  
 
    };

     
     
    const acount = await db.address.count(0); 
    if(acount === 0){
        const adress = await db.address.create({
            a_map: `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48271.64865105821!2d69.0349640524582!3d40.872356108637575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae0cffaa77dbbb%3A0x74bfadbb12b99dcc!2z0JDQutC60YPRgNCz0LDQvSwg0KPQt9Cx0LXQutC40YHRgtCw0L0!5e0!3m2!1sru!2s!4v1633431104574!5m2!1sru!2s`,
            a_location: `Toshkent shahri, Chilonzor tumani, Ustozlar ko’chasi, 13-uy`,
            a_phone: "+998 90 350 55 55",
            a_email: "apexedu@gmail.com",
            a_telegram_link: "#",
            a_youtube_link: "#",
            a_facebook_link: "#"
        })
 
    }


}
