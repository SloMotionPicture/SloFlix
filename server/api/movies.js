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
router.get('/one/:id', async (req, res, next) => {
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

router.get('/cart', async (req, res, next) => {
  try {
    res.send(req.session.passport)
  } catch (err) {
    console.log('ERROR!!')
    next(err)
  }
})
router.post('/addToCart/:movieId', (req, res, next) => {
  try {
    console.log(req.session)
    if (!req.session.passport.movies) {
      req.session.passport.movies = []
    }
    req.session.passport.movies.push(req.params.movieId)
    console.log('Current Cart:', req.session)
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
