const { DataTypes } = require('sequelize')

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.createTable('bookmarks', {
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
			note_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: 'notes', key: 'id' },
			},
		})
		// await queryInterface.addColumn('notes', 'likes', {
		// 	type: DataTypes.INTEGER,
		// 	default: 0
		// })
		// await queryInterface.addColumn('notes', 'saves', {
		// 	type: DataTypes.INTEGER,
		// 	default: 0
		// })
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.dropTable('bookmarks')
		// await queryInterface.removeColumn('notes', 'likes')
		// await queryInterface.removeColumn('notes', 'saves')
	},
}
