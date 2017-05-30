var modelsSeq = require('./../models/sequelize');
var Product = modelsSeq.Product;
var Category = modelsSeq.Category;
var sequelize = modelsSeq.sequelize;
var mongoose = require('mongoose');
var modelsMon = require('./../models/mongoose');
var Order = mongoose.model('Order');
var OrderedProduct = mongoose.model('OrderedProduct');

var dbInfo = {};

dbInfo.getTotals = function() {
  let totals = Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$charge.amount' },
        totalUnitsEver: { $sum: '$totalUnits' },
        totalTransactions: { $sum: 1 }
      }
    }
  ]);

  let usersTotal = Order.aggregate(
    { $group: { _id: '$email' } },
    { $group: { _id: 1, totalUsers: { $sum: 1 } } },
    { $project: { _id: 0 } }
  );

  let productTotal = Product.count({});

  let categoryTotal = Category.count({});

  let statesTotal = Order.aggregate(
    { $group: { _id: '$state' } },
    { $group: { _id: 1, totalStates: { $sum: 1 } } },
    { $project: { _id: 0 } }
  );

  let promiseArr = [
    totals,
    usersTotal,
    productTotal,
    categoryTotal,
    statesTotal
  ];
  return promiseArr;
};

dbInfo.statesRevenue = function() {
  let byState = Order.aggregate([
    {
      $group: { _id: '$state', revenueForState: { $sum: '$charge.amount' } }
    }
  ]);
  return byState;
};

dbInfo.revenueByCategoryProduct = function() {
  let byProduct = OrderedProduct.aggregate([
    {
      $group: {
        _id: '$categoryId',
        revenueForProduct: { $avg: '$price' },
        quantityOfProduct: { $sum: '$quantity' }
      }
    }
  ]);

  return byProduct;
};

dbInfo.revenueByCategory = function(products) {
  var revByCat = [
    { name: 'Multi-byte Automotive', rev: 0 },
    { name: 'Mobile Tools', rev: 0 },
    { name: '1080p Jewelery', rev: 0 },
    { name: 'Primary Automotive', rev: 0 },
    { name: 'Multi-byte Kids', rev: 0 },
    { name: 'Open-source Garden', rev: 0 },
    { name: 'Virtual Shoes', rev: 0 },
    { name: 'Wireless Outdoors', rev: 0 },
    { name: 'Neural Industrial', rev: 0 },
    { name: 'Cross-platform Kids', rev: 0 },
    { name: 'Bluetooth Clothing', rev: 0 },
    { name: 'Redundant Computers', rev: 0 },
    { name: 'Online Computers', rev: 0 },
    { name: 'Cross-platform Clothing', rev: 0 },
    { name: 'Optical Baby', rev: 0 },
    { name: 'Primary Tools', rev: 0 },
    { name: 'Virtual Automotive', rev: 0 },
    { name: 'Online Industrial', rev: 0 },
    { name: 'Virtual Clothing', rev: 0 },
    { name: 'Optical Beauty', rev: 0 }
  ];

  products.forEach(function(product) {
    revByCat[Number(product._id - 1)].rev = (revByCat[
      Number(product._id - 1)
    ].rev += Number(product.revenueForProduct) *
      Number(product.quantityOfProduct));
  });

  for (var i = 0; i < revByCat.length; i++) {
    if (revByCat[i].rev === 0) {
      revByCat.splice(i, 1);
      i = 0;
    }
  }

  return revByCat;
};

dbInfo.revenueByIndividualProduct = function() {
  let byProduct = OrderedProduct.aggregate([
    {
      $group: {
        _id: '$name',
        price: { $avg: '$price' },
        unitsSold: { $sum: '$quantity' }
      }
    }
  ]);

  console.log(byProduct);
  return byProduct;
};

dbInfo.revenueByProductTotal = function(products) {
  revByProduct = [];

  products.forEach(function(product) {
    revByProduct.push({
      name: product._id,
      revenue: product.price * product.unitsSold
    });
  });

  return revByProduct;
};

module.exports = dbInfo;
