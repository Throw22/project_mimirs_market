var url = require('url');
const express = require('express');
let router = express.Router();
var models = require('./../models/sequelize');
var Product = models.Product;
var Category = models.Category;
var sequelize = models.sequelize;
var categoryArr = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19
];

var onIndex = (req, res) => {
  var products, categories;
  if (!req.session.shoppingCart) {
    req.session.shoppingCart = [];
  }
  var cartProducts = req.session.shoppingCart;
  var searchValues = {
    searchText: 'Search names and descriptions',
    minPrice: 'Minimum price',
    maxPrice: 'Maximum price',
    categoryId: '',
    orderBy: `"name"`,
    catText: 'Choose Category:',
    orderText: 'Order By:'
  };

  Product.findAll({
    include: [{ model: Category, required: true }],
    limit: 30
  }).then(product => {
    products = product;
    Category.findAll().then(category => {
      categories = category;
      res.render('products/index', {
        products,
        categories,
        cartProducts,
        searchValues
      });
    });
  });
};

var onSearch = (req, res) => {
  var cartProducts = req.session.shoppingCart;
  var searchValues = {
    searchText: req.query.searchText,
    minPrice: req.query.minPrice,
    maxPrice: req.query.maxPrice,
    categoryId: '',
    orderBy: '',
    catText: 'Choose Category:',
    orderText: 'Order By:'
  };

  if (searchValues.searchText == '') {
    searchValues.searchText = 'Search names and descriptions';
  }
  if (searchValues.minPrice == '') {
    searchValues.minPrice = 'Minimum price';
  }
  if (searchValues.maxPrice == '') {
    searchValues.maxPrice = 'Maximum price';
  }

  var search = req.query.searchText || '';
  var minPrice = req.query.minPrice || 0;
  var maxPrice = req.query.maxPrice || 9999;
  var categoryId = req.query.product.categoryId;
  var orderBy = req.query.orderBy || `"name"`;
  var products, categories;

  if (categoryId == '') {
    categoryId = categoryArr;
  } else {
    categoryId = [categoryId];
  }

  Product.findAll({
    where: {
      $and: [
        {
          $or: [
            { name: { $iLike: `%${search}%` } },
            { description: { $iLike: `%${search}%` } }
          ]
        },
        {
          $and: [
            { price: { $gte: minPrice } },
            { price: { $lte: maxPrice } },
            { categoryId: { $in: categoryId } }
          ]
        }
      ]
    },
    include: [{ model: Category, required: true }],
    order: orderBy,
    limit: 30
  }).then(product => {
    products = product;
    Category.findAll().then(category => {
      categories = category;
      res.render('products/index', {
        products,
        categories,
        search,
        cartProducts,
        searchValues
      });
    });
  });
};

router.get('/', onIndex);
router.get('/search', onSearch);

var onAdd = (req, res) => {
  var productId = req.body.productId;

  Product.findById(productId, {
    include: [{ model: Category, required: true }]
  })
    .then(product => {
      console.log(product);
      product.dataValues.quantity = 1;
      req.session.shoppingCart.push(product);
    })
    .then(() => {
      res.redirect('/');
    });
};

router.post('/addToCart', onAdd);

var onShow = (req, res) => {
  var products, currentProduct;
  var cartProducts = req.session.shoppingCart;

  Product.findById(req.params.id, {
    include: [{ model: Category, required: true }]
  }).then(product => {
    currentProduct = product;
    Product.findAll({
      where: {
        $and: [
          { categoryId: currentProduct.categoryId },
          { id: { $ne: currentProduct.id } }
        ]
      },
      limit: 30
    }).then(result => {
      products = result;
      res.render('products/show', { products, currentProduct, cartProducts });
    });
  });
};

router.get('/products/:id', onShow);

module.exports = router;
