class WebError extends Error{}

class InvalidBody extends WebError{
    constructor(fields){
        super()
        this.fields = fields
        this.message = `Invalid body, required field: ${this.fields.join(", ")}`
        this.errorCode = 400
    }
}

class InvalidCredentials extends WebError{
    constructor(){
        super()
        this.message = `Invalid credentials`
        this.errorCode = 403
    }
}
class Unauthorized extends WebError{
    constructor(){
        super()
        this.message = `Unauthorized`
        this.errorCode = 401
    }
}
class TokenExpired extends WebError{
    constructor(){
        super()
        this.message = `Token expired`
        this.errorCode = 403
    }
}

module.exports = {
    WebError,
    InvalidBody,
    InvalidCredentials,
    Unauthorized,
    TokenExpired
}