var express = require('express');
var router = express.Router();

var aes256 = require('aes256');

var card = require('../models/cards');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',message: "",messageSuccessPay:"",messageErrorPay: "" });
});

router.post('/addcard',function(req,res,next){
    var key = 'jkgjdubemnvbx856JHGJEYGRJHSBeyurqgfbshjgfwe638846';
    var data = new card({
        number: aes256.encrypt(key ,req.body.cardno),
        cvc: aes256.encrypt(key , req.body.cardcvc),
        doe : aes256.encrypt(key , req.body.carddoe)
    });
    data.save(function (err, success) {
        if (err) {
            throw err;
        }
        else {
            res.render('index', { title: 'Express',message: "Card added successfully",messageSuccessPay:"",messageErrorPay: "" });
        }
    });
});

router.post('/verifyTransaction',function(req,res,next){
    var key = 'jkgjdubemnvbx856JHGJEYGRJHSBeyurqgfbshjgfwe638846';
    console.log(req.body);
    card.find({},function(err,doc){
        if(err)
            throw err;
        else{
            for(var i=0;i< doc.length;i++){
                if(aes256.decrypt(key,doc[i].number) === req.body.cardno){
                    var j=0,categoryFound = 0;
                    while(doc[i].domain[j]){
                        if(doc[i].domain[j] ===  req.body.category){
                            console.log(doc[i].domain[j]);
                            categoryFound = 1;
                            break;
                        }
                        j++;
                    }
                    break;
                }
            }
            if(categoryFound)
                res.render('index',{title:"Payment Successful",messageSuccessPay : "Payment is valid.",messageErrorPay:"",message:""})
            else
                res.render('index',{
                    title:"Payment Successful",
                    messageErrorPay : "Payment is Invalid.",
                    messageSuccessPay:"",
                    message:""
                })
        }
    })
})
module.exports = router;
