const Sequelize = require('sequelize')
const db = require('../db')

const MovieTransaction = db.define('MovieTransaction', {
  price: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  typeOfTransaction: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

module.exports = MovieTransaction
