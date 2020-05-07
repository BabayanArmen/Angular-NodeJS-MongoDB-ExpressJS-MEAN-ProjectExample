const express =  require('express')
const router = express.Router()
const postsContorller = require('../contorllers/posts')
const checkAuth = require('../middleware/check-auth')

//localhost:3000/api/posts
router.get('', postsContorller.getPosts)

//localhost:3000/api/posts
router.post('', checkAuth, postsContorller.createPost)

//localhost:3000/api/posts/:id
router.delete('/:id', checkAuth, postsContorller.removePost)

//localhost:3000/api/posts/:id
router.put('/:id', checkAuth, postsContorller.updatePost)

module.exports = router
