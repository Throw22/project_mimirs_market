var models = require('./models/sequelize');
var Product = models.Product;
var Category = models.Category;
var sequelize = models.sequelize;

// Product.findAll({
//   where: {
//     $and: [
//       {
//         $or: [
//           { name: { $iLike: `%${search}%` } },
//           { description: { $iLike: `%${search}%` } }
//         ]
//       },
//       {
//         $and: [
//           { price: { $gte: minPrice } },
//           { price: { $lte: maxPrice } },
//           { categoryId: { $in: categoryArr } }
//         ]
//       }
//     ]
//   },
//   include: [{ model: Category, required: true }],
//   order: orderBy,
//   limit: 30
// }).then(product => {
//   products = product;
//   Category.findAll().then(category => {
//     categories = category;
//     res.render('products/index', {
//       products,
//       categories,
//       hasSearched,
//       search,
//       cartProducts
//     });
//   });
// });

let fun = async function() {
  var products = Product.findAll({});

  return products;
};

console.log('BEFORE');
fun();
console.log('AFTER');
