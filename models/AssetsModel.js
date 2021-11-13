module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("assets", { 
        main_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4(),
            allowNull: false,
            primaryKey: true, 
        },
        main_title: {
            type: Sequelize.STRING(),
            allowNull: false, 
        }, 
        main_motto: {
            type: Sequelize.STRING(),
            allowNull: false, 
        }
    })
}