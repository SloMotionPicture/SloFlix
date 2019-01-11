const {tempCard, tempTransaction} = require('./tempObjects')
const stripeAPIKey = 'sk_test_C922RGUbK9oVjCvy9iqwl9Mo'
const stripe = require('stripe')(stripeAPIKey)
const uuid = require('uuidv4')
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

// idempotency_key is created by us and is used for when we don't retrieve a response from stripe and is used to recognize subsequent retries of the same request.
// We suggest using V4 UUIDs, or another random string with enough entropy to avoid collisions
// Returns a charge ID that should be stored in the database
const createCharge = currentTempTransaction => {
  console.log('...Creating Charge...')
  const tempUUID = uuid()
  return stripe.charges.create(
    currentTempTransaction,
    {idempotency_key: tempUUID},
    (err, charge) => {
      if (err) {
        error(err)
      } else {
        console.log('...Successful Charge...')
        return charge
      }
    }
  )
}
// Returns a card token that can be sent to 'createCharge'
const verifyCard = async (card = tempCard) => {
  console.log('...Verifying Card...')
  return await stripe.tokens.create({card}, (err, token) => {
    if (err) {
      error(err)
    } else {
      console.log('...Card Verified...')
      return token
    }
  })
}
// Pass in a charge ID, returns a refund object
const refund = charge => {
  return stripe.refund.create(
    {
      charge
    },
    (err, refund) => {
      if (err) {
        error(err)
      } else {
        return refund
      }
    }
  )
}
// Retrieves and returns a charge object from stripe
const retrieve = stripeTransactionKey => {
  stripe.charges.retrieve((stripeTransactionKey, {api: stripeAPIKey}))
}

async function start() {
  console.log('...Starting...')
  // tempCard = {
  //   "number": '4242424242424242',
  //   "exp_month": 12,
  //   "exp_year": 2020,
  //   "cvc": '123'
  // }
  const token = await verifyCard(tempCard)
  const chargeObj = await createCharge({
    ...tempTransaction,
    source: token
  })

  console.log(chargeObj)
}
start()
