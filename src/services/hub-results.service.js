const repository = require('../repositories/hub-results.repository');

// Must match the slug that GET /game-info reports.
const GAME_SLUG = 'tile-quest-match-and-learn-puzzle-challenge';

function toPlayer(seat) {
  return {
    school_id: seat.User.school_id,
    nickname: seat.nickname,
    score: seat.score,
    completed: seat.completed,
  };
}

function toResult(session) {
  const players = session.Seats.map(toPlayer);
  const podium = players
    .filter((p) => p.completed)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((p, index) => ({ rank: index + 1, nickname: p.nickname, score: p.score }));
  return {
    session_code: session.session_code,
    ended_at: session.ended_at.toISOString(),
    players,
    podium,
  };
}

async function build(since) {
  const sessions = await repository.findFinishedGames(since);
  return {
    game: GAME_SLUG,
    generated_at: new Date().toISOString(),
    results: sessions.filter((s) => s.Seats.length > 0).map(toResult),
  };
}

module.exports = { build };