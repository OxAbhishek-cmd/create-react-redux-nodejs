import { config } from "dotenv";("dotenv");
import jwt from "jsonwebtoken";
config();
const JWT_SECRET = process.env.JWT_SECRET;
const fetchUser = async (req, res, next) => {
  const token = req.header('authtoken');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token missing.' });
  }
  const data = jwt.verify(token, JWT_SECRET);

  const user_id = data.user_id;
  const reason = data.reason;

  try {
    const user = await User.findById(user_id);

    if (!user) {
      return res.status(401).json({ error: 'Access denied. User not found.' });
    }

    if (user.tokenInvalidatedAt !== null && user.tokenInvalidatedAt > user.tokenCreatedAt) {
      return res.status(401).json({ error: 'Access denied. Please reauthenticate.' });
    }

    // Pass the user to the next middleware
    req.user = { _id: user._id ,reason};
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong.' });
  }
};

module.exports = fetchUser;
