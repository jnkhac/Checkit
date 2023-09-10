const router = require('express').Router()
const { Op } = require('sequelize')

const { tokenExtractor } = require('../util/middleware')
const { Note, User, Topic, Rating, Bookmark, Join } = require('../models')
const { sequelize } = require('sequelize')
const e = require('express')

router.get('/', async (req, res) => {
	// const where = {}

	// if (req.query.important) {
	// 	where.important = req.query.important === 'true'
	// }

	// if (req.query.search) {
	// 	where.content = {
	// 		[Op.substring]: req.query.search
	// 	}
	// }

	// const notes = await Note.findAll({
	// 	attributes: { exclude: ['userId'] },
	// 	include: [{
	// 		model: User,
	// 		attributes: ['username']
	// 	}, {
	// 		model: Topic,
	// 		attributes: ['name']
	// 	}, {
	// 		model: Rating,
	// 		attributes: ['value']
	// 	}],
	// 	where
	// })

	// let returnNotes = []
	// for (const note of notes) {
	// 	let returnNote = {
	// 		...note.dataValues,
	// 	}
	// 	for (const rating of note.ratings) {
	// 		if (rating.value === true) {
	// 			returnNote.upvotes++
	// 		} else {
	// 			returnNote.downvotes++
	// 		}
	// 	}
	// 	returnNotes.push(returnNote)
	// }

	const returnNotes = await Note.findAll()

	res.json(returnNotes)
})

router.get('/home', tokenExtractor, async (req, res) => {
	const user = await User.findByPk(req.decodedToken.id)
	const joins = await Join.findAll({
		include: [{
			model: User,
			where: {
				id: user.id
			}
		}]
	})

	const followedTopics = []
	for (const ft of joins) {
		followedTopics.push(ft.dataValues.id)
	}

	const notes = await Note.findAll({
		attributes: { exclude: ['userId'] },
		include: [{
			model: User,
			attributes: ['username']
		}, {
			model: Topic,
			attributes: ['name'],
			where: {
				id: {
					[Op.in]: followedTopics
				}
			}
		}, {
			model: Rating,
			attributes: ['id', 'value'],
			where: {
				userId: user.id
			},
			required: false
		}, {
			model: Bookmark,
			where: {
				userId: user.id
			},
			required: false
		}],
	})

	const notesForRatingCount = await Note.findAll({
		attributes: { exclude: ['userId'] },
		include: [{
			model: User,
			attributes: ['username']
		}, {
			model: Topic,
			attributes: ['name'],
			where: {
				id: {
					[Op.in]: followedTopics
				}
			}
		}, {
			model: Rating,
			attributes: ['id', 'value'],
		}, {
			model: Bookmark
		}],
	})

	let returnNotes = []
	for (let i = 0; i < notes.length; i++) {
		let ratingId = null
		let rating = null
		if (notes[i].ratings.length) {
			ratingId = notes[i].ratings[0].id
			rating = notes[i].ratings[0].value
		}
		let returnNote = {
			id: notes[i].id,
			title: notes[i].title,
			content: notes[i].content,
			date: notes[i].date,
			author: notes[i].user.username,
			upvotes: notes[i].upvotes,
			downvotes: notes[i].downvotes,
			topic: notes[i].topic.name,
			ratingId: ratingId,
			rating: rating,
			saved: notes[i].bookmarks.length === 1
		}
		for (const rating of notesForRatingCount[i].ratings) {
			if (rating.value === true) {
				returnNote.upvotes++
			} else {
				returnNote.downvotes++
			}
		}
		returnNotes.push(returnNote)
	}

	res.json(returnNotes)
})

