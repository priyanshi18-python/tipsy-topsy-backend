import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as authRepo from "../repositories/auth.repo.js";

// ================= SIGNUP =================
export const signupService = async (data) => {

  if (!data.name || !data.email || !data.password) {
    throw new Error("All fields are required");
  }

  const existingUser = await authRepo.findUserByEmail(data.email);
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = await authRepo.createUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    phone: data.phone
  });

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { user: newUser, token };
};

// ================= LOGIN =================
export const loginService = async (data) => {

  if (!data.email || !data.password) {
    throw new Error("Email and password required");
  }

  const user = await authRepo.findUserByEmail(data.email);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  const { password, ...userData } = user;

  return { user: userData, token };
}; 