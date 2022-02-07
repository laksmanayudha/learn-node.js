const express = require("express");
const routes = express.Router();

// panggil file controllers
const ProductControllers = require('../controllers/products/productView');
const ProductAPIControllers = require("../controllers/products/product");
const UserAPIControllers = require("../controllers/users/user");
const FormControllers = require("../controllers/form/form");


// homepages
routes.get("/", (req, res) => {
    res.render("index");
});

routes.get("/product", ProductControllers.mainProduct)
routes.get("/product/detail", ProductControllers.detailProduct)

// form page
routes.get('/form', FormControllers.formView);
routes.post('/form/post', FormControllers.create);

// API products
routes.get("/product/api/all", ProductAPIControllers.all);
routes.get("/product/api/findOne/:id", ProductAPIControllers.findOne);
routes.put("/product/api/update/:id", ProductAPIControllers.updateOne);
routes.post("/product/api/create", ProductAPIControllers.create);
routes.post("/product/api/delete", ProductAPIControllers.delete);

// API users
routes.get("/user/api/all", UserAPIControllers.all);
routes.get("/user/api/findOne/:id", UserAPIControllers.findOne);
routes.put("/user/api/update/:id", UserAPIControllers.updateOne);
routes.post("/user/api/create", UserAPIControllers.create);
routes.post("/user/api/delete", UserAPIControllers.delete);


module.exports = routes