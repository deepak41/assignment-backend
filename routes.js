const request = require('request');
const { isWithin30Days, isclosed } = require('./utils');
var _ = require('lodash');

function routes(app) {
    app.get('/', (req, res) => {
        res.send('Hello World!')
    });

    // question 1
    app.get('/list-of-campaigns', (req, res) => {
        request.get({
            url: "https://testapi.donatekart.com/api/campaign"
        }, 
        (err, response, body) => {
            body = JSON.parse(body);
            body.sort((a, b) => parseFloat(b.totalAmount) - parseFloat(a.totalAmount));
            var result = _.map(body, function(obj) {return _.pick(obj, 'title', 'totalAmount', "backersCount", "endDate");});
            res.send(result)
        }); 
    });


    // question 2
    app.get('/active-campaigns', (req, res) => {
        request.get({
            url: "https://testapi.donatekart.com/api/campaign"
        }, 
        (err, response, body) => {
            body = JSON.parse(body);
            var active = body.filter(obj => (new Date(obj.endDate)) > (new Date()));
            var result = active.filter(obj => isWithin30Days(obj.created));
            res.send(result)
        }); 
    });

    // question 3
    app.get('/closed-campaigns', (req, res) => {
        request.get({
            url: "https://testapi.donatekart.com/api/campaign"
        }, 
        (err, response, body) => {
            body = JSON.parse(body);
            var result = body.filter(obj => isclosed(obj));
            res.send(result)
        }); 
    });
}

module.exports = routes;