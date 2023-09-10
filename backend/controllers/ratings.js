const router = require('express').Router()
const { Op } = require('sequelize')

const { tokenExtractor } = require('../util/middleware')
const { Note, User, Topic } = require('../models')
const { sequelize } = require('sequelize')
const Rating = require('../models/rating')
const { Query } = require('pg')

router.get('/', async (req, res) => {
    const ratings = await Rating.findAll()

    res.json(ratings)
})

router.post('/', tokenExtractor, async (req, res) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const rating = await Rating.create({ ...req.body, userId: user.id })
        res.json(rating)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error })
    }
})

const ratingFinder = async (req, res, next) => {
    req.rating = await Rating.findByPk(req.params.id)
    next()
}

router.get('/:id', ratingFinder, async (req, res) => {
    if (req.rating) {
        res.json(req.rating)
    } else {
        res.status(404).end()
    }
})

router.delete('/:id', tokenExtractor, ratingFinder, async (req, res) => {
    if (req.rating) {
        await req.rating.destroy()
    }
    res.status(204).end()
})

router.put('/:id', tokenExtractor, ratingFinder, async (req, res) => {
    if (req.rating) {
        req.rating.value = !req.rating.value
        await req.rating.save()
        res.json(req.rating)
    } else {
        res.status(404).end()
    }
})

module.exports = router