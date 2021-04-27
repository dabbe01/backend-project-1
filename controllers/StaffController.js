const {InvalidBody} = require('../errors')
const User = require('../models/staff')
const employees = require('../database/employees')

module.exports = {
  staffMembers(req, res, next) {
    employees.forEach(async emp => {
      try {
        let { email, password } = emp
        if (!email || !password) {
          throw new InvalidBody(['email', 'password'])
        }
        await User.create({ email, password, })
        res.end()
      } catch (error) {
        next(error)
      }
    })
  },

  async login(req,res,next){
      try {
        const { email, password } = req.body
      const token = await User.authenticate(email,password)
      res.json({token, email})
    }catch(error){next(error)}
 
},

me(req,res, next){
  const {user} = req.user
  res.json({user})
}
}

