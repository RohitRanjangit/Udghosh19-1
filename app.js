// ----------------- Node modules ------------

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const async=require('async');
const assert = require('assert');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// ------- Firebase settings --------------

var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");
require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyDnqgkjVefZFr-jHJqFCHkac-tGOdRwJG4",
  authDomain: "udghoshregistration.firebaseapp.com",
  databaseURL: "https://udghoshregistration.firebaseio.com",
  projectId: "udghoshregistration",
  storageBucket: "",
  messagingSenderId: "83845558524",
  appId: "1:83845558524:web:6b073349da2c723c"
};

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// we need to have a ID (unique) for adding data to the system
function writeUserData(item) {
  firebase.database().ref('users/12').set(item);
};

// we need to have a ID (unique) for adding data to the system
function udgReg(item, uid) {
  firebase.database().ref('users/' + uid).set(item);
};

// Editing rights
function regchange(item, uid) {
  firebase.database().ref('users/' + uid).update(item);
};


// this is indeed the function to retrieve the whole database
// dashretrieve();

// for login function of firebase to parse the details

// crypto module for random string gen
function encrypt(data, pass) {
  var cipher = crypto.createCipher('aes-256-ecb', pass);
  return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
};

// ---------- All setting done --------------

var udg_champ_user = ''; // U_ID for champs reg
var nossq_user = ''; // U_ID for nossq reg

// --------- app settings ---------------
var app = express();
app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var server=app.listen(app.get('port'), function(){
  console.log('Server started on port '+app.get('port'));
});

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// ---------- GET Requests --------------

// udg_champ main website
app.get('/56139fb631d586607a3841992148761f78ae3f31', function(req,res,next){
	res.render('udg_champ');
});

/*
// Google Auth Champ
app.get('/64fd5c9d28cbdc2608793d5ad3104dd6266e9d4c', function(req,res,next){
	res.render('udg_champ_google');
});

// Registration Champ
app.get('/c93307383cbd6a4ed571226b4dcb731c6127beac', function(req,res,next){
	res.render('udg_champ_form');
});
*/

// nossq main page
app.get('/e365d9caf9b7234a92d04292c74c4891befbbf25', function(req,res,next){
  res.render('nossq');
});

// nossq registration google
app.get('/8dffdd9bcfc344777ef939c39ec2b45e65c7e776', function(req,res,next){
  res.render('nossq_reg_google');
});

// nossq reg 2nd form
app.get('/8fcc8750fab35f7de4a82be2ba81e5c6df4a3ffc', function(req,res,next){
  res.render('nossq_reg_form');
});

// error
app.get('/f62045a5685c29dcc61a2cafae030a68e1389db3', function(req,res,next){
  res.render('404');
});

// brochure
app.get('/525299210b55528ffbd19b7a50a4ef386e208f9d', function(req,res,next){
  res.render('brochure');
});

// CA
app.get('/4b3cdf59227ae23ae6373b6f95f6b7a7b39baf9e', function(req,res,next){
  res.render('CA');
});

// Gallery
app.get('/5e5c68e29abed08823b94f9bf4ad5108514d5100', function(req,res,next){
  res.render('gallery');
});

// Main
app.get('/', function(req,res,next){
  res.render('index');
});

// Main form 1
app.get('/acf00010c0c607c79a42343051745191985078f2', function(req,res,next){
  res.render('index_1', {msg: ''});
});

// Main form 2
app.get('/0e684ac5327a08714ee6edccc78ebdc3937d142b', function(req,res,next){
  res.render('index_2');
});

// Pronights
app.get('/f2adfb77c515a6bd0f82cf3c65ce60654f7f81b6', function(req,res,next){
  res.render('pronights');
});

// Social
app.get('/c6e7f21e897c7313fab5bd1ed06dd234c777e179', function(req,res,next){
  res.render('social');
});

// Team
app.get('/fb250db707f26b867234c570dfe12a67b0b4d71e', function(req,res,next){
  res.render('team');
});

// Team
app.get('/dashboard', function(req,res,next){
  res.render('dashboard', {c_l_n: 'Vishal',
                           h_c: 'Agarwal',
                           p_c_n: '941',
                           a_c_n: '360',
                           c_f_n: 'IIT Kanpur',
                           e_m_i: 'example_example.com',
                           c_s: 'Kanpur(UP)',
                           p_c: '208016'});
});

// ---------- POST Requests --------------

