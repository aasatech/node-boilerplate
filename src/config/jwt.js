import "dotenv/config";
import jwt from 'jsonwebtoken';

const authConfig = {
	algorithms: ['HS256'],
	secret: process.env.JWT_SECRET,
};

export const generateToken = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        id: user.id,
      },
      authConfig.secret,
      {
        algorithm: authConfig.algorithms[0],
      },
      (err, token) => {
        if (err) {
          return reject(err);
        }
        if (!token) {
          return new Error('Empty token');
        }

        return resolve(token);
      }
    )
  })
}

export const verifyToken = async (token) => jwt.verify(token, authConfig.secret);
