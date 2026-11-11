module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'GameSession',
    {
      session_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      session_code: { type: DataTypes.STRING(6), allowNull: false, unique: true },
      status: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'OPEN' },
      host_id: { type: DataTypes.INTEGER },
      level_id: { type: DataTypes.INTEGER },
      max_players: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 30 },
      started_at: { type: DataTypes.DATE },
      ended_at: { type: DataTypes.DATE },
    },
    { tableName: 'game_session', timestamps: false }
  );