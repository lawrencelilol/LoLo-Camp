const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');



mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("Mongo Connection Open!!")
    })
    .catch((err) => {
        console.log("Oh there is an Mongo Error!")
        console.log(err)
    })

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        // 1000 cities in the cities.js 
        const randomIdx = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR USER ID
            author: '61eb1dab94ef458f8d49fd2e',
            location: `${cities[randomIdx].city}, ${cities[randomIdx].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi tempore natus, amet veritatis beatae totam corporis sunt nemo tenetur laborum ducimus ipsam, maiores laboriosam repellendus voluptatum! Cumque odio praesentium sit.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[randomIdx].longitude,
                    cities[randomIdx].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dlzhxt4q9/image/upload/v1642923549/Yelp/dlwsxjyu0utjpkfv9p3p.jpg',
                    filename: 'Yelp/dlwsxjyu0utjpkfv9p3p'
                },
                {
                    url: 'https://res.cloudinary.com/dlzhxt4q9/image/upload/v1642923549/Yelp/iwrx72p7ez4qtaguzyhu.jpg',
                    filename: 'Yelp/iwrx72p7ez4qtaguzyhu'
                }
            ]
        })
        await camp.save();
    }
}

seedDB();

