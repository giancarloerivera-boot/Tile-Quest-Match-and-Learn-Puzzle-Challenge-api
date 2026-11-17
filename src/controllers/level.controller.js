const { matchedData } = require('express-validator');
const levelService = require('../services/level.service');

// What a client is allowed to see of a level.
function toJson(level) {
  return {
    id: level.level_id,
    level_number: level.level_number,
    difficulty: level.difficulty,
    tile_count: level.tile_count,
    time_limit: level.time_limit,
    host_id: level.host_id,
  };
}

async function list(req, res) {
  const levels = await levelService.list(req.user);
  res.status(200).json(levels.map(toJson));
}
async function get(req, res) {
  const { id } = matchedData(req);
  const level = await levelService.get(id, req.user);
  res.status(200).json(toJson(level));
}
async function create(req, res) {
  const data = matchedData(req, { locations: ['body'] }); // only fields that passed a rule
  const level = await levelService.create(data, req.user);
  res.status(201).json(toJson(level));
}
async function update(req, res) {
  const { id } = matchedData(req, { locations: ['params'] });
  const changes = matchedData(req, { locations: ['body'] });
  const level = await levelService.update(id, changes, req.user);
  res.status(200).json(toJson(level));
}
async function remove(req, res) {
  const { id } = matchedData(req);
  await levelService.remove(id, req.user);
  res.status(204).end();
}

module.exports = { list, get, create, update, remove };