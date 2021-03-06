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
  status: {
    type: Sequelize.ENUM('Pending', 'Closed', 'Fulfilled', 'Refunded')
  }
})

module.exports = Transaction
