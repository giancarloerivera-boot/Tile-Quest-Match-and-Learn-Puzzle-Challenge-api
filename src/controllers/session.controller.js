const { matchedData } = require('express-validator');
const sessionService = require('../services/session.service');

function toJson(session) {
  return {
    id: session.session_id,
    code: session.session_code,
    status: session.status,
    host_id: session.host_id,
    level_id: session.level_id,
    max_players: session.max_players,
    started_at: session.started_at,
    ended_at: session.ended_at,
  };
}

async function create(req, res) {
  const data = matchedData(req, { locations: ['body'] });
  const session = await sessionService.create(data, req.user);
  res.status(201).json(toJson(session));
}
async function get(req, res) {
  const { code } = matchedData(req);
  res.status(200).json(toJson(await sessionService.findOrFail(code)));
}
async function changeStatus(req, res) {
  const { code } = matchedData(req, { locations: ['params'] });
  const { status } = matchedData(req, { locations: ['body'] });
  const session = await sessionService.changeStatus(code, status, req.user);
  res.status(200).json(toJson(session));
}

module.exports = { create, get, changeStatus };