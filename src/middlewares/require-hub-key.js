// The Library Game Hub proves itself with the X-Hub-Key header. Results are never public.
module.exports = function requireHubKey(req, res, next) {
  const sent = req.get('X-Hub-Key');
  if (!sent || sent !== process.env.HUB_API_KEY) {
    return res.status(401).json({
      error: { code: 'HUB_KEY_REQUIRED', message: 'Send the correct X-Hub-Key header.' },
    });
  }
  return next();
};