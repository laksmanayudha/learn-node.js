const UserModel = require("../../models/mongodb/user/user");
const JWT = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SecretKey);

exports.all =  async (req, res) => {
    await UserModel.find().then(response => {
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


exports.create = async (req, res) => {

    if( !req.body ){
        res.send(400);
    }

    let dataUser = await UserModel.findOne({"username": req.body.username}).then(response => response).catch(err => false)

    if( dataUser ){
        res.send({
            message: `Failed ot create data`,
            statusCode: 500
        })
    }else{
        // insert new schema Db
        const newUser = new UserModel({
            username: req.body.username,
            password: cryptr.encrypt(req.body.password),
            fullname: req.body.fullname,
            email: req.body.email,
            age: req.body.age,
            description: req.body.description
        })

        let createData = await newUser.save(newUser)

        if ( createData ){
            res.send({
                message: `Successfull to create data`,
                statusCode: 200,
            })
        }else{
            res.send({
                message: `Failed to create data`,
                statusCode: 500
            })
        }
    }
    

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

exports.login = async (req, res) => {
    let dataUser = await UserModel.findOne({"username": req.body.username}).then(response => response).catch(err => false)
    if ( !dataUser ){
        res.send({
            message: `Data not found`,
            statusCode: 400
        })
    }else{
        let password = cryptr.decrypt(dataUser.password);
        if ( password != req.body.password ){
            res.send({
                message: `Wrong username or password`,
                statusCode: 400
            })
        }else{
            let createToken = JWT.sign(
                {UID: dataUser._id, username: dataUser.username, email: dataUser.email},
                process.env.SecretKey,
                { expiresIn: '1h' }
            )

            let dataPassing = {
                Username: dataUser.username,
                Fullname: dataUser.fullname,
                Email: dataUser.email,
                TokenType: 'Bearer',
                Token: createToken
            }

            res.send({
                message: `success login`,
                statusCode: 200,
                results: dataPassing
            })
        }
    }
}