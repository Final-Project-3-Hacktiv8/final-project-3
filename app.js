const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
const userRouter = require('./routers/userRouters');
const categoryRouter = require('./routers/categoryRouters');
const productRouter = require('./routers/productRouters');
const transactionRouter = require('./routers/transactionRouters');


app.get('/', (req,res) => {
    res.send('Hello World!')
})

app.use('/users', userRouter);
app.use('/categories', categoryRouter);
app.use('/products', productRouter);

app.use('/transactions', transactionRouter);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})