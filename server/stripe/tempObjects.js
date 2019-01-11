const tempCard = {
  number: '4242424242424242',
  exp_month: 12,
  exp_year: 2020,
  cvc: '123'
}
const tempTransaction = {
  amount: 2000,
  currency: 'usd',
  source: 'card_1DrCnZ2eZvKYlo2CMuriCLpt',
  description: 'Charge for jenny.rosen@example.com',
  metadata: {
    order_id: '6735'
  }
}
const cardToken = {
  id: 'card_1DrCnZ2eZvKYlo2CMuriCLpt',
  object: 'card',
  address_city: null,
  address_country: null,
  address_line1: null,
  address_line1_check: null,
  address_line2: null,
  address_state: null,
  address_zip: null,
  address_zip_check: null,
  brand: 'Visa',
  country: 'US',
  customer: 'cus_EJqUQ0AzWmBo3x',
  cvc_check: null,
  dynamic_last4: null,
  exp_month: 1,
  exp_year: 2020,
  fingerprint: 'Xt5EWLLDS7FJjR1c',
  funding: 'credit',
  last4: '4242',
  metadata: {},
  name: null,
  tokenization_method: null
}

//Example success response from 'stripe.charges.create'
const exampleChargeResponse = {
  id: 'ch_1DpeX82eZvKYlo2CmYWVyOvp',
  object: 'charge',
  amount: 100,
  amount_refunded: 0,
  application: null,
  application_fee: null,
  application_fee_amount: null,
  balance_transaction: 'txn_19XJJ02eZvKYlo2ClwuJ1rbA',
  captured: false,
  created: 1546792290,
  currency: 'usd',
  customer: null,
  description: 'My First Test Charge (created for API docs)',
  destination: null,
  dispute: null,
  failure_code: null,
  failure_message: null,
  fraud_details: {},
  invoice: null,
  livemode: false,
  metadata: {
    order_id: '6735'
  },
  on_behalf_of: null,
  order: null,
  outcome: null,
  paid: true,
  payment_intent: null,
  receipt_email: null,
  receipt_number: null,
  refunded: false,
  refunds: {
    object: 'list',
    data: [],
    has_more: false,
    total_count: 0,
    url: '/v1/charges/ch_1DpeX82eZvKYlo2CmYWVyOvp/refunds'
  },
  review: null,
  shipping: null,
  source: {
    id: 'card_1DpeWn2eZvKYlo2CPCdSMkDb',
    object: 'card',
    address_city: null,
    address_country: null,
    address_line1: null,
    address_line1_check: null,
    address_line2: null,
    address_state: null,
    address_zip: null,
    address_zip_check: null,
    brand: 'Visa',
    country: 'US',
    customer: null,
    cvc_check: null,
    dynamic_last4: null,
    exp_month: 8,
    exp_year: 2020,
    fingerprint: 'Xt5EWLLDS7FJjR1c',
    funding: 'credit',
    last4: '4242',
    metadata: {},
    name: 'Jenny Rosen',
    tokenization_method: null
  },
  source_transfer: null,
  statement_descriptor: null,
  status: 'succeeded',
  transfer_data: null,
  transfer_group: null
}
module.exports = {
  tempCard,
  tempTransaction,
  exampleChargeResponse
}
