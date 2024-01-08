const mongoose = require("mongoose");
const mongouri =
  "mongodb+srv://vivek3105:Vivek%401234@cluster0.undbco6.mongodb.net/gofoodmern?retryWrites=true&w=majority";
const mongoDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(
      mongouri,
      { useNewUrlParser: true },
      async (err, result) => {
        if (err) console.log(err);
        else {
          console.log("Mongo connected");
          const fetcheddata = await mongoose.connection.db.collection(
            "food_items"
          );
          fetcheddata.find({}).toArray(function (err, data) {
            if (err) console.log(err);
            else {
              console.log();
            }
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = mongoDB;
