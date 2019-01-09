const router = require('express').Router()
const {Tag} = require('../db/models')
module.exports = router

//Finds All Tags
router.get('/', async(req, res, next)=>{
  try{
    const allTags = await Tag.findAll();
    res.json(allTags)
  }catch(error){
    next(error)
  }
})