router.get('/popular', async (req, res) => {
	const notes = await Note.findAll({
		attributes: { exclude: ['userId'] },
		include: [{
			model: User,
			attributes: ['username']
		}, {
			model: Topic,
			attributes: ['name'],
		}, {
			model: Rating,
			attributes: ['id', 'value'],
		}, {
			model: Bookmark,
		}],
		order: [
			['upvotes', 'DESC']
		]
	})

	let returnNotes = []
	for (let i = 0; i < notes.length; i++) {
		let ratingId = null
		let rating = null
		if (notes[i].ratings.length) {
			ratingId = notes[i].ratings[0].id
			rating = notes[i].ratings[0].value
		}
		let returnNote = {
			id: notes[i].id,
			title: notes[i].title,
			content: notes[i].content,
			date: notes[i].date,
			author: notes[i].user.username,
			upvotes: notes[i].upvotes,
			downvotes: notes[i].downvotes,
			topic: notes[i].topic.name,
			ratingId: ratingId,
			rating: rating,
			saved: notes[i].bookmarks.length === 1
		}
		for (const rating of notes[i].ratings) {
			if (rating.value === true) {
				returnNote.upvotes++
			} else {
				returnNote.downvotes++
			}
		}
		returnNotes.push(returnNote)
	}

	res.json(returnNotes)
	// const notes = await Note.findAll({
	// 	attributes: { exclude: ['userId'] },
	// 	include: [{
	// 		model: User,
	// 		attributes: ['username']
	// 	}, {
	// 		model: Topic,
	// 		attributes: ['name']
	// 	}, {
	// 		model: Rating,
	// 		attributes: ['id', 'value']
	// 	}],
	// 	order: [
	// 		['upvotes', 'DESC']
	// 	]
	// })

	// let returnNotes = []
	// for (const note of notes) {
	// 	let returnNote = {
	// 		id: note.id,
	// 		title: note.title,
	// 		content: note.content,
	// 		date: note.date,
	// 		author: note.user.username,
	// 		upvotes: note.upvotes,
	// 		downvotes: note.downvotes,
	// 		topic: note.topic.name
	// 	}
	// 	for (const rating of note.ratings) {
	// 		if (rating.value === true) {
	// 			returnNote.upvotes++
	// 		} else {
	// 			returnNote.downvotes++
	// 		}
	// 	}
	// 	returnNotes.push(returnNote)
	// }

	// res.json(returnNotes)
})

router.get('/popular/auth', tokenExtractor, async (req, res) => {
	const user = await User.findByPk(req.decodedToken.id)

	const notes = await Note.findAll({
		attributes: { exclude: ['userId'] },
		include: [{
			model: User,
			attributes: ['username']
		}, {
			model: Topic,
			attributes: ['name'],
		}, {
			model: Rating,
			attributes: ['id', 'value'],
			where: {
				userId: user.id
			},
			required: false
		}, {
			model: Bookmark,
			where: {
				userId: user.id
			},
			required: false
		}]
	})

	const notesForRatingCount = await Note.findAll({
		attributes: { exclude: ['userId'] },
		include: [{
			model: User,
			attributes: ['username']
		}, {
			model: Topic,
			attributes: ['name'],
		}, {
			model: Rating,
			attributes: ['id', 'value'],
		}, {
			model: Bookmark
		}],
	})

	// const sorted = notes.map(note => notesForRatingCount.find(n => n.id === note.id))

	let returnNotes = []
	for (let i = 0; i < notes.length; i++) {
		let ratingId = null
		let rating = null
		if (notes[i].ratings.length) {
			ratingId = notes[i].ratings[0].id
			rating = notes[i].ratings[0].value
		}
		let returnNote = {
			id: notes[i].id,
			title: notes[i].title,
			content: notes[i].content,
			date: notes[i].date,
			author: notes[i].user.username,
			upvotes: notes[i].upvotes,
			downvotes: notes[i].downvotes,
			topic: notes[i].topic.name,
			ratingId: ratingId,
			rating: rating,
			saved: notes[i].bookmarks.length === 1
		}
		for (const rating of notesForRatingCount[i].ratings) {
			if (rating.value === true) {
				returnNote.upvotes++
			} else {
				returnNote.downvotes++
			}
		}
		returnNotes.push(returnNote)
	}

	returnNotes.sort(function (a, b) {
		return b.upvotes - a.upvotes
	})

	res.json(returnNotes)
})

