const mongoose = require("mongoose");
const mongouri =
  "mongodb+srv://vivek3105:Vivek%401234@cluster0.undbco6.mongodb.net/gofoodmern";
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
          fetcheddata.find({}).toArray( async function (err, data) {
            const food_categoriy = await mongoose.connection.db.collection  ("foodCategory");
            food_categoriy.find({}).toArray(function(err,catData){
              
              if(err) console.log(err);
              else{
                global.food_items = data;
                global.food_category = catData;
              }
            })
            
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
