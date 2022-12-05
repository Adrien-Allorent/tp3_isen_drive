const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
const debug = require('debug')('http');

require('dotenv').config();

app.use(morgan('tiny'));
app.use(express.static("public"));

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'pug');

const indexRouter = require(path.join(__dirname,"routes/index"));
const categoryRouter = require(path.join(__dirname,"routes/categories"));
const productRouter = require(path.join(__dirname,"routes/products"));
app.use("/", indexRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);


app.listen(process.env.PORT, () => {debug(`Listening on port ${process.env.PORT}`);});