router.get('/savednotes', tokenExtractor, async (req, res) => {
	const user = await User.findByPk(req.decodedToken.id)
	const notes = await Note.findAll({
		attributes: { exclude: ['userId'] },
		include: [{
			model: User,
			attributes: ['username']
		}, {
			model: Topic,
			attributes: ['name']
		}, {
			model: Bookmark,
			attributes: ['noteId'],
			where: {
				userId: user.id
			},
		}, {
			model: Rating,
			attributes: ['id', 'value']
		}],
	})

	let returnNotes = []
	for (const note of notes) {
		let returnNote = {
			id: note.id,
			title: note.title,
			content: note.content,
			date: note.date,
			author: note.user.username,
			upvotes: note.upvotes,
			downvotes: note.downvotes,
			topic: note.topic.name,
			ratingId: note.ratings[0].id,
			rating: note.ratings[0].value,
			saved: note.bookmarks.length === 1
		}
		for (const rating of note.ratings) {
			if (rating.value === true) {
				returnNote.upvotes++
			} else {
				returnNote.downvotes++
			}
		}
		returnNotes.push(returnNote)
	}

	res.json(returnNotes)
})

router.get('/topic/:id', async (req, res) => {
	const notes = await Note.findAll({
		attributes: { exclude: ['userId'] },
		include: [{
			model: User,
			attributes: ['username']
		}, {
			model: Topic,
			attributes: ['name', 'desc'],
			where: {
				id: req.params.id
			}
		}, {
			model: Rating,
			attributes: ['id', 'value'],
		}, {
			model: Bookmark,
		}]
	})

	let returnNotes = []
	for (let i = 0; i < notes.length; i++) {
		let ratingId = null
		let rating = null
		if (notes[i].ratings.length) {
			ratingId = notes[i].ratings[0].id
			rating = notes[i].ratings[0].value
		}
		let returnNote = {
			id: notes[i].id,
			title: notes[i].title,
			content: notes[i].content,
			date: notes[i].date,
			author: notes[i].user.username,
			upvotes: notes[i].upvotes,
			downvotes: notes[i].downvotes,
			topic: notes[i].topic.name,
			topicDesc: notes[i].topic.desc,
			ratingId: ratingId,
			rating: rating,
			saved: notes[i].bookmarks.length === 1
		}
		for (const rating of notes[i].ratings) {
			if (rating.value === true) {
				returnNote.upvotes++
			} else {
				returnNote.downvotes++
			}
		}
		returnNotes.push(returnNote)
	}

	res.json(returnNotes)
})

router.post('/', tokenExtractor, async (req, res) => {
	try {
		const user = await User.findByPk(req.decodedToken.id)
		const note = await Note.create({ ...req.body, userId: user.id, date: new Date() })
		const newNote = await Note.findByPk(note.id, {
			attributes: { exclude: ['userId'] },
			include: [{
				model: User,
				attributes: ['username']
			}, {
				model: Topic,
				attributes: ['name']
			}, {
				model: Rating,
				attributes: ['value']
			}],
		})

		let returnNote = {
			...newNote.dataValues,
			upvotes: 0,
			downvotes: 0
		}

		res.json(returnNote)
	} catch (error) {
		console.log(error)
		return res.status(400).json({ error })
	}
})

