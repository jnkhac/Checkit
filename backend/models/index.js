const Note = require('./note')
const User = require('./user')
const Team = require('./team')
const Membership = require('./membership')
const UserNotes = require('./user_notes')
const Bookmark = require('./bookmark')
const Comment = require('./comment')
const Topic = require('./topic')
const TopicNotes = require('./topic_notes')
const Rating = require('./rating')
const Join = require('./join')

User.hasMany(Note)
Note.belongsTo(User)

User.belongsToMany(Team, { through: Membership })
Team.belongsToMany(User, { through: Membership })

User.belongsToMany(Note, { through: UserNotes, as: 'markedNotes' })
Note.belongsToMany(User, { through: UserNotes, as: 'usersMarked' })

// User.belongsToMany(Note, { through: Bookmark })
// Note.belongsToMany(User, { through: Bookmark })

User.hasMany(Bookmark)
Bookmark.belongsTo(User)

Note.hasMany(Bookmark, {
	onDelete: 'CASCADE',
	hooks: true
})
Bookmark.belongsTo(Note)

User.hasMany(Comment)
Comment.belongsTo(User)

Note.hasMany(Comment, {
	onDelete: 'CASCADE',
	hooks: true
})
Comment.belongsTo(Note)

Topic.hasMany(Note)
Note.belongsTo(Topic)

User.hasMany(Rating)
Rating.belongsTo(User)

Note.hasMany(Rating, {
	onDelete: 'CASCADE',
	hooks: true
})
Rating.belongsTo(Note)

User.hasMany(Join)
Join.belongsTo(User)

Topic.hasMany(Join)
Join.belongsTo(Topic)

module.exports = {
	Note, User, Team, Membership, Bookmark, Comment, Topic, TopicNotes, Rating, Join
}