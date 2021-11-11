module.exports = async (sequelize, Sequelize) => {
    return await sequelize.define("courses", {
        course_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4(),
            allowNull: false,
            primaryKey: true, 
        },
        course_title: {
            type: Sequelize.STRING(64),
            allowNull: false, 
        }, 
        course_desc: {
            type: Sequelize.TEXT(),
            allowNull: false, 
        },
        course_photo: {
            type: Sequelize.STRING(),
            allowNull: false, 
        }
    })
}