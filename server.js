var express = require('express');
var bodyParser = require('body-parser')
var nodemailer = require('nodemailer');
var app = express();

app.use(bodyParser.json());
app.use(function (req, res, next) {
    //Enabling CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization');
    next();
});

var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: '',
        pass: ''
    }
});

// Routing
app.get('/send',function(req,res){

    var mailOptions={
        to : req.query.to,
        subject : req.query.subject,
        text : req.query.text
    }

    smtpTransport.sendMail(mailOptions, function(error, info){
     if(error){
        console.log(error);
     }else{
        res.status(201).json(info);
    }
});
});

var server = app.listen(8080, function() {
    var port = server.address().port;
    console.log('Express started on port', port);
});
