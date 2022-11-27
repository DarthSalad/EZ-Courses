import express from 'express';
import jwt from 'jsonwebtoken';
import pool from '../db.js';
import bcrypt from 'bcrypt';
import { jwtTokens, parseJwt } from '../utils/jwt-helpers.js';
import { authenticateToken } from '../middleware/authorization.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    console.log(req.cookies, req.get('origin'));
    const { email, password } = req.body;
    const users = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);
    if (users.rows.length === 0) return res.status(401).json({ error: "Email is incorrect" });

    const validPassword = await bcrypt.compare(password, users.rows[0].user_password);
    if (!validPassword) return res.status(401).json({ error: "Incorrect password" });
    // console.log(users.rows[0]);
    let tokens = jwtTokens(users.rows[0]);//Gets access and refresh tokens
    res.cookie('refresh_token', tokens.refreshToken, { ...(process.env.COOKIE_DOMAIN && { domain: process.env.COOKIE_DOMAIN }), httpOnly: true, sameSite: 'none', secure: true });
    res.cookie('auth_token', tokens.refreshToken, { ...(process.env.COOKIE_DOMAIN && { domain: process.env.COOKIE_DOMAIN }), maxAge: 1296 * Math.pow(10, 6), httpOnly: false, sameSite: 'none', secure: true }).header('auth_token', tokens.refreshToken);
    res.status(200).send({ message: "Logged in succesfully", tokens: tokens });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }

});

router.get('/refresh_token', (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    console.log(req.cookies);
    if (refreshToken === null) return res.sendStatus(401);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
      if (error) return res.status(403).json({ error: error.message });
      let tokens = jwtTokens(user);
      res.cookie('refresh_token', tokens.refreshToken, { ...(process.env.COOKIE_DOMAIN && { domain: process.env.COOKIE_DOMAIN }), httpOnly: true, sameSite: 'none', secure: true });
      return res.json(tokens);
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.delete('/logout', authenticateToken, (req, res) => {
  try {
    res.clearCookie('refresh_token');
    return res
      .status(200)
      .clearCookie('auth_token')
      .json({ message: 'Refresh token deleted.' });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  try {
    const token = req.cookies.refresh_token;
    // if (token === '') return res.json({message: "Session expired, please login again"});
    res.status(200).json({
      auth: true,
      data: parseJwt(token)
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

export default router;