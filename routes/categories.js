const express = require('express');
const path = require('path');
const router = express.Router();

const categories = require(path.join(__dirname,"../model/Category"));
const products = require(path.join(__dirname,"../model/Product"));

router.get('/new', (req, res) => {
    res.render('categoryForm.pug', { title: ["Créer un rayon"]});
});

router.get('/', async(req, res) => {
    res.render('categories.pug', { title: ["Rayons"], categories: await categories.getAll()});
});

router.get('/:id', async(req, res) => {
    let category = await categories.getById(req.params.id);
    res.render('category.pug', { title: "Produits du rayon " +category[0].name, products: await products.getByCategory(req.params.id), categoryId: req.params.id});
}); //TODO Vérifier l'utilité du category[0]<-- avant .name

router.get('/:id/update', (req, res) => {
    res.render('categoryForm.pug', { title: ["Modifier le rayon "+categories.getById(req.params.id).name], item: categories.getById(req.params.id)});
});

router.get('/:id/delete', (req, res) => {
    res.render('categoryDelete.pug', { title: ["Suppression du rayon"], name: categories.getById(req.params.id).name});
});

module.exports = router;
