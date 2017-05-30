var url = require('url');
const express = require('express');
let router = express.Router();
var modelsSeq = require('./../models/sequelize');
var Product = modelsSeq.Product;
var Category = modelsSeq.Category;
var sequelize = modelsSeq.sequelize;
var mongoose = require('mongoose');
var modelsMon = require('./../models/mongoose');
var Order = mongoose.model('Order');
var dbInfo = require('./../lib/dbInfo');

router.get('/', (req, res) => {
  let promiseArr = dbInfo.getTotals();
  promiseArr.push(dbInfo.statesRevenue());
  promiseArr.push(dbInfo.revenueByCategoryProduct());
  promiseArr.push(dbInfo.revenueByIndividualProduct());

  Promise.all(promiseArr).then(result => {
    console.log('Product totals:', result[6]);
    result[6] = dbInfo.revenueByCategory(result[6]);
    result[7] = dbInfo.revenueByProductTotal(result[7]);
    console.log('Category product totals sorted:', result[6]);

    let totals = {
      totalRevenue: result[0][0].totalRevenue,
      totalUnitsEver: result[0][0].totalUnitsEver,
      totalTransactions: result[0][0].totalTransactions,
      totalUsers: result[1][0].totalUsers,
      totalProducts: result[2],
      totalCategories: result[3],
      totalStates: result[4][0].totalStates,
      totalStatesRevenue: result[5],
      totalCatRevenue: result[6],
      totalProductRevenue: result[7]
    };

    res.render('analytics/index', { totals });
  });
});

module.exports = router;
