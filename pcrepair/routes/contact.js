var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

router.get('/', function(req, res, next) {
  res.render('contact', {
     title: 'Contact'
   });
});
//send Email
router.post('/send',function(req,res,next){
  var transporter  = nodemailer.createTransport({
    service:"Gmail",
    auth:{
      user:'zakaria1997aourir@gmail.com',
      pass:'zakaria1234567'
    }
  });

  var mailOptions = {
    from:'"Zakaria Aourir" <zakaria1997aourir@gmail.com>',
    to:'zakaria1997aourir@hotmail.com',
    subject:"hello from pc repair",
    text:'you have a submission from... Name: '+req.body.name+' Email: '+req.body.email+'Message: '+req.body.message+'',
    html:'<p>you have a submission from...</p> <ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
  }
  transporter.sendMail(mailOptions,function(error,info){
    if(error){
      return console.log(error);
    }
    console.log('message sent'+info.response);
    res.redirect('/');
  });

});



module.exports = router;
