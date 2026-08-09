import jwt from "jsonwebtoken";

export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.secret_jwt,
    {
      expiresIn: "15m",
    },
  );
};




export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    process.env.secret_jwt,
    {
      expiresIn: "7d",
    },
  );
};
