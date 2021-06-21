const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const hostname = 'localhost';
const port = 3001;



app.use(cors());
mongoose.connect('mongodb://localhost/signup', {useNewUrlParser: true});

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.post('/signup',function(req,res){
  var firstname  = req.body.firstname;
  var email = req.body.email;
  var password = req.body.password;
  var mobile = req.body.mobile;
  var address= req.body.address;



  var SignUpSchema = mongoose.Schema({
    firstname : String,
    email : String,
    password :String,
    mobile : Number,
    address : String
  });

  // compile schema to model
  var User = mongoose.model('User', SignUpSchema, 'user');

  // a document instance
  var User1 = new User({ firstname : firstname, email : email, password :password, mobile : mobile, address:address});
  
  console.log(User1);

  // save model to database
  User1.save(function (err, data) {
    if (err) {
      res.send({status:0,result:err});
    }else{
      res.send({status:1,result:data});
    }
    
  });
})



app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});