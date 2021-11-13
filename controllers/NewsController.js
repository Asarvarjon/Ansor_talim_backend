const { AddNewsValidation } = require("../modules/Validations");
const fs = require("fs");
const path = require("path")

module.exports = class NewsController{
    static async NewsGetController(req, res, next) {
        try {

            const news = await req.db.news.findAll({
                order:[['updatedAt', 'DESC']]
            })
            

            res.render("news",{
                news
            })
        } catch (error) {
            next(error)
        }
    }

    static async AddNewsPostController(req, res, next){
        try { 
            const {news_title, news_short_desc, news_full_desc} = await AddNewsValidation(req.body);

            const photo = req.files.news_file;

            let photo_name = photo
				? photo.md5 +
				  "." +
				  photo.mimetype.split("/")[
						photo.mimetype.split("/").length - 1
				  ]
				: null; 

            if (photo) {
                    photo.mv(
                        path.join(__dirname, "..", "public", "uploads", photo_name)
                    );
            }

            const news = await req.db.news.create({
                news_title,
                news_short_desc,
                news_full_desc,
                news_photo: photo_name
            }) 

            res.redirect("/admin_panel/news") 
        } catch (error) {
            res.render("news",{
                error: error.message
            })
        }
    }

    static async NewsDeleteController(req, res, next) {
         try {
            let news_id = req.params.news_id;

            const news = await req.db.news.findOne({
                raw: true,
                where: {
                    news_id: news_id
                }
            })

            if(!news) throw new Error("News not found");

            fs.unlink(
                path.join(
                    __dirname,
                    "..",
                    "public",
                    "uploads",
                    news.news_photo
                ),
                () => {}
            );

            await req.db.news.destroy({
                where: {
                    news_id: news_id
                }
            });

            res.redirect("/admin_panel/news/")
         } catch (error) {
             console.log(error);
         }
    }
}