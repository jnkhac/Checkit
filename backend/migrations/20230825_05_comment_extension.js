const { DataTypes } = require('sequelize')

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.createTable('comments', {
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
		})
		await queryInterface.addColumn('comments', 'user_id', {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: 'users', key: 'id' },
		})
		await queryInterface.addColumn('comments', 'note_id', {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: 'notes', key: 'id' },
		})
		// await queryInterface.addColumn('comments', 'parent_id', {
		// 	type: DataTypes.INTEGER,
		// 	default: null,
		// 	references: { model: 'comments', key: 'id' },
		// })
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.dropTable('comments')
	},
}
