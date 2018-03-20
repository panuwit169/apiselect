var app = require('express')();
var bodyParser = require('body-parser');
var path = require('path');

var port = process.env.PORT || 7777;
var cors = require("cors")
var firebase = require('firebase');
var config = {
    apiKey: 'AIzaSyDQrZ0d7YIm036NTdrt_MM5fXAS7zw_xsE',
    authDomain: 'test-64357.firebaseapp.com',
    databaseURL: 'https://test-64357.firebaseio.com',
    storageBucket: 'test-64357.appspot.com',
    messagingSenderId: '696747911221' 
}
firebase.initializeApp(config);

// parse application/json
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
var database = firebase.database();

app.get('/', async function (req, res) {
    let province = []
    await database.ref('highwayvehicles').once('value').then(function(snapshot) {
        province = snapshot.val()
    })
    res.send(province)
});

app.listen(port, function() {
	console.log('Starting node.js on port ' + port);
});