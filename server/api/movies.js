const router = require('express').Router()
var Cookies = require('cookies')
var keys = ['keyboard cat']
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
    if (!req.cookies.cart) {
      res.cookie('cart', [], {maxAge: 900000, httpOnly: true})
    }
    res.send({movies: req.cookies.cart})
  } catch (err) {
    console.log('!!ERROR!!')
    next(err)
  }
})
router.post('/addToCart/:movieId', (req, res, next) => {
  try {
    let cart = req.cookies.cart
    if (!cart) {
      res.cookie('cart', [req.params.movieId], {maxAge: 900000, httpOnly: true})
    } else {
      cart.push(req.params.movieId)
      res.cookie('cart', cart, {maxAge: 900000, httpOnly: true})
    }
    res.send()
  } catch (err) {
    next(err)
  }
})
