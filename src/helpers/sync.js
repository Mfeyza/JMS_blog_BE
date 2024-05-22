"use strict"

// sync():

module.exports = async function () {

    // return null;

    /* REMOVE DATABASE */
    const { mongoose } = require('../configs/dbConnection')
    await mongoose.connection.dropDatabase()
    console.log('- Database and all data DELETED!')

    const User = require('../models/user')

    await User.create({
        "_id": "65343222b67e9681f937f001",
        "username": "mfy",
        "password": "mfy123??",
        "email": "admin@admin.com",
        "firstName": "Feyza",
        "lastName": "Yıldırım",
        "isActive": true,
        "isAdmin": true,
        "image": "https://miro.medium.com/v2/resize:fill:176:176/1*dyBmv_heU2KI6x-ayRUDuQ@2x.jpeg",
        "city": "İzmir",
        "bio": "FullStack Developer"
    })

  
    console.log('* Synchronized.')
}