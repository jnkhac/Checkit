const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Topic extends Model { }

Topic.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: DataTypes.TEXT,
		allowNull: false,
		unique: true
	},
	desc: {
		type: DataTypes.TEXT,
		allowNull: false
	},
}, {
	sequelize,
	underscored: true,
	timestamps: false,
	modelName: 'topic'
})

module.exports = Topic