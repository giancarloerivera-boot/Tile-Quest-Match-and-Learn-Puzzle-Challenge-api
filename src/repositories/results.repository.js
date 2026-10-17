// Hub Contract rule 7. YOUR WORK (Lab Step 9): write the query for YOUR tables.
//
// Return one row per player per FINISHED game (a game whose status is CLOSED,
// or whatever your design calls a game that has ended), with exactly these names:
//
//   session_code   the six-digit join code of the game
//   started_at     when the game started (may be null)
//   ended_at       when the game ended
//   school_id      the player's school ID, from your users table
//   nickname       the nickname the player used in that game
//   score          the player's final score
//   completed      true or false: did this player complete the game?
//                  YOUR game decides what "completed" means. Write the rule
//                  in your README, for example "answered every question".
//
// If "since" is given, return only games that ended after it.
//
// An example for a design with game_sessions, players and users tables:
//
//   SELECT s.join_pin AS session_code, s.started_at, s.ended_at,
//          u.school_id, p.nickname, p.score,
//          (p.finished_at IS NOT NULL) AS completed
//     FROM game_sessions s
//     JOIN players p ON p.session_id = s.session_id
//     JOIN users u ON u.user_id = p.user_id
//    WHERE s.status = 'CLOSED'
//      AND (CAST(:since AS timestamptz) IS NULL OR s.ended_at > :since)
//    ORDER BY s.ended_at, p.score DESC
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');

async function findFinishedGamePlayers(since) {
  const sql = `
    SELECT CAST(NULL AS text)        AS session_code,
           CAST(NULL AS timestamptz) AS started_at,
           CAST(NULL AS timestamptz) AS ended_at,
           CAST(NULL AS text)        AS school_id,
           CAST(NULL AS text)        AS nickname,
           CAST(NULL AS integer)     AS score,
           CAST(NULL AS boolean)     AS completed
     WHERE FALSE
       AND (CAST(:since AS timestamptz) IS NULL OR TRUE)
  `;

  return sequelize.query(sql, {
    type: QueryTypes.SELECT,
    replacements: { since: since ? since.toISOString() : null },
  });
}

module.exports = { findFinishedGamePlayers };