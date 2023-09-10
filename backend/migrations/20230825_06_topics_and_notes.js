const { DataTypes } = require('sequelize')

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.createTable('topic_notes', {
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
		})
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.dropTable('topic_notes')
	},
}
