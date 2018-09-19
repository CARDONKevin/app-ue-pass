const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('Push App!')
});

app.use(express.static('public'));

app.listen(80, function () {
    console.log('Push server start!')
});


