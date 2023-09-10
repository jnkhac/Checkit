const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('ratings', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            value: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' },
            },
            note_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'notes', key: 'id' },
            }
        })
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('ratings')
    },
}
