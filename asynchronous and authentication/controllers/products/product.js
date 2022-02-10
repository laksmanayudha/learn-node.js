const ProductModel = require("../../models/mongodb/products/product");
const JWT = require("jsonwebtoken");
const JWTModule = require("../../module/JWTCheck")

exports.all = async (req, res) => {

    // check authorization
    if( !req.headers.authorization ){
        res.send(400)
    }

    let Token = await JWTModule.JWTVerify(req.headers)
    if ( !Token ){
        res.send(403)
    }else{
        await ProductModel.find().then(response => {
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
}


exports.create = (req, res) => {
    // insert new schema Db
    const newProduct = new ProductModel({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    })

    newProduct.save(newProduct).then(response => {
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
    ProductModel.findOne({"_id": req.params.id}).then(response => {
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

    // validasi data yang dikirimkan
    // let dataUpdate = {}
    // if(req.body.title) dataUpdate.title = req.body.title
    // if(req.body.description) dataUpdate.description = req.body.description
    // if(req.body.price) dataUpdate.price = req.body.price

    ProductModel.updateOne({"_id": req.params.id}, req.body).then(response => {
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
        ProductModel.deleteOne({"_id": req.body.id}).then(response => {
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

exports.getProducyByUser = (req, res) => {
    
}