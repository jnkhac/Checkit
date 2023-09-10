const router = require('express').Router()

const { tokenExtractor } = require('../util/middleware')
const { Topic, User } = require('../models')

router.get('/', async (req, res) => {
	const topics = await Topic.findAll()

	res.json(topics)
})

router.post('/', tokenExtractor, async (req, res) => {
	try {
		const topic = await Topic.create(req.body)
		res.json(topic)
	} catch (error) {
		console.log(error)
		return res.status(400).json({ error })
	}
})

const topicFinder = async (req, res, next) => {
	req.topic = await Topic.findByPk(req.params.id)
	next()
}

router.get('/:id', topicFinder, async (req, res) => {
	if (req.topic) {
		res.json(req.topic)
	} else {
		res.status(404).end()
	}
})

router.delete('/:id', topicFinder, async (req, res) => {
	if (req.topic) {
		await req.topic.destroy()
	}
	res.status(204).end()
})

router.put('/:id', topicFinder, async (req, res) => {
	if (req.topic) {
		req.topic.name = req.body.name
		await req.topic.save()
		res.json(req.topic)
	} else {
		res.status(404).end()
	}
})

module.exports = router