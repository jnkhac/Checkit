const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('joins', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' },
            },
            topic_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'topics', key: 'id' },
            }
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('joins')
    },
}
