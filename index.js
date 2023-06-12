const express = require('express');
const path =  require('path');
const cookieParser = require('cookie-parser');

require('./config/database').connect_to_DB();/* connect to DB*/

const app = express();/* use express */

const router = require('./routes/routes');

app.use(express.json());

app.use(cookieParser());
app.disable("etag");

app.set('view engine', 'ejs');/* set EJS as view engine */
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname , 'views')));
app.use(express.urlencoded({ extended: true }));


app.use('/', router);

/* if user enters wrong path */
app.use('*',(req, res) => {
    res.redirect('/');
});

/* start server */
app.listen(3000, () => {
    console.log("Server started at port 3000...");
});