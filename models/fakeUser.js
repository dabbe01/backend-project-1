const faker = require('faker')


class fakeUser{
    constructor(name, adress, work, image){
        this.name = faker.name.findName()
        this.adress = faker.address.streetAddress()
        this.work = faker.name.jobTitle()
        this.image = faker.image.avatar()
        this.trait = "My favorite color is " + faker.commerce.color() + " " + "and I also drive a " + faker.vehicle.vehicle()
    }
}


module.exports = {
    fakeUser,
   
}