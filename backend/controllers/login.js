const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')

router.post('/', async (request, response) => {

	const { username, password } = request.body

	const user = await User.findOne({
		where: {
			username: username
		}
	})

	const passwordCorrect = user === null
		? false
		: await bcrypt.compare(password, user.password_hash)

	if (!(user && passwordCorrect)) {
		return response.status(401).json({
			error: 'invalid username or password'
		})
	}

	const userForToken = {
		username: user.username,
		id: user.id,
	}

	if (user.disabled) {
		return response.status(401).json({
			error: 'account disabled, please contact admin'
		})
	}

	const token = jwt.sign(userForToken, SECRET)

	response
		.status(200)
		.send({ id: user.id, name: user.name, username: user.username, token })
})

module.exports = router 