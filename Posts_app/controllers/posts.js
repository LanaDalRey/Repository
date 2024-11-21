const express = require('express'); //підключення бібліотеки експресс
const router = express.Router(); // ств роутер для перенапрямлення між сторінками
const Post = require('../models/postModel'); //імпортувала модель сюди

router.get('/', async (req, res) => { // запит гет дістає усі дані з бд і передає в шаблон і зображує шаблон
    const posts = await Post.find(); 
    res.render('index', { posts });
});

router.get('/create', (req, res) => { //  запит гет перенапрявляє користувача на сторінку create і зображує шаблон 
    res.render('create');
});

router.post('/', async (req, res) => {
    const { title, description, author } = req.body;
    const post = new Post({ title, description, author });
    await post.save();
    res.redirect('/posts'); // опрацювання запиту пост для збереження даних в бд та після 
                            //цього перенаправлення користувача на головну сторінку
});

router.get('/edit/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('edit', { post }); // викликається запит гет який шукає пост(опис автор таййтл) 
                                //за айді і передає ці дані в шаблон едіт і зображує його 
});

router.post('/edit/:id', async (req, res) => {
    const { title, description, author } = req.body;
    const updateData = { title, description, author, updatedAt: new Date() };
    await Post.findByIdAndUpdate(req.params.id, updateData);
    res.redirect('/posts'); // викликається запит пост який зчитує введені користувачем 
                            //дані і записує їх в структуру подібну до модель пост і шукаємо 
                            //пост за айді та оновлюємо його та перенаправляємось на головну сторінку
});

router.post('/delete/:id', async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/posts'); // викликається запит пост який шукає пост (автор опис) за айді та видаляє його з бд
});

module.exports = router;
