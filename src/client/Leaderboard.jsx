import { useEffect, useState } from "react";

function Leaderboard(){
  const [scores, setScores] = useState([]);
  const [period, setPeriod] = useState("all");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      try {
        const url = `http://localhost:3000/api/scores${period !== "all" ? `?period=${period}` : ""}`;
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

  return (
    <div>
      <h2>Leaderboard</h2>
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setPeriod("week")} style={{ marginRight: "10px" }}>
          За неделю
        </button>
        <button onClick={() => setPeriod("month")} style={{ marginRight: "10px" }}>
          За месяц
        </button>
        <button onClick={() => setPeriod("all")}>За всё время</button>
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