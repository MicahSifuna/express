const  express = require ("express");
const path = require("path");
const { engine } = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./members');

const app = express();

// init middleware
// app.use(logger);

// Handlebars Middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./views");

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Home page route
app.get('/', (req, res) => {res.render('index',
 {
    title: 'Member App',
    members
  })});

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Members API Routes
app.use('/api/members', require('./routes/api/Members'));
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));


