const db = require('./connection')
const User = require('../models/staff')
const fakeUsers  = require('../models/fakeUser')

db.sync()