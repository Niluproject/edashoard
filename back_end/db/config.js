const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/e-commerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});