
const config = {
    development: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: "postgres",
      port: process.env.DB_PORT,
    },
    production: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: "postgres",
      port: process.env.DB_PORT,
      url : process.env.DB_URL
    }
  }
  
  
  module.exports = config