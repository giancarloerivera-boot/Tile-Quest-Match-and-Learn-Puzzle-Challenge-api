const { matchedData } = require('express-validator');
const playerService = require('../services/player.service');

function toJson(seat, session) {
  return {
    player_id: seat.seat_id,
    session_code: session.session_code,
    user_id: seat.user_id,
    nickname: seat.nickname,
    score: seat.score,
    completed: seat.completed,
  };
}

async function join(req, res) {
  const { code } = matchedData(req, { locations: ['params'] });
  const { nickname } = matchedData(req, { locations: ['body'] });
  const { session, seat, created } = await playerService.join(code, nickname, req.user);
  res.status(created ? 201 : 200).json(toJson(seat, session));
}

module.exports = { join };