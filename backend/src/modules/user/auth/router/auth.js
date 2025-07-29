import { Router } from 'express';
import { AuthController } from '../controller/auth.js';
import passport from 'passport';
import { authenticateHybrid } from '../../../../middlewares/auth/authentificate.js'

export const authRouter = Router();

authRouter.post('/login', AuthController.login);
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

authRouter.post('/logout', authenticateHybrid, AuthController.logout);
authRouter.post('/google/logout', authenticateHybrid, AuthController.googleLogout)
