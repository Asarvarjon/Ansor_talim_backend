module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("videos", {
        video_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4(),
            allowNull: false,
            primaryKey: true, 
        },
        youtube_link: {
            type: Sequelize.STRING(),
            allowNull: false, 
        } 
    })
}