module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("address", { 
        a_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4(),
            allowNull: false,
            primaryKey: true, 
        },
        a_map: {
            type: Sequelize.TEXT(),
            allowNull: false, 
        }, 
        a_location: {
            type: Sequelize.STRING(),
            allowNull: false, 
        },
        a_phone: {
            type: Sequelize.STRING(),
            allowNull: false, 
        },
        a_email: {
            type: Sequelize.STRING(),
            allowNull: false, 
        },
        a_telegram_link: {
            type: Sequelize.STRING(),
            allowNull: false, 
        },
        a_youtube_link: {
            type: Sequelize.STRING(),
            allowNull: false, 
        },
        a_facebook_link: {
            type: Sequelize.STRING(),
            allowNull: false, 
        }
    })
}