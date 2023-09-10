const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Comment extends Model {}

Comment.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	content: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	date: {
		type: DataTypes.DATE
	},
}, {
	sequelize,
	underscored: true,
	timestamps: false,
	modelName: 'comment'
})

module.exports = Comment