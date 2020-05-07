const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res, next) => {
  const userExist = await User.findOne({email: req.body.email})
  if(userExist){
    res.status(200).json({
      message: "User with this email exist, please try another email !!!",
      status: false
    })
  }
  else {
      const hash = await bcrypt.hash(req.body.password, 10)   // 10 is salt
          const user = new User({
            status: 'user',
            username: req.body.username,
            email: req.body.email,
            password: hash
          })
          try{
            await user.save()
            res.status(201).json({
              message: "User Created",
              status: true
            })
          }catch(e) {
            res.status(500).json({
              error: e
            })
          }
      }
  }

  exports.userLogin = async (req, res, next) => {
    const user = await User.findOne({email: req.body.email})
    if(user) {
     const result = await bcrypt.compare(req.body.password, user.password)
      if(result){
        // creating token
        const token = jwt.sign({email: user.email, userId: user._id}, 'secret', {expiresIn: "1h"})
        res.status(200).json({token, message:'Login Successfull', status: user.status, expiresIn: 3600, userID: user._id, userName: user.username})
      } else { res.status(200).json({message: "Wrong Password"}) }
    } else{ res.status(200).json({message: "User Don't Exist"}) }
  }
