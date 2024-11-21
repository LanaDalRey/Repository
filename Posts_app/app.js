const express = require('express'); // імпорт бібліотеки експресс
const mongoose = require('mongoose'); // імпорт біблотеки монгуус 
const bodyParser = require('body-parser');
const postRoutes = require('./controllers/posts');// імпорт модельки 

const app = express();
const PORT = process.env.PORT || 3000; // визначення порта

mongoose.connect('mongodb+srv://user:3h1GyaYD5xH3Lbin@postsdb.z8z0p.mongodb.net/?retryWrites=true&w=majority&appName=postsDB', { 
    // посилання на базу даних хмарну
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/posts', postRoutes); // адреса головної сторінки

app.get('/', (req, res) => {
    res.redirect('/posts');
});// перенаправлення на головну сторінку

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // вивід посилання на сайт при запуску
});
