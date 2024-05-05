const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://201110624:6565@risacmp-cluster.nsjbeyz.mongodb.net/risacmp_db_desarrollo?retryWrites=true&w=majority&appName=risacmp-cluster', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB; 
