const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create({
      title: "Arroz de pato",
      level: "Easy Peasy",
      ingredients: ["Arroz", "Pato"],
      cuisine: "Portuguese",
      dishType: "main_course",
      duration: 60,
      creator: "Chef avo",
    })
      .then((result) => {
        console.log(result.title)
      })
    Recipe.insertMany(data)
      .then((result) => {
        console.log(result)
        Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 })
          .then((result) => {
            console.log("Recipe was updated")
          })
        Recipe.deleteOne({ title: "Carrot Cake" })
          .then(() => {
            console.log("Recipe was removed")
            mongoose.connection.close();
          })
      })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
