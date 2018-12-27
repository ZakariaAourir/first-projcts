const express = require('express');
const router = express.Router();

const Article = require('../models/article.js');

router.get('/', (req, res, next) => {
  Article.getArticles((err, articles) => {
    if(err){
      res.send(err);
    }else{
      res.render('articles' ,{
        title:'Articles',
        articles:articles
      });
    }
  });
});
router.get('/show/:id', (req, res, next) => {
  Article.getArticleById(req.params.id, (err, article) => {
    if(err){
      res.send(err);
    }else{
      res.render('article' ,{
        title:'Article',
        article:article
      });
    }
  });
});


router.get('/category/:category_id', (req, res, next) => {
  Article.getCategoryArticles(req.params.category_id, (err, articles) => {
    if(err){
      res.send(err);
    }else{
      Category.getCategoryById(req.params.category_id, (err, category) => {
        res.render('articles' ,{
          title:category.title+' Articles',
          articles: articles
        });
      });
    }
  });

});
// post : add article
router.post('/add' ,(req, res, next) => {
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('author', 'Author is required').notEmpty();
  req.checkBody('body', 'Body is required').notEmpty();

  let errors = req.validationErrors();
  if(errors){
    Category.getCategories((err, categories) => {
      res.render('add_article', {
        errors : errors,
        title : 'Create Article',
        categories : categories
      });
    });
  }else{
    let article = new Article();
    article.title = req.body.title;
    article.subtitle = req.body.subtitle;
    article.category = req.body.category;
    article.author = req.body.author;
    article.body = req.body.body;
    Article.addArticle(article, (err, article) => {
      if(err){
        res.send(err);
      }
      req.flash('success', 'Article added');
      res.redirect('/manage/articles');
    });
  }
});

// post edit article : POST
router.post('/edit/:id', (req, res, next) => {
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('author', 'Author is required').notEmpty();
  req.checkBody('body', 'Body is required').notEmpty();

  let errors = req.validationErrors();
  if(errors){
    Category.getCategories((err, categories) => {
      res.render('edit_article', {
        errors : errors,
        title : 'Edit Article',
        categories : categories
      });
    });
  }else{
    let article = new Article();
    const query = {_id: req.params.id};
    const update = {
      title:req.body.title,
      subtitle:req.body.subtitle,
      category :req.body.category,
      author :req.body.author,
      body: req.body.body
    };
    Article.updateArticle(query, update, {}, (err, article) => {
      if(err){
        res.send(err);
      }
      req.flash('success', 'Article updated');
      res.redirect('/manage/articles');
    });
  }

});
// delete article - DELETE
router.delete('/delete/:id', (req, res, next) => {
  const query = {_id: req.params.id};
  Article.removeArticle(query, (err, article) => {
    if(err){
      res.send(err);
    }
    res.status(200);
  });
});
// add comment
router.post('/comments/add/:id', (req, res, next) => {
  req.checkBody('comment_subject', 'subject is required').notEmpty();
  req.checkBody('comment_author', 'Author is required').notEmpty();
  req.checkBody('comment_body', 'Body is required').notEmpty();
  let errors = req.validationErrors();
  if(errors){
    Article.getArticleById(req.params.id, (err, article) => {
      if(err){
        res.send(err);
      }else{
        res.render('article' ,{
          title:'Article',
          article:article,
          errors: errors
        });
      }
    });
}else{
  let article = new Article();
  let query = {_id: req.params.id};
  let comment = {
    comment_subject : req.body.comment_subject,
    comment_author : req.body.comment_author,
    comment_email : req.body.comment_email,
    comment_body : req.body.comment_body,
  }
  Article.addComment(query, comment, (err, article) => {
    res.redirect('/articles/show/'+req.params.id);
  });
}
});


module.exports = router;
