const { Op } = require('sequelize');
const { GameSession, Seat, User } = require('../models');

// Games that have ended, optionally only those that ended after `since`.
function findFinishedGames(since) {
  const ended = since ? { [Op.ne]: null, [Op.gt]: since } : { [Op.ne]: null };
  return GameSession.findAll({
    where: { ended_at: ended },
    include: [{ model: Seat, include: [{ model: User, attributes: ['school_id'] }] }],
    order: [['ended_at', 'DESC']],
  });
}

module.exports = { findFinishedGames };