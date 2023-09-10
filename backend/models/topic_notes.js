const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class TopicNotes extends Model {}

TopicNotes.init({
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	noteId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: { model: 'notes', key: 'id' },
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
	modelName: 'topicNotes'
})

module.exports = TopicNotes