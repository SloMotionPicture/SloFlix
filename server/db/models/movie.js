const Sequelize = require('sequelize')
const db = require('../db')

const Movie = db.define('movies', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  cast: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  tag: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  summary: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  year: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rating: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  rentPrice: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  digitalPrice: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  physicalPrice: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
})

module.exports = Movie
