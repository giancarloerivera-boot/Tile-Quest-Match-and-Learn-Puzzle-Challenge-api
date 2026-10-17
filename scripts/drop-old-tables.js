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
    const [rows] = await sequelize.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name"
    );
    console.table(rows);
  } finally {
    await sequelize.close();
  }
})();