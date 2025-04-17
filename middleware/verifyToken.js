// In another file, for example in your middleware or routes
const admin = require("./firebaseConfig");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];  // Extract token from Authorization header
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  try {

    const decodedToken = await admin.auth().verifyIdToken(token);

    // Attach user data to the request object
    req.user = decodedToken;

    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};


module.exports = verifyToken;
