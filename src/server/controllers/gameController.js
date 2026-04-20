import pool from '../config/db.js';

export const getScores = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blackjack.scores');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createScore = async (req, res) => {
  const { userId, score } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO blackjack.scores (user_id, score) VALUES ($1, $2) RETURNING *',
      [userId, score]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};