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
  movies: {
    type: Sequelize.ARRAY(Sequelize.INTEGER)
  },
  date: {
    type: Sequelize.DATE
  }
})

module.exports = Transaction
