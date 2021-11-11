const fs = require("fs");
const path = require("path"); 
const { AddCommentValidation } = require("../modules/Validations");
 
module.exports = class CommentsController{
    static async CommentsGetController(req, res, next) {
        try {

            const comments = await req.db.comments.findAll({
                raw: true
            } ) 

            res.render("comments",{
                comments
            })
        } catch (error) {
            next(error)
        }
    }

    static async AddCommentsPostController(req, res, next){
        try { 
            const { comment_owner, comment_owner_description, comment_text, comment_star} = await AddCommentValidation(req.body);

            const photo = req.files?.photo;

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
 
            const comment = await req.db.comments.create({
                comment_owner,
                comment_owner_description,
                comment_text,
                comment_star, 
                comment_owner_photo: photo_name
            }) 

            res.redirect("/admin_panel/comments") 
        } catch (error) {
            console.log(error);
            res.render("comments",{
                error: error.message
            })
        }
    }

    static async CommentDeleteController(req, res, next) {
         try {
            let comment_id = req.params.comment_id;

            const comment = await req.db.comments.findOne({
                raw: true,
                where: {
                    comment_id
                }
            })

            if(!comment) throw new Error("comment is not found");

            fs.unlink(
                path.join(
                    __dirname,
                    "..",
                    "public",
                    "uploads",
                    comment.comment_owner_photo
                ),
                () => {}
            );

            await req.db.comments.destroy({
                where: {
                    comment_id: comment_id
                }
            });

            res.redirect("/admin_panel/comments/")
         } catch (error) {
             console.log(error);
         }
    }
}