module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("students", {
        student_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4(),
            allowNull: false,
            primaryKey: true, 
        },
        student_name: {
            type: Sequelize.STRING(64),
            allowNull: false, 
        },
        student_phone: {
            type: Sequelize.STRING(20),
            allowNull: false, 
        }
    })
}