const router = require('express').Router()
var Cookies = require('cookies')
var keys = ['keyboard cat']
const {Movie} = require('../db/models')
const {Tag} = require('../db/models')
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
      include: [{model: Tag}],
      where: {
        id: req.params.id
      }
    })
    res.json(singleMovie)
  } catch (error) {
    next(error)
  }
})

//Finds movie from tag
router.get('/tags/:tag', async (req, res, next) => {
  try {
    const allMovies = await Movie.findAll({
      include: [{model: Tag}]
    })
    const tagMovies = allMovies.filter(movie => {
      const tags = movie.tags.map(tagData => {
        return tagData.dataValues.name
      })
      return tags.includes(req.params.tag)
    })
    res.send(tagMovies)
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
router.delete('/cart/:index', (req, res, next) => {
  try {
    console.log(req.cookies.cart)
    if (req.cookies.cart) {
      let cart = req.cookies.cart
      cart.splice(req.params.index, 1)
      res.cookie('cart', cart, {
        maxAge: 900000,
        httpOnly: true
      })
      res.send(cart)
    } else {
      res.send()
    }
  } catch (err) {
    console.log(err)
  }
})
router.post('/addToCart', (req, res, next) => {
  try {
    let cart = req.cookies.cart
    if (!cart || cart === 'undefined') {
      let price
      res.cookie('cart', [{price: req.body.price, movieId: req.body.movieId}], {
        maxAge: 900000,
        httpOnly: true
      })
    } else {
      cart.push({price: req.body.price, movieId: req.body.movieId})
      res.cookie('cart', cart, {maxAge: 900000, httpOnly: true})
    }
    res.send()
  } catch (err) {
    next(err)
  }
})

router.get('/search/:value/:type', async (req, res, next) => {
  try {
    let movieSearch
    let newType = req.params.type.toLowerCase()
    console.log(req.params.value)
    const newValue = req.params.value
      .split(' ')
      .map(value => {
        value = value[0].toUpperCase() + value.slice(1)
        return value
      })
      .join(' ')
    console.log(newValue)
    if (newType === 'title') {
      movieSearch = await Movie.findAll({
        where: {
          [newType]: {$like: '%' + newValue + '%'}
        }
      })
    } else if (newType === 'actor') {
      newType = 'cast'
      movieSearch = await Movie.findAll({
        where: {
          [newType]: {$contains: [newValue]}
        }
      })
    }
    res.send(movieSearch)
  } catch (error) {
    console.error(error)
  }
})
