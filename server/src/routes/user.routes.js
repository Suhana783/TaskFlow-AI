import express from 'express';
import {
  changePassword,
  registerUser,
  loginUser
} from '../controllers/user.controller.js';

const router = express.Router();

// Change password
router.put('/change-password', changePassword);

// Register user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

export default router;
