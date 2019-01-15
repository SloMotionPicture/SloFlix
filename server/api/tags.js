const router = require('express').Router()
const {Tag, Movie} = require('../db/models')
module.exports = router

//Finds All Tags
router.get('/', async (req, res, next) => {
  try {
    const allTags = await Tag.findAll({include: {model: Movie}})
    res.json(allTags)
  } catch (error) {
    next(error)
  }
})
