const router = require('express').Router()

const { tokenExtractor } = require('../util/middleware')
const { Note, User, Comment } = require('../models')

router.get('/', async (req, res) => {
	const comments = await Comment.findAll({
		include: [{
			model: User,
			attributes: ['username']
		}]
	})
	res.json(comments)
})

router.get('/note/:noteId', async (req, res) => {
	const comments = await Comment.findAll({
		include: [{
			model: User,
			attributes: ['username']
		}],
		where: {
			noteId: req.params.noteId,
		}
	})
	res.json(comments)
})

router.post('/', tokenExtractor, async (req, res) => {
	try {
		const user = await User.findByPk(req.decodedToken.id)
		const note = await Note.findByPk(req.body.noteId)
		const comment = await Comment.create({ ...req.body, userId: user.id, noteId: note.id, date: new Date() })
		res.json(comment)
	} catch (error) {
		console.log(error)
		return res.status(400).json({ error })
	}
})

const commentFinder = async (req, res, next) => {
	req.comment = await Comment.findByPk(req.params.id)
	next()
}

router.get('/:id', commentFinder, async (req, res) => {
	if (req.comment) {
		res.json(req.comment)
	} else {
		res.status(404).end()
	}
})

router.delete('/:id', tokenExtractor, commentFinder, async (req, res) => {
	const user = await User.findByPk(req.decodedToken.id)
	if (req.comment && req.comment.userId == user.id) {
		await req.comment.destroy()
	}
	res.status(204).end()
})

router.put('/:id', tokenExtractor, commentFinder, async (req, res) => {
	const user = await User.findByPk(req.decodedToken.id)
	if (req.comment && req.comment.userId == user.id) {
		req.comment.content = req.body.content
		await req.comment.save()
		res.json(req.comment)
	} else {
		res.status(404).end()
	}
})

module.exports = router