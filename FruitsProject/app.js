// jshint esversion:6
// Original native mongo work
//const { MongoClient } = require("mongodb");
// 
//// Replace the uri string with your connection string.
//const uri = "mongodb://127.0.0.1:27017/";
// 
//const client = new MongoClient(uri);
// 
//async function run() {
//  try {
//    const database = client.db('FruitsDB');
//    const myColl = database.collection('fruits');
//    /*
//    const fruits = [
//        {
//            "_id": 1,
//            "name": "apple",
//            "rating": 4,
//            "review": "dull"
//        },
//        {
//            "_id": 2,
//            "name": "mango",
//            "rating": 7,
//            "review": "good but hard to eat"
//        },
//        {
//            "_id": 3,
//            "name": "grape",
//            "rating": 7,
//            "review": "easy to eat but dull"
//        }
//    ];
// 
//    const result = await myColl.insertMany(fruits);
//    console.log(`${result.insertedCount} documents were inserted`);
//    */
//    const cursor = myColl.find();
//    // print a message if no documents were found
//    if ((await myColl.countDocuments()) === 0) {
//      console.log("No documents found!");
//    }
//    for await (const doc of cursor) {
//      console.dir(doc);
//    }
//  } finally {
//    // Ensures that the client will close when you finish/error
//    await client.close();
//  }
//}
//run().catch(console.dir);


// Mongoose option
// Boiler plate! resource: https://mongoosejs.com/docs/index.html
const mongoose = require("mongoose");
 
main().catch(err => console.log(err));
 
async function main() {
    // await mongoose.connect("mongodb://127.0.0.1:27017/nameOfYourDatabase");
    await mongoose.connect("mongodb://127.0.0.1:27017/fruitsDB");
}
 
 
// create new collection
// step 1
const fruitSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Please specify a name."]
    }, 
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});
 
// step 2
const Fruit = mongoose.model('Fruit', fruitSchema);
 
// step 3
const fruit = new Fruit ({
    name: "Apple",
    rating: 7,
    review: "It is good for your health but I don't really like it!"
});
 
// step 4
// save fruit ** use it only once and run node app.js then comment it out
// fruit.save();
 
 
// create new collection!
// step 1
const personSchema = new mongoose.Schema ({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
});
 
// step 2
const Person = mongoose.model("Person", personSchema);
 
// step 3
const person = new Person ({
    name: "John",
    age: 37
});
 
// step 4
// save fruit ** use it only once and run node app.js then comment it out
// person.save();
 
 
// add many fruits into database and insert many thing at once!
// https://mongoosejs.com/docs/api/model.html#Model.insertMany()
// step 1
const kiwi = new Fruit ({
    name: "Kiwi",
    rating: 6,
    review: "It's okey"
})
 
const mango = new Fruit ({
    name: "Mango",
    rating: 10,
    review: "The best fruite ever! it's my all time favorite"
})
 
const banana = new Fruit ({
    name: "Banana",
    rating: 5,
    review: "It's good for your health but I don't like the small"
})
 
 
// insert many thing at once!
// https://mongoosejs.com/docs/api/model.html#Model.insertMany()
// ps. if you follow Angela on callback if and else statement you will get new MongooseError('Model.insertMany() no longer accepts a callback');
// below is the solutions and resources
// https://stackoverflow.com/questions/75595278/callback-is-no-more-accepting-in-model-insertmany-after-version-7-0-0-update
/*
Fruit.insertMany([kiwi, mango, banana])
    .then(function () {
        console.log("Successfully saved defult items to DB");
    })
    .catch(function (err) {
        console.log(err);
    });
*/

run();
async function run() {
    try {
        const person = await Person.find();
        const fruit = await Fruit.find();
        /*try {
            const johnsFruit = await Person.updateOne({"_id": "649319bee3b063c1c0f205c1"}, {$set: {"favoriteFruit": banana}});
            console.log(johnsFruit);
        } catch (err) {
            console.log(err);
        };*/
        /*try {
            const kiwi = await Fruit.deleteOne({"_id": "649319bee3b063c1c0f205c2"});
            console.log(kiwi);
        } catch (err) {
            console.log(err);
        };*/
        //setTimeout(() => {
        //    console.log(person);
        //    console.log(fruit);
        //}, 2000)
        setTimeout(() => {
            person.forEach((pers) => {
                console.log(pers.name, ' age: ', pers.age, pers.favoriteFruit.name);
            });
            fruit.forEach((frt) => {
                console.log(frt.name, frt.rating, frt.review);
            });
        }, 3000)
        mongoose.connection.close();
    } catch (err) {
        console.log(err.message);
        await mongoose.connection.close();
    };
};