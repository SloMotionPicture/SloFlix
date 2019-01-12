const User = require('./user')
const Movie = require('./movie')
const Tag = require('./tag')
const Transaction = require('./transaction')
const MovieTransaction = require('./movieTransaction')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Transaction.belongsTo(User)
User.hasMany(Transaction)

Movie.belongsToMany(Transaction, {through: 'MovieTransaction'})
Transaction.belongsToMany(Movie, {through: 'MovieTransaction'})

Movie.belongsToMany(Tag, {through: 'Tag-Movie-Join-Table'})
Tag.belongsToMany(Movie, {through: 'Tag-Movie-Join-Table'})

module.exports = {
  User,
  Tag,
  Movie,
  Transaction,
  MovieTransaction
}
