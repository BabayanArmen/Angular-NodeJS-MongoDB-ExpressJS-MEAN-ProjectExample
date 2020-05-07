const Post = require('../models/post')

exports.getPosts = async (req, res, next) => {
  // //version 1 (old one)
  //   Post.find().then((document) => {
  //     console.log(document)
  //     res.status(200).json(document)
  // })

  // //version 2 (new one)

  try{
     const posts =  await Post.find()
     res.status(200).json(posts)
  }catch(e) {
    console.log(e)
  }
}

exports.createPost = async (req, res, next) => {
  // console.log(req.userData.userId)
  // console.log(req.body.creator)
  const post = await new Post({
    title: req.body.title,
    content: req.body.content,
    // creator: req.userData.userId    // this is comming from token that coming back from frontend form check-auth middlware
    creator: req.body.creator
  })
  try{
    await post.save()
    res.status(201).json({
      message: "post added successfuly",
      postId: post._id
    })
  }catch(e){
    console.log(e)
  }
}

exports.removePost = async (req, res, next) => {
   // //new version
  try{
    const result = await Post.deleteOne({_id: req.params.id})
    console.log(result)
    res.status(200).json({message: 'post deleted'})
  }catch(e) {
    console.log(e)
  }

  // //old version
  // Post.deleteOne({_id: req.params.id}).then((result) => {
  //   console.log(result)
  //   res.status(200).json({message: "post deleted"})
  // })

}

exports.updatePost = async (req, res) => {
  const post = new Post({
    _id: req.body._id,
    title: req.body.title,
    content: req.body.content,
  })
  const result = await Post.updateOne({ _id: req.params.id }, post)
  console.log(result)
  res.status(200).json({message: "update successufll"})
}
