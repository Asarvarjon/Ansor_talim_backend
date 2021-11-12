module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("results", {
        result_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4(),
            allowNull: false,
            primaryKey: true, 
        },
        result_owner: {
            type: Sequelize.STRING(64),
            allowNull: false, 
        }, 
        result_owner_university: {
            type: Sequelize.STRING(),
            allowNull: false, 
        },
        result_owner_study_duration: {
            type: Sequelize.STRING(),
            allowNull: false, 
        },
        result_owner_photo: {
            type: Sequelize.STRING(),
            allowNull: false, 
        }
    })
}