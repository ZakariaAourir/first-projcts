const express = require('express');
const router = express.Router();

const Category = require('../models/category.js');
const Article = require('../models/article.js');
// get articles - GET
router.get('/articles', (req, res, next) => {
  Article.getArticles((err, articles) => {
    if(err){
      res.send(err);
    }
    res.render('manage_articles' ,{
      title: 'Manage Articles',
      articles : articles
    });
  });

});

// get categories
router.get('/categories', (req, res, next) => {
  Category.getCategories((error, categories) =>{
    if(error){
      res.send(error);
    }
    res.render('manage_categories' ,{
      title:'Categories',
      categories:categories
    });
  });
});
// add article
router.get('/articles/add', (req, res, next) => {
  Category.getCategories((err, categories) => {
    if(err){
      res.send(err)
    }
    res.render('add_article', {
      title: 'Create Article',
      categories : categories
    });
  })

});

router.get('/categories/add', (req, res, next) => {
  res.render('add_category', {title: 'Create Category'});
});

// get article
router.get('/articles/edit/:id', (req, res, next) => {
  Article.getArticleById(req.params.id, (err, article) => {
    if(err){
      res.send(err);
    }
    Category.getCategories((err, categories) => {
      res.render('edit_article', {
        title: 'Edit Article',
        article : article,
        categories : categories
      });
    });
  });
});
// get categories
router.get('/categories/edit/:id', (req, res, next) => {
  Category.getCategoryById(req.params.id, (err, category) => {
    if(err){
      res.send(err);
    }
    res.render('edit_category', {
      title: 'Edit Categories',
      category:category
    });
  });

});

module.exports = router;
