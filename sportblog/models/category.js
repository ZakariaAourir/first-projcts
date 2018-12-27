const mongoose = require('mongoose');

// vategory schema

const categorySchema = mongoose.Schema({
  title : {
    type : String
  },
  description : {
    type : String
  }
});
// acces from outiside the file
const Category = module.exports = mongoose.model('Category', categorySchema);

// get categories

module.exports.getCategories = function(callback, limit){
  Category.find(callback).limit(limit).sort([['title' ,'ascending']]);
}

// add a category
module.exports.addCategory = function(category, callback){
  Category.create(category, callback);
}

// get single category
module.exports.getCategoryById = function(id, callback){
  Category.findById(id, callback);
}
// update category
module.exports.updateCategory = function(query, update, options, callback){
  Category.findOneAndUpdate(query, update, options, callback);
}

// remove category

module.exports.removeCategory = function(query, callback){
  Category.remove(query, callback);
}
