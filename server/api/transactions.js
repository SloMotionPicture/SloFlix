const router = require('express').Router()
const {Transaction} = require('../db/models')
module.exports = router

//Finds All Transactions
router.get('/', async (req, res, next)=>{
  try{
    const allTransactions = await Transaction.findAll();
    res.send(allTransactions)
  }catch(error){
    next(error)
  }
})

//Find User Transactions
router.get('/userId', async (req, res, next)=>{
  try{
    const userTrasactions = await Transaction.findAll({where:{
      userId: req.params.userId
    }})
    res.send(userTrasactions)
  }catch(error){
    next(error)
  }
})
