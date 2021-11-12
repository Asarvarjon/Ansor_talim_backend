module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("scenes", {
        scene_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4(),
            allowNull: false,
            primaryKey: true, 
        }, 
        scene_photo: {
            type: Sequelize.STRING(),
            allowNull: false, 
        }, 
    })
}