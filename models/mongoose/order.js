var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  stripeData: {},
  shoppingCart: [{}]
});

var Order = mongoose.model('Order', OrderSchema);

module.exports = Order;

//example response
// {
//   "id": "ch_1AAgMHKdj9ExRXOiQU0rQGYD",
//   "object": "charge",
//   "amount": 100,
//   "amount_refunded": 0,
//   "application": null,
//   "application_fee": null,
//   "balance_transaction": "txn_1AAgMHKdj9ExRXOiTJkTIdeV",
//   "captured": true,
//   "created": 1492698849,
//   "currency": "usd",
//   "customer": null,
//   "description": "My First Test Charge (created for API docs)",
//   "destination": null,
//   "dispute": null,
//   "failure_code": null,
//   "failure_message": null,
//   "fraud_details": {
//   },
//   "invoice": null,
//   "livemode": false,
//   "metadata": {
//   },
//   "on_behalf_of": null,
//   "order": null,
//   "outcome": null,
//   "paid": true,
//   "receipt_email": null,
//   "receipt_number": null,
//   "refunded": false,
//   "refunds": {
//     "object": "list",
//     "data": [
//
//     ],
//     "has_more": false,
//     "total_count": 0,
//     "url": "/v1/charges/ch_1AAgMHKdj9ExRXOiQU0rQGYD/refunds"
//   },
//   "review": null,
//   "shipping": null,
//   "source": {
//     "id": "card_1AAgMHKdj9ExRXOiYPdENQqZ",
//     "object": "card",
//     "address_city": null,
//     "address_country": null,
//     "address_line1": null,
//     "address_line1_check": null,
//     "address_line2": null,
//     "address_state": null,
//     "address_zip": null,
//     "address_zip_check": null,
//     "brand": "Visa",
//     "country": "US",
//     "customer": null,
//     "cvc_check": null,
//     "dynamic_last4": null,
//     "exp_month": 8,
//     "exp_year": 2018,
//     "fingerprint": "t6BpboDsEXRmmmYR",
//     "funding": "credit",
//     "last4": "4242",
//     "metadata": {
//     },
//     "name": null,
//     "tokenization_method": null
//   },
//   "source_transfer": null,
//   "statement_descriptor": null,
//   "status": "succeeded",
//   "transfer_group": null
// }
