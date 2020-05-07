const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(" ")[1]
    const decodedToken = jwt.verify(token, "secret")
    req.userData = {email: decodedToken.email, userId: decodedToken.userId} // we can add any data to req, in check-auth middlware
    next()
  }catch(error) {
    res.status(401).json({message: "auth failed"})
  }
}
