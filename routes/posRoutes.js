const express=require('express')
const isLoggedIn = require('../middlewares/isLoggedIn')
const router=express.Router()

const {createPost,getMyPost,deletePost,allPost,getMyPostById}=require('../controllers/postController')



router.get('/getpost',isLoggedIn,getMyPost)
router.get('/getpost/:id',getMyPostById)
router.delete('/deletepost/:id/uploads/:imageid',isLoggedIn,deletePost)
router.get('/allpost',allPost)

module.exports=router