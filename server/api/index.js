const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/movies', require('./movies'))
router.use('/transactions', require('./transactions'))
router.use('/tags', require('./tags'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
