module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("comments", {
        comment_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4(),
            allowNull: false,
            primaryKey: true, 
        },
        comment_owner: {
            type: Sequelize.STRING(64),
            allowNull: false, 
        }, 
        comment_owner_description: {
            type: Sequelize.TEXT(),
            allowNull: false, 
        },
        comment_text: {
            type: Sequelize.STRING(),
            allowNull: false, 
        },
        comment_owner_photo: {
            type: Sequelize.STRING(),
            allowNull: false, 
        },
        comment_star: {
            type: Sequelize.INTEGER(),
            allowNull: false,
        }
    })
}