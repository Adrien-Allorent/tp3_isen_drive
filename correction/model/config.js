const args = process.argv.slice(2);

module.exports = {
    url : args[0] ?? 'mongodb://localhost:27017',
    dbName : args[1] ?? "isen_drive",
    categoriesCollectionName : "categories",
    productsCollectionName : "products"
}
