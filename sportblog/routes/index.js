const express = require('express');
const router = express.Router();

const Article = require('../models/article.js');

router.get('/', (req, res, next) => {
  Article.getArticles((err, articles) => {
    if(err){
      res.send(err);
    }else{
      res.render('index' ,{
        title:'Index',
        articles:articles
      });
    }
  });

});

module.exports = router;
