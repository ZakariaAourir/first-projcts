const express = require('express');
const router = express.Router();

Category = require('../models/category.js');

router.get('/', (req, res, next) => {
  Category.getCategories((error, categories) =>{
    console.log(categories);
    if(error){
      res.send(error);
    }
    res.render('categories' ,{
      title:'Categories',
      categories : categories
    });

  });
});

// add category post
router.post('/add', (req, res, next) => {
  req.checkBody('title', 'Title is required').notEmpty();
  let errors = req.validationErrors();
  if(errors){
    res.render('add_category', {
      errors : errors,
    })
  }else{
    let category = new Category();
    category.title = req.body.title;
    category.description = req.body.description;

    Category.addCategory(category, (err, category) => {
      console.log(category);
      if(err){
        res.send(err);
      }
      req.flash('success', 'Category saved');
      res.redirect('/manage/categories');
    });
  }
});

// edit category post
router.post('/edit/:id', (req, res, next) => {
  req.checkBody('title', 'Title is required').notEmpty();
  let errors = req.validationErrors();
  if(errors){
    res.render('edit_category', {
      errors: errors,
      title : 'Edit Categories'
    });
  }else{
    let category = new Category();
    const query = {_id: req.params.id};
    const update = {title:req.body.title, description:req.body.description};
    Category.updateCategory(query, update, {}, (err, category) => {
      if(err){
        res.send(err);
      }
      req.flash('success', 'Category updated');
      res.redirect('/manage/categories');
    });
  }
});

// delete category - DELETE
router.delete('/delete/:id', (req, res, next) => {
  const query = {_id: req.params.id};
  Category.removeCategory(query, (err, category) => {
    if(err){
      res.send(err);
    }
    res.status(200);
  });
});
module.exports = router;
