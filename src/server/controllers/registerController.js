import pool from '../config/db.js';
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
  const { email, password, username } = req.body;
    try {
      const password_hash = await bcrypt.hash(password, 10);
      const result = await pool.query(
        'INSERT INTO blackjack.users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
        [username, email, password_hash]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      if (err.code === '23505') {
        res.status(400).json({ error: 'User with this email or username already exists' });
      } else {
        res.status(500).json({ error: err.message });
      }
    }
  };