app.post('/register', function(req,res,next){

  var item ={
    Username : req.body.name,
    Mail : req.body.mail,
    password : req.body.password1
  };

  // no time stamp for checking later
  uid = encrypt(req.body.name, req.body.password1);

  if(req.body.password1 == req.body.password2) {
    udgReg(item, uid);
    res.render('index_1', {msg: 'Sucessfully Registered'})
  }else{
    res.render('index1', {msg: 'The Passwords are different, Please try again'})
  };

});

app.post('/register_change', function(req,res,next){

  var item = {};

  if(req.body.c_l_n != ''){
    item['Contengency_Leader_Name'] = req.body.c_l_n;
  };
  if(req.body.h_c != ''){
    item['Head_Coach'] = req.body.h_c;
  };
  if(req.body.c_f_n != ''){
    item['College'] = req.body.c_f_n;
  };
  if(req.body.p_c_n != ''){
    item['Contact1'] = req.body.p_c_n;
  };
  if(req.body.a_c_n != ''){
    item['Contact2'] = req.body.a_c_n;
  };
  if(req.body.c_s != ''){
    item['City'] = req.body.c_s;
  };
  if(req.body.p_c != ''){
    item['PIN'] = req.body.p_c;
  };

  // generating user Id
  uid = encrypt(req.body.name, req.body.password);

  // making changes
  regchange(item, uid);

  firebase.database().ref('users').on('value', gotData,errData);

  function gotData(data){
    var datausers = data.val();

    // all functioning occurs here
    var userkeys = Object.keys(datausers);

    for(var i = 0; i < userkeys.length; i++){
      if(uid == userkeys[i]){
        res.render('dashboard', {c_l_n: datausers[uid]['Contengency_Leader_Name'],
                                 h_c:  datausers[uid]['Head_Coach'],
                                 p_c_n: datausers[uid]['Contact1'] ,
                                 a_c_n:  datausers[uid]['Contact2'],
                                 c_f_n:  datausers[uid]['College'],
                                 e_m_i:  datausers[uid]['Mail'],
                                 c_s:  datausers[uid]['City'],
                                 p_c:  datausers[uid]['PIN'],
                                 at: datausers[uid]['atheletics'],
                                 ba:datausers[uid]['badminton'],
                                 bb:datausers[uid]['basketball'],
                                 fb:datausers[uid]['football'],
                                 hk:datausers[uid]['hockey'],
                                 vb:datausers[uid]['volleyball'],
                                 kk:datausers[uid]['kho'],
                                 tt:datausers[uid]['tt'],
                                 lt:datausers[uid]['lawn'],
                                 sq:datausers[uid]['squash'],
                                 cs:datausers[uid]['chess'],
                                 wl:datausers[uid]['weightlifting'],
                                 pl:datausers[uid]['powerlifting'],
                                 hk:datausers[uid]['hockey'],
                                 sk: datausers[uid]['skating'],
                                 ck:datausers[uid]['cricket'],
                                 hb:datausers[uid]['handball']});
        break
      };
    }
    res.render('index_1', {msg: 'User not Found'})
    // var userkeys = Object.keys(datausers);
  };

  function errData(err){
    console.log('error recieved');
    res.render('index_1', {msg:'Please try again'});
  };

});

