const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/products', (req, res) => {
    res.render('products');
})

app.get('/detail', (req, res) => {
    res.render('detail')
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${ PORT }`)
});