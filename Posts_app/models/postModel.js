const mongoose = require('mongoose'); // введення бібліотеки в мій проект для роботи з базою даних монго дб

const postSchema = new mongoose.Schema({ // опис таблиці в базі даних 
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }, 
    updatedAt: { type: Date } 
});

const Post = mongoose.model('Post', postSchema); // створення таблиці в бд за моделю

module.exports = Post; // експортація цієї моделі в інші файли

