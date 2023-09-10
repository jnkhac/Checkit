const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Note extends Model { }

Note.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	title: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	content: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	important: {
		type: DataTypes.BOOLEAN
	},
	date: {
		type: DataTypes.DATE
	},
	upvotes: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	},
	downvotes: {
		type: DataTypes.INTEGER,
		defaultValue: 0
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
	}
}, {
	sequelize,
	underscored: true,
	timestamps: false,
	modelName: 'note'
})

module.exports = Note