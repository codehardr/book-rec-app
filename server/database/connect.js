import { Sequelize } from 'sequelize'
import mysql from 'mysql2/promise'
import Posts from '../model/posts.js'

const database = {}
const credentials = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'scifi_blog',
}

try {
  const connection = await mysql.createConnection({
    host: credentials.host,
    user: credentials.user,
    password: credentials.password,
  })
  await connection.query('CREATE DATABASE IF NOT EXISTS ' + credentials.database)
  const sequelize = new Sequelize(credentials.database, credentials.user, credentials.password, {
    dialect: 'mysql',
  })
  database.Posts = Posts(sequelize)
  await sequelize.sync({ alter: true })
} catch {
  console.log('Database connection failed')
}

export default database
