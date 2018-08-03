
var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
};

var OrdersSchema = new mongoose.Schema({
  _id: String,
  date: Date,
  price: Number,
  title:String,
  desc:String
}, schemaOptions);


var Orders = mongoose.model('orders1', OrdersSchema);
module.exports = Orders;
