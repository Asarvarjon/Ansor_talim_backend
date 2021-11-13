module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("applicants", {
        applicant_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4(),
            allowNull: false,
            primaryKey: true, 
        },
        applicant_name: {
            type: Sequelize.STRING(64),
            allowNull: false, 
        }, 
        applicant_phone: {
            type: Sequelize.STRING(20),
            allowNull: false, 
        }
    })
}