app.post('/events_change', function(req,res,next){
  var item = {};

  if(req.body.atheletics != ''){
    item['Atheletics'] = req.body.atheletics;
  };

  if(req.body.badminton != ''){
    item['Badminton'] = req.body.badminton;
  };

  if(req.body.football != ''){
    item['Football'] = req.body.football;
  };

  if(req.body.volleyball != ''){
    item['Volleyball'] = req.body.volleyball;
  };

  if(req.body.cricket != ''){
    item['Cricket'] = req.body.cricket;
  };

  if(req.body.skating != ''){
    item['Skating'] = req.body.skating;
  };

  if(req.body.lawn != ''){
    item['Lawn Tennis'] = req.body.lawn;
  };

  if(req.body.tt != ''){
    item['Table Tennis'] = req.body.tt;
  };

  if(req.body.squash != ''){
    item['Squash'] = req.body.squash;
  };

  if(req.body.handball != ''){
    item['Handball'] = req.body.handball;
  };

  if(req.body.powerlifting != ''){
    item['Powerlifting'] = req.body.powerlifting;
  };

  if(req.body.weightlifting != ''){
    item['Weightlifting'] = req.body.weightlifting;
  };

  if(req.body.chess != ''){
    item['Chess'] = req.body.chess;
  };

  if(req.body.hockey != ''){
    item['Hockey'] = req.body.hockey;
  };

  if(req.body.basketball != ''){
    item['Basketball'] = req.body.basketball;
  };

  if(req.body.kho != ''){
    item['Kho-Kho'] = req.body.kho;
  };

  uid = encrypt(req.body.name, req.body.password);

  regchange(item, uid);

  firebase.database().ref('users').on('value', gotData,errData);

  function gotData(data){
    var datausers = data.val();

    // all functioning occurs here
    var userkeys = Object.keys(datausers);

    for(var i = 0; i < userkeys.length; i++){
      if(uid == userkeys[i]){
        res.render('dashboard', {c_l_n: datausers[uid]['Contengency_Leader_Name'],
                                 h_c:  datausers[uid]['Head_Coach'],
                                 p_c_n: datausers[uid]['Contact1'] ,
                                 a_c_n:  datausers[uid]['Contact2'],
                                 c_f_n:  datausers[uid]['College'],
                                 e_m_i:  datausers[uid]['Mail'],
                                 c_s:  datausers[uid]['City'],
                                 p_c:  datausers[uid]['PIN'],
                                 at: datausers[uid]['Atheletics'],
                                 ba:datausers[uid]['Badminton'],
                                 bb:datausers[uid]['Basketball'],
                                 fb:datausers[uid]['Football'],
                                 hk:datausers[uid]['Hockey'],
                                 vb:datausers[uid]['Volleyball'],
                                 kk:datausers[uid]['Kho-Kho'],
                                 tt:datausers[uid]['Table Tennis'],
                                 lt:datausers[uid]['Lawn Tennis'],
                                 sq:datausers[uid]['Squash'],
                                 cs:datausers[uid]['Chess'],
                                 wl:datausers[uid]['Weightlifting'],
                                 pl:datausers[uid]['Powerlifting'],
                                 sk: datausers[uid]['Skating'],
                                 ck:datausers[uid]['Cricket'],
                                 hb:datausers[uid]['Handball']});
        break
      };
    }
    res.render('index_1', {msg: 'User not Found'})
    // var userkeys = Object.keys(datausers);
  };

  function errData(err){
    console.log('error recieved');
    res.render('index_1', {msg:'Please try again'});
  };

});

app.post('/login', function(req,res,next){
  
  // Taking inputs
  var inputusername = req.body.uname;
  var inputuserpassword = req.body.upassword;

  // generating user Id
  uid = encrypt(inputusername, inputuserpassword);

  firebase.database().ref('users').on('value', gotData,errData);

  function gotData(data){
    var datausers = data.val();

    // all functioning occurs here
    var userkeys = Object.keys(datausers);

    for(var i = 0; i < userkeys.length; i++){
      if(uid == userkeys[i]){
        res.render('dashboard', {c_l_n: datausers[uid]['Contengency_Leader_Name'],
                                 h_c:  datausers[uid]['Head_Coach'],
                                 p_c_n: datausers[uid]['Contact1'] ,
                                 a_c_n:  datausers[uid]['Contact2'],
                                 c_f_n:  datausers[uid]['College'],
                                 e_m_i:  datausers[uid]['Mail'],
                                 c_s:  datausers[uid]['City'],
                                 p_c:  datausers[uid]['PIN'],
                                 at: datausers[uid]['atheletics'],
                                 ba:datausers[uid]['badminton'],
                                 bb:datausers[uid]['basketball'],
                                 fb:datausers[uid]['football'],
                                 hk:datausers[uid]['hockey'],
                                 vb:datausers[uid]['volleyball'],
                                 kk:datausers[uid]['kho'],
                                 tt:datausers[uid]['tt'],
                                 lt:datausers[uid]['lawn'],
                                 sq:datausers[uid]['squash'],
                                 cs:datausers[uid]['chess'],
                                 wl:datausers[uid]['weightlifting'],
                                 pl:datausers[uid]['powerlifting'],
                                 hk:datausers[uid]['hockey'],
                                 sk: datausers[uid]['skating'],
                                 ck:datausers[uid]['cricket'],
                                 hb:datausers[uid]['handball']});
        break
      };
    }
    res.render('index_1', {msg: 'User not Found'})
    // var userkeys = Object.keys(datausers);
  };

  function errData(err){
    console.log('error recieved');
    res.render('index_1', {msg:'Please try again'});
  };

});


