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
    allowNull: true,
    defaultValue: 299
  },
  digitalPrice: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 799
  },
  physicalPrice: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 1299
  }
})
Movie.findAllWithArray = async movies => {
  try {
    return movies
  } catch (err) {
    console.log(err)
  }
}
module.exports = Movie
