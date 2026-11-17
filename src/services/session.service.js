const sessionRepository = require('../repositories/session.repository');
const levelRepository = require('../repositories/level.repository');
const { notFound, forbidden, conflict } = require('../errors/app-error');
const { constraintOf } = require('../errors/db-errors');

// The server makes the code: six digits, 100000 to 999999, so it never starts with 0.
function randomCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

async function findOrFail(code) {
  const session = await sessionRepository.findByCode(code);
  if (!session) throw notFound('SESSION_NOT_FOUND', `No game has the code ${code}.`);
  return session;
}

// A host may start a game on a level they own. level_id is optional.
async function create(data, user) {
  if (data.level_id) {
    const level = await levelRepository.findById(data.level_id);
    if (!level) throw notFound('LEVEL_NOT_FOUND', `No level has the id ${data.level_id}.`);
    if (level.host_id !== user.user_id && user.role !== 'ADMIN') {
      throw forbidden('This level belongs to another host.');
    }
  }
  const fields = { host_id: user.user_id, level_id: data.level_id || null, started_at: new Date() };
  if (data.max_players) fields.max_players = data.max_players;

  // A random code can already be in use. UNIQUE on session_code tells us, and we try again.
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    try {
      return await sessionRepository.create({ ...fields, session_code: randomCode() });
    } catch (error) {
      if (constraintOf(error) !== 'game_session_session_code_key') throw error;
    }
  }
  throw new Error('Could not find a free join code after 5 attempts.');
}

// Rule: only the host of that game (or an admin) may change its status.
async function changeStatus(code, status, user) {
  const session = await findOrFail(code);
  if (session.host_id !== user.user_id && user.role !== 'ADMIN') {
    throw forbidden('This game belongs to another host.');
  }
  // Rule (409): a game that has ended cannot change again, and cannot be reopened.
  if (session.status === 'CLOSED') {
    throw conflict('SESSION_ENDED', 'This game has ended and cannot be changed.');
  }
  if (status === session.status) {
    throw conflict('STATUS_UNCHANGED', `This game is already ${status}.`);
  }
  return sessionRepository.update(session, { status, ended_at: status === 'CLOSED' ? new Date() : null });
}

module.exports = { findOrFail, create, changeStatus };