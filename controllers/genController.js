const {InvalidBody} = require('../errors')
const { fakeUser} = require('../models/fakeUser')

module.exports ={
        register(req,res,next){
        try {
            const user = {name, adress, work, image} = new fakeUser()
            if (!name || !adress || !work || !image) {
                throw new InvalidBody(['name', 'adress', 'work', 'image'])
              }
              res.json({user: user})
        } catch (error) {next(err)}
    }
}