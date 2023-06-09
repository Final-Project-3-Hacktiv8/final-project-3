
require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const userRouter = require('./routers/userRouters');
const categoryRouter = require('./routers/categoryRouters');
const productRouter = require('./routers/productRouters');
const transactionRouter = require('./routers/transactionRouters');
const env = process.env.NODE_ENV || 'development';

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req,res) => {
    res.sendFile(__dirname+'/index.html');
})

app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);

app.use('/transactions', transactionRouter);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})