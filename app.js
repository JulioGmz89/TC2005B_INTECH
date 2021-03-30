const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const contextManager = require('./utils/context_manager');
//const csrf = require('csurf');

const dashboardRouter = require('./routes/dashboard');
const loginRouter = require('./routes/login');
const proyectoXRouter = require('./routes/proyectoX');
const proyectosRouter = require('./routes/proyectos');
const profileRouter = require('./routes/profile');

const app = express();

// view engine setup
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// const csrfProtection = csrf();
// app.use(csrfProtection);

//app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/proyecto', proyectoXRouter);
//app.use('/PA', proyectoXRouter);
app.use('/proyectos', proyectosRouter);
app.use('/profile', profileRouter);
app.use('/', dashboardRouter);

app.use(async (request, response, next) => {
	const context = await contextManager('Error 404');
    console.log(context['title']);
    response.status(404);
	response.render('error404', context);
})

//module.exports = app;
app.listen(3000);