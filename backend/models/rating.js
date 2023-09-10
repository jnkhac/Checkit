const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Rating extends Model { }

Rating.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    value: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
    },
    noteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'notes', key: 'id' },
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'rating'
})

module.exports = Rating