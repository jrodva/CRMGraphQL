const { mongoose } = require('mongoose');

const connectDataBase = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to database');
  } catch (error) {
    console.log(`Error connecting to database ${error}`);
    process.exit(1);
  }
}
module.exports = connectDataBase;
