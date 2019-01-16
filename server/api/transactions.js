const router = require('express').Router()
const {Transaction} = require('../db/models')
const {createChargeToCard} = require('../stripe/stripe-helper')
module.exports = router

//Finds All Transactions
router.get('/', async (req, res, next) => {
  try {
    let query = ''
    if (!req.user.adminStatus) {
      query = req.user.id
    } else {
      query = 'admin'
    }
    if (query === 'admin') {
      const allTransactions = await Transaction.findAll()
      res.send(allTransactions)
    } else {
      const userTransactions = await Transaction.findAll({
        where: {userId: req.user.id}
      })
      res.send(userTransactions)
    }
  } catch (error) {
    next(error)
  }
})

//Find User Transactions
router.get('/:transactionId', async (req, res, next) => {
  try {
    let query = ''
    if (!req.user.adminStatus) {
      query = req.user.id
    } else {
      query = 'admin'
    }
    const userTransaction = await Transaction.findById(req.params.transactionId)
    if (
      userTransaction &&
      (query === 'admin' || query === userTransaction.userId)
    ) {
      res.send(userTransaction)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/create', async (req, res, next) => {
  try {
    if (req.user.id) {
      console.log('...Creating Transaction...')
      const {amount, description, metadata, status, source} = req.body
      const cart = res.cookie('cart')
      res.cookie(
        'transaction-pending',
        {amount, source, description, metadata, status},
        {maxAge: 900000, httpOnly: true}
      )
      await createChargeToCard(
        {
          amount,
          source,
          description,
          metadata,
          currency: 'usd'
        },
        async stripeKey => {
          if (stripeKey) {
            const transaction = await Transaction.create({
              stripeKey,
              userId: metadata.userId,
              status: 'Fulfilled'
            })
            if (transaction) {
              res.clearCookie('cart')
              res.clearCookie('transaction-pending')
              res.cookie('cart', [], {maxAge: 900000, httpOnly: true})
              res.send(transaction)
            }
          } else {
            res.clearCookie()
            res.cookie('cart', [], {maxAge: 900000, httpOnly: true})
            next('Error')
          }
        }
      )
    }
  } catch (err) {
    next(err)
  }
})
