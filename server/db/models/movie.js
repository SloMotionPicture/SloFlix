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
    type: Sequelize.INTEGER,
    allowNull: false
  },
  digitalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  physicalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Movie
