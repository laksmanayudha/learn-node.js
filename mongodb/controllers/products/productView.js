const axios = require('axios');

const data = [
    {name: "Galactus la parte 1", img: "images-products-2product1.jpg"},
    {name: "Galactus la parte 2", img: "images-products-2product1.jpg"},
    {name: "Galactus la parte 3", img: "images-products-3.png"},
    {name: "Galactus la parte 4", img: "images-products-4.png"},
    {name: "Galactus la parte 5", img: "images-products-5.png"},
    {name: "Galactus la parte 6", img: "images-products-6.png"},
    {name: "Galactus la parte 7", img: "images-products-7.png"},
    {name: "Galactus la parte 8", img: "images-products-8.png"},
    {name: "Galactus la parte 9", img: "images-products-9.png"}
]

const mainProduct = (req, res) => {
    res.render('product/products', {data})
}

const detailProduct = (req, res) => {
    // let dataObject = {
    //     message: `successfull to get data`,
    //     statusCode: 200,
    //     result: [
    //         { name: 'chondro' },
    //         { name: 'sima' },
    //         { name: 'joshua' },
    //         { name: 'ihza' }
    //     ]
    // }
    // res.send(dataObject)

    res.render("product/detail")
}

exports.mainProduct = mainProduct;
exports.detailProduct = detailProduct;