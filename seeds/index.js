const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price_rand = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://images.unsplash.com/photo-1456305951335-bb8134aeab8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHw0ODQzNTF8fHx8fHx8MTY4NzU3MDA1MA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080',
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil recusandae excepturi laboriosam animi esse iure natus debitis earum facilis minima, dicta blanditiis corrupti dolorum quam vel necessitatibus facere rerum et.",
            price: price_rand
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})