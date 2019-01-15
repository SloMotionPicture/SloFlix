const {tempCard, tempTransaction} = require('./tempObjects')
const stripeAPIKey = 'sk_test_4eC39HqLyjWDarjtT1zdp7dc'
const stripe = require('stripe')(stripeAPIKey)
const uuid = require('uuidv4')
/*
  Work flow of this file is to create a card object using 'createCardObjectWithParams',
  verify said card object with 'verifyCard', 'verifyCard' sends a card token id to
  the specified callback, the card token id should be stored for later use.
  When a user clicks the checkout button completing the purchase a transaction object
  must be obtained using 'createTransactionObjectWithParams', the returned transaction
  object can be sent to 'createChargeToCard' along with a callback, the callback for
  'createChargeToCard' is called twice the first time sending the uuid/ idempotency_key
  and the second time sending the charge id back

*/
// Error handling
const error = err => {
  switch (err.type) {
    case 'StripeCardError':
      // A declined card error
      console.log('A declined card error')
      break
    case 'RateLimitError':
      // Too many requests made to the API too quickly
      console.log('Too many requests made to the API too quickly')
      break
    case 'StripeInvalidRequestError':
      // Invalid parameters were supplied to Stripe's API
      console.log('Invalid parameters were supplied to Stripes API')
      break
    case 'StripeAPIError':
      // An error occurred internally with Stripe's API
      console.log('An error occurred internally with Stripes API')
      break
    case 'StripeConnectionError':
      // Some kind of error occurred during the HTTPS communication
      console.log('Some kind of error occurred during the HTTPS communication')
      break
    case 'StripeAuthenticationError':
      // You probably used an incorrect API key
      console.log('You probably used an incorrect API key')
      break
    default:
      // Handle any other types of unexpected errors
      console.log('Undocumented error')
      break
  }
}

// Pass in a charge ID, returns a refund object
const refund = charge => {
  // OB/MS: could use async..await
  stripe.refunds.create(
    {
      charge
    },
    (err, refundObj) => {
      if (err) {
        error(err)
      } else {
        console.log('...Refunded...')
      }
    }
  )
}

// idempotency_key is created by us and is used for when we don't retrieve a response from stripe and is used to recognize subsequent retries of the same request.
// We suggest using V4 UUIDs, or another random string with enough entropy to avoid collisions
// Returns a charge ID that should be stored in the database
const createChargeToCard = (transaction, callback) => {
  console.log('...Creating Charge...')
  const tempUUID = uuid()
  callback(tempUUID)
  stripe.charges.create(
    transaction,
    {idempotency_key: tempUUID},
    (err, chargeObj) => {
      if (err) {
        error(err)
      } else {
        console.log('...Successful Charge...')
        callback(chargeObj.id)
      }
    }
  )
}

// Provided a card object and a callback returns a card token id to said callback
// whichcan be sent to 'createChargeToCard'
const verifyCard = (card, callback) => {
  console.log('...Verifying Card...')
  stripe.tokens.create(
    {
      card
    },
    (err, cardToken) => {
      if (err) {
        error(err)
      } else {
        console.log('...Card Verified...')
        callback(cardToken.id)
      }
    }
  )
}

// Provided a cardTokenId and a callback returns a card token object to said callback
const retrieveCard = (cardTokenId, callback) => {
  stripe.tokens.retrieve(cardTokenId, (err, cardToken) => {
    if (err) {
      error(err)
    } else {
      console.log('...Card Verified...')
      callback(cardToken)
    }
  })
}

const createCardObjectWithParams = ({number, exp_month, exp_year, cvc}) => {
  return {
    number,
    exp_month,
    exp_year,
    cvc
  }
}

const createTransactionObjectWithParams = (
  amount,
  source,
  description,
  metadata
) => {
  return {
    amount,
    description,
    metadata,
    source,
    currency: 'usd'
  }
}

module.exports = {
  createTransactionObjectWithParams,
  createCardObjectWithParams,
  createChargeToCard,
  retrieveCard,
  verifyCard,
  refund
}
