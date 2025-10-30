// backend-api/src/services/authService.js
import bcrypt from 'bcrypt'; // Changed from 'bcryptjs'
import jwt from 'jsonwebtoken';
import prisma from '../models/prisma.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

export const registerUser = async (email, password, name, role) => {
  // bcrypt.hash is async and returns a promise
  const hashedPassword = await bcrypt.hash(password, 10); // <-- No change in function call
  const user = await prisma.user.create({
    data: { email, password: hashedPassword, name, role },
  });
  return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, token: generateToken(user.id) };
};

export const loginUser = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) { // Check user existence first
    throw new Error('Invalid credentials');
  }
  // bcrypt.compare is async and returns a promise
  if (!(await bcrypt.compare(password, user.password))) { // <-- No change in function call
    throw new Error('Invalid credentials');
  }
  return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, token: generateToken(user.id) };
};

export const getCurrentUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, role: true },
  });
  return user;
};