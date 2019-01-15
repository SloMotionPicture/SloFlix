const router = require('express').Router()
const {Transaction} = require('../db/models')
module.exports = router

//Finds All Transactions
router.get('/', async (req, res, next) => {
  try {
    // OB/MS: consider making this logic its own method, a Transaction class method `Transaction.getAllForUser(req.user)`, keep route handlers small
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
