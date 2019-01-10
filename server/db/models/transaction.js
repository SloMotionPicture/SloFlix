const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transactions', {
  stripeKey: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  // OB/MS: could have an association (many-to-many)
  // OB/MS: you might want to store the price of a movie when it was ordered, and also maybe what type of transaction for each movie
  movies: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  // OB/MS: sequelize automatically has a createdAt field you might use
  date: {
    type: Sequelize.DATE
  }
  // OB/MS: consider a "status" field
})

module.exports = Transaction
