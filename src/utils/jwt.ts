import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "";

export const generateToken = (payload: any): string => {
  return jwt.sign(payload, secret, { expiresIn: "1h" }); // Set expiration time as desired
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, secret);
};
