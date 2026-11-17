const playerRepository = require('../repositories/player.repository');
const sessionService = require('./session.service');
const { conflict } = require('../errors/app-error');
const { constraintOf } = require('../errors/db-errors');

async function join(code, nickname, user) {
  const session = await sessionService.findOrFail(code);

  // Rejoin: this account already has a seat here. Same row, same score.
  const seat = await playerRepository.findSeat(session.session_id, user.user_id);
  if (seat) return { session, seat, created: false };

  // New seat: only while the game is open, and only if there is room.
  if (session.status === 'CLOSED') throw conflict('SESSION_ENDED', 'This game has ended.');
  const seatsTaken = await playerRepository.countBySession(session.session_id);
  if (seatsTaken >= session.max_players) throw conflict('SESSION_FULL', 'This game is full.');

  try {
    const created = await playerRepository.create({
      session_id: session.session_id, user_id: user.user_id, nickname,
    });
    return { session, seat: created, created: true };
  } catch (error) {
    // The same account sent two joins at the same instant, and the other one won.
    if (constraintOf(error) === 'uq_seat_session_user') {
      const existing = await playerRepository.findSeat(session.session_id, user.user_id);
      return { session, seat: existing, created: false };
    }
    throw error; // a taken nickname reaches the error handler and answers 409
  }
}

module.exports = { join };