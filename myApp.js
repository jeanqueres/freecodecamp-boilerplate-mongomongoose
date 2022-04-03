require('dotenv').config();
const { Model } = require('mongoose');
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Install and Set Up Mongoose
console.log('uri', process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

// Create a Model
let personSchema = new Schema({
  name: { type: String, required: true },
  age:  Number,
  favoriteFoods: [String]
})

let Person = mongoose.model('Person', personSchema);

// Create and Save a Record of a Model
const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Jean",
    age: 29,
    favoriteFoods: ['Pizza', 'Lasagna', 'Churrasco']
  }).save(function(err, data){
    if(err) return console.err(err);
    done(null, data);
  });
};

// Create Many Records with model.create()
const arrayOfPeople = [
  {name: "Fulano", age: 30, favoriteFoods: ["Macarrão"]},
  {name: "Ciclano", age: 40, favoriteFoods: ["Frango"]},
  {name: "Beltrano", age: 50, favoriteFoods: ["Queijo"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if(err) return console.err(err);
    done(null, data);
  });
};

// Use model.find() to Search Your Database
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data) {
    if(err) return console.err(err);
    done(null, data);
  })
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
