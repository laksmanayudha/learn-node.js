const express = require('express');
const dotenv = require('dotenv');
const app = express();
const PORT = 3000;

const data = [
    {name: "Galactus la parte 1", img: "images-products-2product1.jpg"},
    {name: "Galactus la parte 2", img: "images-products-2product1.jpg"},
    {name: "Galactus la parte 3", img: "images-products-3.jpngpg"},
    {name: "Galactus la parte 4", img: "images-products-4.png"},
    {name: "Galactus la parte 5", img: "images-products-5.png"},
    {name: "Galactus la parte 6", img: "images-products-6.png"},
    {name: "Galactus la parte 7", img: "images-products-7.png"},
    {name: "Galactus la parte 8", img: "images-products-8.png"},
    {name: "Galactus la parte 9", img: "images-products-9.png"}
]

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

dotenv.config({path: "./config/config.env"});
// console.log(process.env)

// mongoDB
const connectDB = require("./models/mongodb/connection");
connectDB()
const product = require("./models/mongodb/products/product");
const user = require("./models/mongodb/user/user");
console.log(product)


app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/products', (req, res) => {
    res.render('products', {data});
})

app.get('/detail', (req, res) => {
    res.render('detail')
})

// API
app.get('/product/api/all', (req, res) => {
    res.send('ok')
})

app.post('/product/api/create', (req, res) => {
    console.log(req.body)
    const newProd = new product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    })

    newProd.save(newProd).then(response => {
        console.log(response)
        res.send({
            statusCode:200,
            message:"successfull to post"
        })
    }).catch(err => {
        console.log(err)
    })
})

// Username, Password, Fullname, Email, Age, Description
app.get('/user/api/all', (req, res) => {
    user.find().then(response => {
        res.send({
            message: `Successfull to get data`,
            statusCode: 200,
            results: response
        })
    }).catch(err => {
        res.send({
            message: `Failed to get data`,
            statusCode: 500,
        })
    })
})

app.post('/user/api/create', (req, res) => {
    console.log(req.body)
    const newUser = new user({
        username: req.body.username,
        password: req.body.password,
        fullname: req.body.fullname,
        email: req.body.email,
        age: req.body.age,
        description: req.body.description,
    })

    newUser.save(newUser).then(response => {
        console.log(response)
        res.send({
            statusCode:200,
            message:"successfull to post"
        })
    }).catch(err => {
        console.log(err)
    })
})

app.put('/user/api/update/:id', (req, res) => {
    const id = req.params.id

    
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${ PORT }`)
});