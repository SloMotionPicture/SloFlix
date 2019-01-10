const Sequelize = require('sequelize')
const db = require('../db')

// OB/MS: do you need this model? yes
const Tag = db.define('tags', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Tag