const noteFinder = async (req, res, next) => {
	// req.note = await Note.findByPk(req.params.id, {
	// 	attributes: { exclude: ['userId'] },
	// 	include: [{
	// 		model: User,
	// 		attributes: ['username']
	// 	}, {
	// 		model: Topic,
	// 		attributes: ['name']
	// 	}, {
	// 		model: Rating,
	// 		attributes: ['value']
	// 	}],
	// })
	req.note = await Note.findByPk(req.params.id, {
		attributes: { exclude: ['userId'] },
		include: [{
			model: User,
			attributes: ['username']
		}, {
			model: Topic,
			attributes: ['name', 'desc'],
		}, {
			model: Rating,
			attributes: ['id', 'value'],
		}, {
			model: Bookmark,
		}]
	})
	next()
}

router.get('/:id', noteFinder, async (req, res) => {
	if (req.note) {
		const note = req.note
		let returnNotes = []
		let ratingId = null
		let rating = null
		// if (note.ratings.length) {
		// 	ratingId = note.ratings[0].id
		// 	rating = note.ratings[0].value
		// }
		let returnNote = {
			id: note.id,
			title: note.title,
			content: note.content,
			date: note.date,
			author: note.user.username,
			upvotes: note.upvotes,
			downvotes: note.downvotes,
			topic: note.topic.name,
			topicDesc: note.topic.desc,
		}
		for (const rating of note.ratings) {
			if (rating.value === true) {
				returnNote.upvotes++
			} else {
				returnNote.downvotes++
			}
		}
		returnNotes.push(returnNote)
		res.json(returnNote)
	} else {
		res.status(404).end()
	}
})

router.get('/auth/:id', tokenExtractor, async (req, res) => {
	const user = await User.findByPk(req.decodedToken.id)
	const notes = await Note.findAll({
		attributes: { exclude: ['userId'] },
		include: [{
			model: User,
			attributes: ['username']
		}, {
			model: Topic,
			attributes: ['name', 'desc'],
		}, {
			model: Rating,
			attributes: ['id', 'value'],
			where: {
				userId: user.id
			},
			required: false
		}, {
			model: Bookmark,
			where: {
				userId: user.id
			},
			required: false
		}]
	})

	const notesForRatingCount = await Note.findAll({
		attributes: { exclude: ['userId'] },
		include: [{
			model: User,
			attributes: ['username']
		}, {
			model: Topic,
			attributes: ['name', 'desc'],
		}, {
			model: Rating,
			attributes: ['id', 'value'],
		}, {
			model: Bookmark
		}],
	})

	let returnNotes = []
	for (let i = 0; i < notes.length; i++) {
		let ratingId = null
		let rating = null
		if (notes[i].ratings.length) {
			ratingId = notes[i].ratings[0].id
			rating = notes[i].ratings[0].value
		}
		let returnNote = {
			id: notes[i].id,
			title: notes[i].title,
			content: notes[i].content,
			date: notes[i].date,
			author: notes[i].user.username,
			upvotes: notes[i].upvotes,
			downvotes: notes[i].downvotes,
			topic: notes[i].topic.name,
			topicDesc: notes[i].topic.desc,
			ratingId: ratingId,
			rating: rating,
			saved: notes[i].bookmarks.length === 1
		}
		for (const rating of notesForRatingCount[i].ratings) {
			if (rating.value === true) {
				returnNote.upvotes++
			} else {
				returnNote.downvotes++
			}
		}
		returnNotes.push(returnNote)
	}

	const keyNote = returnNotes.find(note => note.id.toString() === req.params.id)

	if (keyNote) {
		res.json(keyNote)
	} else {
		res.status(404).end()
	}
})

router.delete('/:id', tokenExtractor, noteFinder, async (req, res) => {
	if (req.note) {
		await req.note.destroy()
	}
	res.status(204).end()
})

router.put('/:id', tokenExtractor, noteFinder, async (req, res) => {
	if (req.note) {
		req.note.important = req.body.important
		await req.note.save()
		let returnNote = {
			...req.note.dataValues,
			upvotes: 0,
			downvotes: 0
		}
		res.json(returnNote)
	} else {
		res.status(404).end()
	}
})

module.exports = router