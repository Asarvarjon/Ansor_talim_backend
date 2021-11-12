const fs = require("fs");
const path = require("path"); 
 
module.exports = class CourseController{
    static async ScenesGetController(req, res, next) {
        try {

            const scenes = await req.db.scenes.findAll({
                raw: true,
                order:[['updatedAt', 'DESC']]
            })
            
            console.log(scenes);
            res.render("scenes",{
                scenes
            })
        } catch (error) {
            next(error)
        }
    }

    static async AddScenesPostController(req, res, next){
        try {   
            const photo = req.files.photo;

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

            const scene = await req.db.scenes.create({ 
                scene_photo: photo_name
            }) 

            res.redirect("/admin_panel/scenes") 
        } catch (error) {
            res.render("scenes",{
                error: error.message
            })
        }
    }

    static async SceneDeleteController(req, res, next) {
         try {
            let scene_id = req.params.scene_id;

            const scene = await req.db.scenes.findOne({
                raw: true,
                where: {
                    scene_id: scene_id
                }
            })

            if(!scene) throw new Error("Scene is not found");

            fs.unlink(
                path.join(
                    __dirname,
                    "..",
                    "public",
                    "uploads",
                    scene.scene_photo
                ),
                () => {}
            );

            await req.db.scenes.destroy({
                where: {
                    scene_id: scene_id
                }
            });

            res.redirect("/admin_panel/scenes/")
         } catch (error) {
             console.log(error);
         }
    }
}