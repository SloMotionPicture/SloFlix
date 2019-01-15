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
// OB/MS: the /one part feels unnecessary
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
// OB/MS: recommend the query string, i.e. GET /api/movies?tags=WHATEVER instead of GET /api/movies/tags/WHATEVER
/*
Think of your route structure as representing a "resource", some "noun". Or think about your api like an object, where each / is dot or bracket notation. E.g. /api/movies/1 it could instead be api.movies[1]
This is considered standard, sometimes called "RESTful" routes
*/
router.get('/tags/:tag', async (req, res, next) => {
  try {
    const allMovies = await Movie.findAll({
      include: [{model: Tag}]
    })
    // OB/MS: instead of filter could query this at the SQL level via sequelize using `{where: {name: req.params.tag}` inside the include (you might also need `required: true` in there)
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

// OB/MS: cart does not need to be a "sub-resource" of movies, can be its own thing
router.get('/cart', async (req, res, next) => {
  try {
    if (!req.cookies.cart) {
      res.cookie('cart', [], {maxAge: 900000, httpOnly: true})
    }
    res.send({movies: req.cookies.cart})
  } catch (err) {
    // OB/MS: unnecessary log
    console.log('!!ERROR!!')
    next(err)
  }
})
// OB/MS: "verbs" usually don't need to be part of the URL, so below instead of POST /api/movies/addToCart/:movieId you could have POST /api/cart
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
