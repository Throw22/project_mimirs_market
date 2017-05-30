var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderedProductSchema = new Schema({
  name: String,
  sku: Number,
  description: String,
  price: Number,
  photo: String,
  unitsSold: Number,
  categoryId: Number,
  createdAt: String,
  updatedAt: String,
  Category: Schema.Types.Mixed,
  quantity: Number
});

var OrderedProduct = mongoose.model('OrderedProduct', OrderedProductSchema);

module.exports = OrderedProduct;
