const levelRepository = require('../repositories/level.repository');
const { notFound, forbidden } = require('../errors/app-error');

async function findOrFail(id) {
  const level = await levelRepository.findById(id);
  if (!level) throw notFound('LEVEL_NOT_FOUND', `No level has the id ${id}.`);
  return level;
}
function isOwner(level, user) {
  return level.host_id === user.user_id || user.role === 'ADMIN';
}

// Rule: a host sees their own levels. An admin sees every level.
function list(user) {
  return user.role === 'ADMIN'
    ? levelRepository.findAll()
    : levelRepository.findAllByHost(user.user_id);
}
// Rule: a level can be read only by its owner or an admin.
async function get(id, user) {
  const level = await findOrFail(id);
  if (!isOwner(level, user)) throw forbidden('This level belongs to another host.');
  return level;
}
// Rule: the owner is the caller. A client can never choose host_id.
function create(data, user) {
  return levelRepository.create({ ...data, host_id: user.user_id });
}
// Rule: only the owner (or an admin) may change or delete a level.
async function update(id, changes, user) {
  const level = await findOrFail(id);
  if (!isOwner(level, user)) throw forbidden('This level belongs to another host.');
  return levelRepository.update(level, changes);
}
async function remove(id, user) {
  const level = await findOrFail(id);
  if (!isOwner(level, user)) throw forbidden('This level belongs to another host.');
  await levelRepository.remove(level);
}

module.exports = { list, get, create, update, remove };