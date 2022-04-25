const axios = require('axios');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const { engine } = require('express-handlebars');
const expressip = require('express-ip');

app.engine('.hbs', engine({ extname: '.hbs' }));

app.set("PORT", PORT);

app.use(expressip().getIpInfoMiddleware);

app.use(express.static(path.join(__dirname, 'assets')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.get('/', function (req, res) {
    res.render("index", { title: "Yuyi" });
});

app.get('/search', function (req, res) {
    queries = req.query;
    let url = `https://indreed.herokuapp.com/api/jobs`;
    if (queries) {
        axios.get(url, {
            params: queries
        })
            .then(function (response) {
                res.render("search", { title: "Yuyi", jobs: response.data });

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    else {
        res.render("search", { title: "Yuyi" })
    }


});
app.listen(app.get('PORT'), function () {
    console.log('started on port 3000');
})

