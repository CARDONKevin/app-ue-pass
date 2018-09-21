const express = require('express');
const app = express();

const webpush = require('web-push');
const vapidKeys = require('./NOTversioned/vapidKeys.js');

// initialise le module webpush avec les clefs VAPId et les informations de contact
webpush.setVapidDetails(
    'mailto:web-push@ue.paas.fr',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);


const dbSub = require('./subscriptions.js');
dbSub.initDb();


const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Push App!')
});

app.get('/api/get-vapid-public-key', (req, res) => {
    res.send({ vapidkey: vapidKeys.publicKey })
});

app.get('/api/endpoints', (req, res) => {
    dbSub.getAllEndpoints()
        .then( (rows) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ list: rows }));
        })
        .catch( (err) => {
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                error: {
                    id: 'unable-to-get-all-endpoints',
                    message: 'Database error : '+err.message
                }
            }));
        })
});

app.post('/api/save-subscription/', (req, res) => {
    if (!isValidSaveRequest(req, res)) {
        return;
    }

    return dbSub.saveSubscription(req.body)
        .then(function(subscriptionId) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ data: { success: true } }));
        })
        .catch(function(err) {
            res.status(500);
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({
                error: {
                    id: 'unable-to-save-subscription',
                    message: 'The subscription was received but we were unable to save it to our database.'
                }
            }));
        });
});


app.use(express.static('public'));

app.listen(80, function () {
    console.log('Push server start!')
});




const isValidSaveRequest = (req, res) => {
    // Check the request body has at least an endpoint.
    if (!req.body || !req.body.endpoint) {
        // Not a valid subscription.
        res.status(400);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            error: {
                id: 'no-endpoint',
                message: 'Subscription must have an endpoint.'
            }
        }));
        return false;
    }
    return true;
};