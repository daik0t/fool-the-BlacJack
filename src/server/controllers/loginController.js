import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key';

export const logIn = async (req, res) => {
    const { email, password } = req.body;
      try {
        const result = await pool.query('SELECT * FROM blackjack.users WHERE email = $1', [email]);
        if (result.rows.length === 0) {
          return res.status(401).json({ error: 'Invalid email or password1' });
        }
        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
          { userId: user.id, email: user.email, username: user.username },
          JWT_SECRET,
          { expiresIn: '24h' }
        );

        res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };