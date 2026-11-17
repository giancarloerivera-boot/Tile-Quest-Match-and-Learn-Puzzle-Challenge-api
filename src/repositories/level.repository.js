const { Level } = require('../models');

function findAll() {
  return Level.findAll({ order: [['level_id', 'ASC']] });
}
function findAllByHost(hostId) {
  return Level.findAll({ where: { host_id: hostId }, order: [['level_id', 'ASC']] });
}
function findById(id) {
  return Level.findByPk(id); // a row, or null
}
function create(data) {
  return Level.create(data);
}
function update(level, changes) {
  return level.update(changes);
}
function remove(level) {
  return level.destroy();
}

module.exports = { findAll, findAllByHost, findById, create, update, remove };