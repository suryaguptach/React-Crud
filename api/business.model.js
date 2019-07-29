const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

let Business = new Schema({
  person_name: {
    type: String,
    required:true

  },
  business_name: {
    type: String,
    required:true
  },
  business_gst_number: {
    type: Number,
    unique: true,
    required:true
  }
},{
    collection: 'business'
});

module.exports = mongoose.model('Business', Business);