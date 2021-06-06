const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();
const PORT = process.env.PORT || 3000 ;

//connect to mongoDB
const dbURI = 'mongodb+srv://sabari-db:sabarinathan@cluster0.jgirb.mongodb.net/narikootam?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(PORT))
    .then(() => console.log("Server listening on Port",PORT))
    .catch((err) => console.log(err)); 

//register view engine
app.set('view engine', 'ejs');

//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
  });

app.get('/', (req, res) => {
    res.redirect('/blogs');
});
 
app.get('/about', (req, res) => {
   res.render('about', {title: 'About'});
});

//blog routes
app.use('/blogs',blogRoutes);

app.use((req, res) => {
    res.status(404).render('404',{title: '404'});
}) 