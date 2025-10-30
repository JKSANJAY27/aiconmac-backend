// backend-api/src/controllers/authController.js
import * as authService from '../services/authService.js';

export const register = async (req, res, next) => {
  try {
    const { email, password, name, role } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('Please enter all fields');
    }
    const result = await authService.registerUser(email, password, name, role || 'VIEWER'); // Default to VIEWER
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('Please enter all fields');
    }
    const result = await authService.loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await authService.getCurrentUser(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};