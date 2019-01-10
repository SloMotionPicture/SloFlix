const router = require('express').Router()
const {Movie} = require('../db/models')
module.exports = router

//Finds All Movies
router.get('/', async (req, res, next) => {
  try {
    const allMovies = await Movie.findAll()
    res.send(allMovies)
  } catch (error) {
    next(error)
  }
})

//Find one Movie
router.get('/:id', async (req, res, next) => {
  try {
    const singleMovie = await Movie.findOne({
      where: {
        id: req.params.id
      }
    })
    res.json(singleMovie)
  } catch (error) {
    next(error)
  }
})

router.post('/addToCart/:movieId', (req, res, next) => {
  try {
    if (!req.session.passport.movies) {
      req.session.passport.movies = []
    }
    req.session.passport.movies.push(req.params.movieId)
    console.log('Current Cart:', req.session.passport)
    req.session.save(err => {
      if (err) {
        console.log(err)
      } else {
        console.log('Session Saved')
      }
    })
  } catch (err) {
    next(err)
  }
})
