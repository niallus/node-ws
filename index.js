const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {});
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', { pageTitle: 'Under Maintenance' });
// });
app.use(express.static(`${__dirname}/public`));
hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
});
hbs.registerHelper('capIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req,res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the home of this site'
    });
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req,res) => {
    res.send({ errorMessage: 'things didnt work' });
});

app.listen(3000, () => {console.log('server is up: 3000');});