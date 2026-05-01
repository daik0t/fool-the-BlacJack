import { useEffect, useState } from "react";
import "./leaderboard.css";

function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [period, setPeriod] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      try {
        const url = `/api/scores${period !== "all" ? `?period=${period}` : ""}`;
        const res = await fetch(url);
        const data = await res.json();
        setScores(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchScores();
  }, [period]);

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>

      {/* Стилизованные radio-табы */}
      <div className="tabs">
        <input
          type="radio"
          name="period"
          id="week"
          value="week"
          checked={period === "week"}
          onChange={handlePeriodChange}
          className="input"
        />
        <label htmlFor="week" className="label">За неделю</label>

        <input
          type="radio"
          name="period"
          id="month"
          value="month"
          checked={period === "month"}
          onChange={handlePeriodChange}
          className="input"
        />
        <label htmlFor="month" className="label">За месяц</label>

        <input
          type="radio"
          name="period"
          id="all"
          value="all"
          checked={period === "all"}
          onChange={handlePeriodChange}
          className="input"
        />
        <label htmlFor="all" className="label">За всё время</label>
      </div>

      {loading && <div>Загрузка...</div>}

      {!loading && (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Username</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {scores.length === 0 ? (
              <tr>
                <td colSpan="3">Нет результатов за выбранный период</td>
              </tr>
            ) : (
              scores.map((s, idx) => (
                <tr key={idx}>
                  <td>{s.username}</td>
                  <td>{s.score}</td>
                  <td>{new Date(s.played_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Leaderboard;