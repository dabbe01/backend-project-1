const {InvalidBody} = require('../errors')
const { fakeUser} = require('../models/fakeUser')

module.exports ={
        register(req,res,next){
        try {
            const user = {name, adress, work, image, trait} = new fakeUser()
            if (!name || !adress || !work || !image || !trait) {
                throw new InvalidBody(['name', 'adress', 'work', 'image', 'trait'])
              }
              res.json({user: user})
        } catch (error) {next(err)}
    }
}