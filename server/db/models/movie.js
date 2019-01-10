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
  // OB/MS: could use an s ("tags")
  // OB/MS: direct association instead sounds more useful
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
  // OB/MS: it's considered best practice to use integer for currency data because of floating point math, and measure in pennies
  // OB/MS: maybe allowNull should be true so that you could determine (for example) if a movie has no physical copy
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
