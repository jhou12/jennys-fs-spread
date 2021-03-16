const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv').config()

const sequelize = new Sequelize({
  dialect: 'mysql',
  username: process.env.SQL_USER,
  password: process.env.SQL_PASS,
  database: 'test',
})

sequelize.authenticate()
.then(() => console.log('Sequelize connected.'))
.catch(err => console.log('sequelize connection error:', err))

const Test = sequelize.define('Test', {
  testId: {
    type: DataTypes.INTEGER,
    // primaryKey: true,
    // allowNull: false,
    // autoIncrement: true,
  },
  testText: Sequelize.TEXT,
}, { timestamps: false
})

const readAll = async () => {
  try {
    let entries = await Test.findAll({
      raw: true,
    })
    return entries
  } catch(e) {
    console.log('db readAll error:', e)
  }
}

module.exports = {
  sequelize,
  Test,
  readAll,
}