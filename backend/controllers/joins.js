const router = require('express').Router()
const { Op } = require('sequelize')

const { tokenExtractor } = require('../util/middleware')
const { Note, User, Topic, Bookmark, Join } = require('../models')
const { sequelize } = require('sequelize')

router.get('/', async (req, res) => {
    const joins = await Join.findAll({
        attributes: { exclude: ['userId'] },
        include: [{
            model: User,
            attributes: ['username']
        }, {
            model: Topic
        }]
    })
    res.json(joins)
})

router.get('/user', tokenExtractor, async (req, res) => {
    const user = await User.findByPk(req.decodedToken.id)
    const topics = await Join.findAll({
        include: [{
            model: User,
            attributes: ['username'],
            where: {
                username: user.username
            }
        }, {
            model: Topic,
            attributes: ['name']
        }]
    })

    res.json(topics)
})

router.post('/', tokenExtractor, async (req, res) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const join = await Join.create({ ...req.body, userId: user.id })
        res.json(join)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error })
    }
})

const joinFinder = async (req, res, next) => {
    req.join = await Join.findByPk(req.params.id)
    next()
}

router.get('/:id', joinFinder, async (req, res) => {
    if (req.join) {
        res.json(req.join)
    } else {
        res.status(404).end()
    }
})

router.delete('/:id', tokenExtractor, joinFinder, async (req, res) => {
    if (req.join) {
        await req.join.destroy()
    }
    res.status(204).end()
})

// router.put('/:id', tokenExtractor, bookmarkFinder, async (req, res) => {
//     if (req.bookmark) {
//         req.bookmark.important = req.body.important
//         await req.note.save()
//         res.json(req.note)
//     } else {
//         res.status(404).end()
//     }
// })

module.exports = router