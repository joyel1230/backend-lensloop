import jwt from "jsonwebtoken";

export const generateJwt = (data: {}) => {
  try {
    const token = jwt.sign(JSON.stringify(data), process.env.JWT_KEY);
    return token;
  } catch (error) {
    console.log(error.message);
  }
};


