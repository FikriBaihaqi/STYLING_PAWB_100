const express = require('express');
const session = require('express-session');
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const todosController = require('./src/controllers/ToDoController');
const methodOverride = require('method-override');

require('dotenv').config();

// Rute
const userAuthRoute = require('./src/routes/userAuth-route');
const toDoRoute = require('./src/routes/toDo-route');

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(expressEjsLayouts);
app.set('layout', 'layouts/main-layouts');
app.use(methodOverride('_method'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rute untuk Todos
app.get('/todos', todosController.getTodo);
app.post('/todos', todosController.createTodo);  // Pastikan rute POST ini ada
app.delete('/todos/delete/:id', todosController.deleteTodo);
app.get('/todos/update/:id', todosController.updateTodo);

app.use('/', userAuthRoute);
app.use('/todos', toDoRoute);

app.listen(port, () => {
    console.log(`Server berjalan pada http://localhost:${port}`);
});
