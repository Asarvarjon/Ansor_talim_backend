
module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("sessions", {
        session_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4(),
            allowNull: false,
            primaryKey: true, 
        },
        session_user_agent: {
            type: Sequelize.STRING(120),
            allowNull: false, 
        } 
    })
}