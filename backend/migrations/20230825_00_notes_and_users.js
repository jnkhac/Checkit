const { DataTypes } = require('sequelize')

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.createTable('topics', {
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
		})
		await queryInterface.createTable('users', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			username: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false
			},
			password_hash: {
				type: DataTypes.STRING,
				allowNull: false
			}
		})
		await queryInterface.createTable('notes', {
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
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: 'users', key: 'id' },
			},
			topic_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: 'topics', key: 'id' },
			}
		})
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.dropTable('topics')
		await queryInterface.dropTable('notes')
		await queryInterface.dropTable('users')
	},
}
