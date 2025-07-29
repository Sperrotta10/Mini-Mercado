import { Router } from 'express';
import { AuthController } from '../controller/auth.js';
import passport from 'passport';

export const authRouter = Router();

authRouter.post('/login', AuthController.login);
authRouter.post('/logout', AuthController.logout);
authRouter.post('/forgot-password', AuthController.forgotPassword);
authRouter.post('/reset-password', AuthController.resetPassword);

authRouter.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/login',
    successRedirect: 'http://localhost:3000/' // Redirige al frontend
  })
);

authRouter.post('/google/logout', AuthController.googleLogout)
