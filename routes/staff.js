const {Router} = require('express')

const throttle  = require('express-throttle')
const router = new Router()
const StaffController = require('../controllers/StaffController')
const GenController = require('../controllers/genController')
const Auth = require('../middleware/auth')

router.post('/staff', StaffController.staffMembers)
router.post('/login', StaffController.login)
router.post('/register',  Auth.user, throttle({"burst": 10, "period": "24h"}), GenController.register )
router.get('/me', Auth.user, StaffController.me )

module.exports = router