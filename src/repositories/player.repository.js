const { Seat } = require('../models');

function findSeat(sessionId, userId) {
  return Seat.findOne({ where: { session_id: sessionId, user_id: userId } });
}
function countBySession(sessionId) {
  return Seat.count({ where: { session_id: sessionId } });
}
function create(data) {
  return Seat.create(data);
}

module.exports = { findSeat, countBySession, create };