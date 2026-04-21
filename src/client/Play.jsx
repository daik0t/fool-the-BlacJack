import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./play.css";

function Play(){
    const navigate = useNavigate();
    const [playerNum, setPlayerNum] = useState(3);
    const [deckNum, setDeckNum] = useState(3);
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { playerNum, deckNum };
        navigate("/game", { state: { data } });
    };
      return (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="radio-group-container">
              <h3>Количество игроков</h3>
              <div className="radio-group">
                {[1, 2, 3, 4, 5].map((num) => (
                  <label key={`player-${num}`} className="quantum-radio">
                    <input
                      type="radio"
                      name="playerNum"
                      value={num}
                      checked={playerNum === num}
                      onChange={() => setPlayerNum(num)}
                    />
                    <span className="radio-control"></span>
                    <span className="radio-label">{num}</span>
                  </label>
                ))}
              </div>
            </div>
    
            <div className="radio-group-container">
              <h3>Количество колод</h3>
              <div className="radio-group">
                {[1, 2, 3, 4, 5].map((num) => (
                  <label key={`deck-${num}`} className="quantum-radio">
                    <input
                      type="radio"
                      name="deckNum"
                      value={num}
                      checked={deckNum === num}
                      onChange={() => setDeckNum(num)}
                    />
                    <span className="radio-control"></span>
                    <span className="radio-label">{num}</span>
                  </label>
                ))}
              </div>
            </div>
    
            <div className="btn-start" align="center">
              <button  className="ui-btn" type="submit"><span>Start Game</span></button>
            </div>
          </form>
        </div>
      );
}

export default Play;