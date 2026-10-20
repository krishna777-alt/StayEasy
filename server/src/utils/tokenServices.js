import jwt from "jsonwebtoken";
import crypto from "crypto";

//AccessToken
export const generateAccessToken = function (userId) {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_SECRET_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
  });

  return accessToken;
};

//RefreshToken
export const generateRefreshToken = function (userId) {
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_SECRET_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
  });

  return refreshToken;
};

export const hashToken = function (token) {
  return crypto.createHash("sha256").update(token).digest("hex");
};
