const { matchedData } = require('express-validator');
const service = require('../services/hub-results.service');

async function get(req, res) {
  const { since } = matchedData(req, { locations: ['query'] });
  res.status(200).json(await service.build(since));
}

module.exports = { get };