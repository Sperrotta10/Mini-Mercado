import { Router } from 'express';
import { AuthController } from '../controller/auth.js';
import passport from 'passport';
import { authenticateHybrid } from '../../../../middlewares/auth/authentificate.js'
import { loginLimiter, forgotPasswordLimiter, resetPasswordLimiter, googleCallbackLimiter, googleRedirectLimiter, logoutLimiter} from "../../../../middlewares/rate_limiters/user/auth.js"

export const authRouter = Router();

authRouter.post('/login', loginLimiter, AuthController.login);
authRouter.post('/forgot-password', forgotPasswordLimiter, AuthController.forgotPassword);
authRouter.post('/reset-password', resetPasswordLimiter, AuthController.resetPassword);

authRouter.get('/google', googleRedirectLimiter,
  passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback', googleCallbackLimiter,
  passport.authenticate('google', { 
    failureRedirect: '/login',
    successRedirect: 'http://localhost:3000/' // Redirige al frontend
  })
);

authRouter.post('/logout', authenticateHybrid, logoutLimiter, AuthController.logout);
authRouter.post('/google/logout', authenticateHybrid, logoutLimiter, AuthController.googleLogout);
