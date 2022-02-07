const express = require('express');
const dotenv = require('dotenv');
const app = express();
const PORT = 3000;

// setting nodejs environtment
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
dotenv.config({path: "./config/config.env"});
// console.log(process.env)

// connect to mongoDB database
const connectDB = require("./models/mongodb/connection");
connectDB()

// user express endpoint
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${ PORT }`)
});


// routing
const routing = require("./routes/routes");
app.use(routing);