
module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("users", {
        user_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4(),
            allowNull: false,
            primaryKey: true, 
        },
        user_name: {
            type: Sequelize.STRING(64),
            allowNull: false, 
        },
        user_email: {
            type: Sequelize.STRING(64),
            allowNull: false, 
        },
        user_password: {
            type: Sequelize.STRING(120),
            allowNull: false, 
        }, 
        user_role: {
            type: Sequelize.ENUM("admin", "moderator", "user"),
            allowNull: false
        }
    })
}