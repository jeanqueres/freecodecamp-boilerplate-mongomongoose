require('dotenv').config();
const { save } = require('mongodb/lib/operations/collection_ops');
const { Model } = require('mongoose');
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Install and Set Up Mongoose
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

// Use model.findOne() to Return a Single Matching Document from Your Database
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data){
    if(err) return console.err(err);
    done(null, data);
  })
};

// Use model.findById() to Search Your Database By _id
const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data){
    if(err) return console.err(err);
    done(null, data);
  });
};

// Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (err, person) => {
    if(err) { return console.error(err); }

    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if(err) { return console.error(err); }
      done(null, updatedPerson);
    });
  });
};

// Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName }, 
    { age: 20 }, 
    { new: true },
    (err, updatedPerson) => {
      if(err) { return console.err(err); }
      done(null, updatedPerson);
    }
  );
};

// Delete One Document Using model.findByIdAndRemove
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, deletedPerson) => {
    if(err) { return console.err(err); }
    done(null, deletedPerson);
  });
};

// Delete Many Documents with model.remove().
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, res) => {
    if(err) return console.err(err);
    done(null, res);
  });
};

// Chain Search Query Helpers to Narrow Search Results
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
  .sort({ 'name': 'desc' })
  .limit(2)
  .select('-age')
  .exec((err, data) => { 
    if(err) return console.err(err);
    done(null, data);
  })
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
