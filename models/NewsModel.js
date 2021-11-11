module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("news", {
        news_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4(),
            allowNull: false,
            primaryKey: true, 
        },
        news_title: {
            type: Sequelize.STRING(64),
            allowNull: false, 
        }, 
        news_short_desc: {
            type: Sequelize.STRING(),
            allowNull: false, 
        },
        news_full_desc: {
            type: Sequelize.TEXT(),
            allowNull: false, 
        },
        news_photo: {
            type: Sequelize.STRING(),
            allowNull: false, 
        }
    })
}