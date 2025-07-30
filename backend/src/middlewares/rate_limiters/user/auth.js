import { createRateLimiter } from "../rateLimiterFactory";

// 🔐 Login - proteger contra ataques de fuerza bruta
export const loginLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000, // 10 minutos
  max: 5,
  message: 'Demasiados intentos de inicio de sesión. Intenta de nuevo en 10 minutos.',
});

// 📧 Forgot Password - limitar spam de emails
export const forgotPasswordLimiter = createRateLimiter({
  windowMs: 30 * 60 * 1000, // 30 minutos
  max: 3,
  message: 'Has solicitado demasiados correos de recuperación. Intenta más tarde.',
});

// 🔁 Reset Password - proteger contra prueba de tokens inválidos
export const resetPasswordLimiter = createRateLimiter({
  windowMs: 1 * 60 * 60 * 1000, // 1 hora
  max: 5,
  message: 'Demasiados intentos de restablecer contraseña. Intenta más tarde.',
});

// 🌐 Google OAuth Redirect
export const googleRedirectLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: 'Demasiadas redirecciones a Google en poco tiempo.',
});

// 🌐 Google OAuth Callback
export const googleCallbackLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: 'Demasiadas solicitudes de autenticación por Google.',
});

// 🚪 Logout (normal y Google)
export const logoutLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: 'Demasiadas solicitudes de cierre de sesión. Intenta más tarde.',
});
