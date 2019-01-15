const router = require('express').Router()
const {User} = require('../db/models')
const {
  verifyCard,
  createCardObjectWithParams
} = require('../stripe/stripe-helper')

module.exports = router

//Find All Users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// OB/MS: like over in movies, this feels like it could be more standard, RESTful
//Find One User
router.get('/one/:id', async (req, res, next) => {
  console.log(req.user)
  try {
    if (req.user.id == req.params.id || req.user.adminStatus) {
      const user = await User.findOne({
        where: {
          id: req.params.id
        }
      })
      res.json(user)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/address', (req, res, next) => {
  try {
    console.log('INSIDE', req.body)
    if (req.user) {
      const user = User.update(
        {
          ...req.body
        },
        {
          where: {
            id: req.user.id
          }
        }
      )
      res.send(user)
    } else {
      res.send({...req.body})
    }
  } catch (err) {
    next(err)
  }
})
router.post('/verifyCard', async (req, res, next) => {
  try {
    const token = await verifyCard(
      createCardObjectWithParams(req.body),
      async token => {
        if (token) {
          if (req.user) {
            const user = await User.update(
              {
                token
              },
              {
                where: {
                  id: req.user.id
                }
              }
            )
            res.send(user)
          } else {
            res.send({token})
          }
        } else {
          next(err)
        }
      }
    )
  } catch (err) {
    next(err)
  }
})
