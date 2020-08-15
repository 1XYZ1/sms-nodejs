const express = require('express');

const exphbs = require('express-handlebars');
// el path se usa para concatenar directorios en distintos sistemas operativos
const path = require('path');
const morgan = require('morgan');
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: require('./libs/handlebars')
}));
app.set('view engine', '.hbs');
// Middlewares

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// routes
app.use(require('./routes/index.routes'));

// static files
app.use(express.static(path.join(__dirname, "public")))
module.exports = app