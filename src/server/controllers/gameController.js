import pool from '../config/db.js';

export const getScores = async (req, res) => {
  try {
    const { period } = req.query;
    let dateFilter = '';
    let params = [];

    const now = new Date();
    if (period === 'week') {
      const weekAgo = new Date(now.setDate(now.getDate() - 7));
      dateFilter = 'WHERE s.played_at >= $1';
      params = [weekAgo];
    } else if (period === 'month') {
      const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
      dateFilter = 'WHERE s.played_at >= $1';
      params = [monthAgo];
    }

    const query = `
      SELECT s.score, s.played_at, u.username 
      FROM blackjack.scores s
      JOIN blackjack.users u ON s.user_id = u.id
      ${dateFilter}
      ORDER BY s.score DESC
      LIMIT 10
    `;
    const result = await pool.query(query, params);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export const createScore = async (req, res) => {
  const userId = req.user.userId;
  const { score } = req.body;
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