const UserModel = require("../../models/mongodb/user/user");

exports.all = (req, res) => {
    UserModel.find().then(response => {
        res.send({
            message: `Successfull to get data`,
            statusCode: 200,
            result: response
        })
    }).catch(err => {
        res.send({
            message: `fail to get data`,
            statusCode: 500
        })
    })
}


exports.create = (req, res) => {
    // insert new schema Db
    const newUser = new UserModel({
        username: req.body.username,
        password: req.body.password,
        fullname: req.body.fullname,
        email: req.body.email,
        age: req.body.age,
        description: req.body.description
    })

    newUser.save(newUser).then(response => {
        res.send({
            message: `Successfull to create data`,
            statusCode: 200,
            results: response
        })
    }).catch(err => {
        res.send({
            message: `Failed to create data`,
            statusCode: 500
        })
    })
}

exports.findOne = (req, res) => {
    UserModel.findOne({"_id": req.params.id}).then(response => {
        res.send({
            message: `Successfull to get data`,
            statusCode: 200,
            results: response
        })
    }).catch(err => {
        res.send({
            message: `Failed to get data`,
            statusCode: 500
        })
    })
}

exports.updateOne = (req, res) => {

    UserModel.updateOne({"_id": req.params.id}, req.body).then(response => {
        res.send({
            message: `Sucessfull to update data`,
            statusCode: 200,
            results: response
        })
    }).catch(err => {
        res.send({
            message: `Failed to update data`,
            statusCode: 500
        })
    })

}

exports.delete = (req, res) => {
    if ( !req.body ){
        res.send({
            message: `Failed to delete data`,
            statusCode: 400
        })
    }else{
        UserModel.deleteOne({"_id": req.body.id}).then(response => {
            res.send({
                message: `Successfull to delete data`,
                statusCode: 200
            })
        }).catch(err => {
            res.send({
                message: `Failed to delete data`,
                statusCode: 500
            })
        })
    }
}