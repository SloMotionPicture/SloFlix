const router = require('express').Router()
const {Transaction} = require('../db/models')
module.exports = router

//Finds All Transactions
router.get('/', async (req, res, next) => {
  try {
    const allTransactions = await Transaction.findAll()
    res.send(allTransactions)
  } catch (error) {
    next(error)
  }
})

// OB/MS: not exactly a standard URI format
/*
Right now a request would come in that looks like GET /api/transactions/5 which finds the transactions for user "5"
But that's misleading, the URI structure makes it look like "5" refers to a transaction id but it does not
This is important for building standardized backends, that behave in a common expected manner ("RESTful" design)
Instead you could do:
GET /api/transactions?userId=5
...or...
GET /api/users/5/transactions
*/
//Find User Transactions
router.get('/:userId', async (req, res, next) => {
  try {
    const userTrasactions = await Transaction.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.send(userTrasactions)
  } catch (error) {
    next(error)
  }
})
