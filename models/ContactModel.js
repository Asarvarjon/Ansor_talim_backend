module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("contacts", {
        student_contact_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4(),
            allowNull: false,
            primaryKey: true, 
        },
        student_contact_name: {
            type: Sequelize.STRING(64),
            allowNull: false, 
        }, 
        student_contact_phone: {
            type: Sequelize.STRING(20),
            allowNull: false, 
        },
        student_contact_email: {
            type: Sequelize.STRING(),
            allowNull: false, 
        }
    })
}