const { verifyToken } = require("../modules/jwt");


module.exports = async function UserMiddleware(req, res, next) {

    try {
        if(!req.cookies.token){
            next()
            return;
        }

        const data = (await verifyToken(req.cookies.token));

        if(!data){
            next()
            return
        };

         

        const session = await req.db.sessions.findOne({
            raw: true,
            where: {
                session_id: data.session_id
            },
            include: {
                model: req.db.users
            }
        })
  

        if(!session){
            next()
            return
        };

        req.user = await session.user_id;
        next()
    } catch (error) { 

    }

}