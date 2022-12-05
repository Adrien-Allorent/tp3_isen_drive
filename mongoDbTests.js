const { MongoClient, ObjectID} = require('mongodb');
require('dotenv').config()
const debug = require('debug')('http');
const url = process.env.MONGODB_URI;
const dbName = "isen_drive";
const client = new MongoClient(url);

async function main(){
    await client.connect();
    debug(`Connected successfully to MongoDB server: ${url}`);

    return await getCategories(dbName);
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());

async function getCategories(dbName){
    const db = client.db(dbName);
    let categoriesCollection = db.collection('categories');
    let productsCollection = db.collection('products');
    let categories = await categoriesCollection.find({}).toArray();
    let products = await productsCollection.find({}).toArray();

    let category_id = []; //id_list for categories
    let size_in_category = [];
    categories.forEach(category => {category_id.push(category._id.toString());});
    // À la fin du forEach, on obtient le tableau des id des catégories.

    for(let id in category_id){
        size_in_category[id] = await productsCollection.count({categoryId: new ObjectID(category_id[id])});
    }

    categories.forEach((category, index) => {
        category.size = size_in_category[index];
    })
    return categories;
}