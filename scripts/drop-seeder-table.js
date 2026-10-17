const { Sequelize } = require('sequelize');
const exported = require('../src/config/database.js');
const config = exported.development || exported;

(async () => {
  const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'postgres',
    logging: false,
  });

  try {
    await sequelize.query('DROP TABLE IF EXISTS "SequelizeData" CASCADE');
    console.log('Dropped: SequelizeData');
  } finally {
    await sequelize.close();
  }
})();