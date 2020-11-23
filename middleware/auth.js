const jwt = require('jsonwebtoken');
const config = require('config');
let jwtSecret;
if (process.env.NODE_ENV === 'production') {
  jwtSecret = process.env.jwtSecret;
} else {
  jwtSecret = config.get('jwtSecret');
}

module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // if token exists
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    req.status(401).json({ msg: 'Token is not valid' });
  }
};
