const router = require('express').Router()
const { Op } = require('sequelize')

const { tokenExtractor } = require('../util/middleware')
const { Note, User, Topic, Bookmark } = require('../models')
const { sequelize } = require('sequelize')

router.get('/', async (req, res) => {
    const bookmarks = await Bookmark.findAll({
        attributes: { exclude: ['userId'] },
        include: [{
            model: User,
            attributes: ['username']
        }, {
            model: Note,
            attributes: { exclude: ['userId', 'topicId'] },
            include: [{
                model: User,
                attributes: ['username']
            }, {
                model: Topic,
                attributes: ['name']
            }],
        }]
    })
    res.json(bookmarks)
})

router.post('/', tokenExtractor, async (req, res) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const bookmark = await Bookmark.create({ ...req.body, userId: user.id })
        res.json(bookmark)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error })
    }
})

const bookmarkFinder = async (req, res, next) => {
    req.bookmark = await Bookmark.findByPk(req.params.id)
    next()
}

router.get('/:id', bookmarkFinder, async (req, res) => {
    if (req.bookmark) {
        res.json(req.bookmark)
    } else {
        res.status(404).end()
    }
})

router.delete('/:id', tokenExtractor, bookmarkFinder, async (req, res) => {
    if (req.bookmark) {
        await req.bookmark.destroy()
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