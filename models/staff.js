const db = require('../database/connection')
const {DataTypes} = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {InvalidCredentials, TokenExpired, Unauthorized} = require('../errors')

const User = db.define('Staff', {
    id:{
        type: DataTypes.INTEGER,
       autoIncrement: true,
       primaryKey: true
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'Email already exists'
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

User.beforeCreate((staff, options) =>{
    staff.password = bcrypt.hashSync(staff.password, 10) 
})

User.authenticate = async (email, password) =>{
    const staff = await User.findOne({where: {email}})
    if(!staff){throw InvalidCredentials()}
    const passwordMatch = bcrypt.compareSync(password, staff.password)
    if(passwordMatch){
        const payload = {id: staff.id, email: staff.email}
        return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'})
    }else{
        throw new InvalidCredentials()
    }
}

User.validateToken = (token) =>{
    try{
        return jwt.verify(token, process.env.JWT_SECRET)
    }catch(error){
        if(error instanceof jwt.tokenExpiredError){
            throw new TokenExpired()
        }else if (error instanceof jwt.JsonWebTokenError){
            throw new Unauthorized()
        }else{
            throw err
        }
    }
}

module.exports = User