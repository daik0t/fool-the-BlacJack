import React from "react";
import { useNavigate } from "react-router-dom";
import "./main.css";

function Main(){
    const navigate = useNavigate();
    
    const toPlay = () =>{
        navigate("./play");
    }

    const toInstructions = () =>{
        navigate("./instructions");
    }

    const toLeaderboard = () =>{
        navigate("./leaderboard");
    }
    
    return ( 
    <div className="group-btn">
        <main>
            <ul type="None">
                <li><button onClick={toPlay}>Play</button></li>
                <li><button onClick={toInstructions}>How to play</button></li>
                <li><button onClick={toLeaderboard}>Leaderboard</button></li>
            </ul>
        </main>
    </div>
    );
}

    
export default Main;