// A database rule was broken -> what the client should hear.
// The key is the constraint name from YOUR migration. PostgreSQL names a
// foreign key "<table>_<column>_fkey" when the migration does not name it.
// A constraint that is not listed here still answers 409, with the code CONFLICT.
module.exports = {
  uq_seat_nickname: {
    status: 409,
    code: 'NICKNAME_TAKEN',
    message: 'That nickname is already used in this game.',
  },
  uq_seat_session_user: {
    status: 409,
    code: 'ALREADY_JOINED',
    message: 'This account already has a seat in this game.',
  },
  game_session_level_id_fkey: {
    status: 409,
    code: 'LEVEL_IN_USE',
    message: 'This level is used by a game and cannot be deleted.',
  },
};