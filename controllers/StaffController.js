const {InvalidBody} = require('../errors')
const User = require('../models/staff')
const employees = require('../database/employees')
const bcrypt = require('bcrypt')

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
},
async updatePassword(req, res, next) {
  const email = req.body.email
  console.log(email)
  try {
      const { newPassword } = req.body
      console.log(newPassword)
      if (!email || !newPassword) {
          throw new InvalidBody()
      } else {
          const newPassHash = bcrypt.hashSync(newPassword, 10)
          const newPass = await User.findOne({ where: { email } })
          newPass.password = newPassHash
          await newPass.save()
          res.send({ msg: "Password updated successfully!" })
      }
  } catch (error) { next(error) }
}

}