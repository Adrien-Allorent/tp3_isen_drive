const express = require('express');
const path = require('path');
const router = express.Router();

const categories = require(path.join(__dirname,"../model/Category"));
const products = require(path.join(__dirname,"../model/Product"));

router.get('/new', (req, res) => {
    res.render('productForm.pug', { title: ["Créer un produit"], categories: categories.getAll()});
});

router.get('/:id', (req, res) => {
    const id_product = req.params.id;
    const product = products.getAll()[id_product-1];
    res.render('product.pug', { title: product.name, product: product, category: categories.getById(product.categoryId).name});
});

router.get('/:id/update', (req, res) => {
    let product = products.getAll()[req.params.id-1];
    res.render('productForm.pug', { title: ["Modifier le produit "+product.name], categories: categories.getAll(), item: product});
});

router.get('/:id/delete', (req, res) => {
    res.render('productDelete.pug', { title: ["Suppression du produit"], name: products.getAll()[req.params.id-1].name});
});


module.exports = router;
