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

dotenv.config({path: "./config/config.env"});
// console.log(process.env)

// mongoDB
const connectDB = require("./models/mongodb/connection");
connectDB()
const product = require("./models/mongodb/products/product");
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

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${ PORT }`)
});