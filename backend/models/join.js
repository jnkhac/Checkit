const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Join extends Model { }

Join.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
    },
    topicId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'topics', key: 'id' },
    },
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'join'
})

module.exports = Join