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
    type: Sequelize.INTEGER,
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
    type: Sequelize.FLOAT,
    allowNull: false
  },
  digitalPrice: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  physicalPrice: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

module.exports = Movie
