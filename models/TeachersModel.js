module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("teachers", {
        teacher_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4(),
            allowNull: false,
            primaryKey: true, 
        },
        teacher_name: {
            type: Sequelize.STRING(64),
            allowNull: false, 
        }, 
        teacher_subject: {
            type: Sequelize.STRING(32),
            allowNull: false, 
        }, 
        teacher_experience: {
            type: Sequelize.INTEGER(),
            allowNull: false, 
        },
        teacher_students: {
            type: Sequelize.INTEGER(),
            allowNull: false, 
        },
        teacher_photo: {
            type: Sequelize.STRING(),
            allowNull: false, 
        },
    })
}