// ONE Sequelize instance (one connection pool) for the whole API.
// Every other file imports it from here - nobody opens a second one.
const { Sequelize, DataTypes } = require('sequelize');
const env = require('../config/env');
const dbConfig = require('../config/database')[env.nodeEnv];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

// Load every model here, one line each.
const User = require('./user')(sequelize, DataTypes);
const Level = require('./level')(sequelize, DataTypes);
const GameSession = require('./game-session')(sequelize, DataTypes);
const Seat = require('./seat')(sequelize, DataTypes);

// Associations = the relationship lines of the ERD, read in both directions.
User.hasMany(Level, { foreignKey: 'host_id' });
Level.belongsTo(User, { foreignKey: 'host_id', as: 'host' });

User.hasMany(GameSession, { foreignKey: 'host_id' });
GameSession.belongsTo(User, { foreignKey: 'host_id', as: 'host' });

Level.hasMany(GameSession, { foreignKey: 'level_id' });
GameSession.belongsTo(Level, { foreignKey: 'level_id' });

GameSession.hasMany(Seat, { foreignKey: 'session_id' });
Seat.belongsTo(GameSession, { foreignKey: 'session_id' });

User.hasMany(Seat, { foreignKey: 'user_id' });
Seat.belongsTo(User, { foreignKey: 'user_id' });

module.exports = { sequelize, Sequelize, DataTypes, User, Level, GameSession, Seat };