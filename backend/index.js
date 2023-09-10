const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const notesRouter = require('./controllers/notes')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const commentsRouter = require('./controllers/comments')
const topicsRouter = require('./controllers/topics')
const ratingsRouter = require('./controllers/ratings')
const bookmarksRouter = require('./controllers/bookmarks')
const joinsRouter = require('./controllers/joins')

app.use(express.json())

app.use('/api/notes', notesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/topics', topicsRouter)
app.use('/api/ratings', ratingsRouter)
app.use('/api/bookmarks', bookmarksRouter)
app.use('/api/joins', joinsRouter)

const start = async () => {
	await connectToDatabase()
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`)
	})
}

start()