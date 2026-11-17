module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'Level',
    {
      level_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      host_id: { type: DataTypes.INTEGER },
      level_number: { type: DataTypes.INTEGER, allowNull: false, unique: true },
      difficulty: { type: DataTypes.STRING(50), allowNull: false, defaultValue: 'Easy' },
      tile_count: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 16 },
      time_limit: { type: DataTypes.INTEGER },
    },
    { tableName: 'level', timestamps: false }
  );