// Form requests for google first auth udg_champ
app.post('/edf4a7ba5a9d8e630d3065e26f43f565440d2f88', function(req,res,next){
  // google auth system from firebase
  // setting global value of the username
  res.redirect('/c93307383cbd6a4ed571226b4dcb731c6127beac');   //udg_champ_form
});


// Form requests for second auth udg_champ
app.post('/a7f6a539d51f059449c8c484b099cd3c36ff092e', function(req,res,next){

    var item ={
    Participant_Name : req.body.name,
    Contact_Details : req.body.phone1,
    Alter_Contact_Details : req.body.phone2,
    Contact_Mail : req.body.mail,
    City : req.body.city
  };

  writeUserData(item);

  res.redirect("/56139fb631d586607a3841992148761f78ae3f31");

});

// Form requests for google first auth udg_champ
app.post('/8dffdd9bcfc344777ef939c39ec2b45e65c7e776', function(req,res,next){
  // google auth system from firebase
  // setting global value of the username
  res.redirect('/8fcc8750fab35f7de4a82be2ba81e5c6df4a3ffc'); //nossq_2_form
});


// Form requests for second auth udg_champ
app.post('/8fcc8750fab35f7de4a82be2ba81e5c6df4a3ffc', function(req,res,next){       //nossq_2_form

    var item ={
    Participant_Name : req.body.name,
    Contact_Details : req.body.phone1,
    Alter_Contact_Details : req.body.phone2,
    Contact_Mail : req.body.mail,
    City : req.body.city
  };

  writeUserData(item);

  res.redirect("/e365d9caf9b7234a92d04292c74c4891befbbf25");    //nossq

});

// Form for main website Google

// Form requests for google first auth udg_champ
app.post('/2bceeae775c6bd6697e0756fbe8d0fb10a2ebfbf', function(req,res,next){     // register-1
  // google auth system from firebase
  // setting global value of the username
  res.redirect('/8fcc8750fab35f7de4a82be2ba81e5c6df4a3ffc');      //nossq_2_form
});

// Form for main website step2
app.post('/c924255909f3389ff2e5e09e231cbe40d9015697', function(req,res,next){         //register-2

    var item ={
    Participant_Name : req.body.name,
    Contact_Details : req.body.phone1,
    Alter_Contact_Details : req.body.phone2,
    Contact_Mail : req.body.mail,
    City : req.body.city
  };

  writeUserData(item);

  res.redirect("/e365d9caf9b7234a92d04292c74c4891befbbf25");    //nossq

});


// Send data from form to mail and datbase
app.post("/form_responses",function(req,res){
  const output = `
  <style>
  table, td, th {  
    border: 1px solid #ddd;
    text-align: left;
  }
  
  table {
    border-collapse: collapse;
    width: 100%;
  }
  
  th, td {
    padding: 15px;
  }
  </style>
  <p>We have recieved your message at ${new Date(Date.now()).toLocaleString()}</p>
  <table border="2px">  
    <tr> <th>Name</th><td> ${req.body.name}</td></tr>
    <tr><th>Email</th><td> ${req.body.email}</td></tr>
    <tr><th>Message</th><td> ${req.body.message}</td></tr>
  </table>
  <p>*This is an automatically generated mail. Please do not reply. For any further queries contact Udgosh core team*</p>
 `;
 let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, 
  auth: {
      user: 'udghoshiitk@gmail.com',
      pass: "slicer@udghosh'19"
  },
  tls:{
    rejectUnauthorized:false
  }
});


let mailOptions = {
    from: '"Udghosh" <udghoshiitk@gmail.com>', 
    to: req.body.email,//  list of receivers
    subject: 'Message recieved',
    html: output
};
// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    });
  savemsg(req.body.name, req.body.email, req.body.message,)
  res.redirect("/");
});


function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function savemsg(name, email, password){
    var uid = makeid(16);
    var pos1 = Math.floor(Math.random() * 16);
    var add1 = makeid(2);
    uid = uid.substring(0,pos1) + add1 + uid.substring(pos1);
    var pos2 = Math.floor(Math.random() * 18);
    var add2 = makeid(2);
    uid = uid.substring(0,pos2) + add2 + uid.substring(pos2);

    var newMessageRef= database.ref('forms_responses/').child(uid);
    newMessageRef.set({
      name : name,
      date : new Date(Date.now()).toLocaleString(),
      email : email,
      message : password
    });
}