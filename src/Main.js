import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
    <div className="Main">
        <header>
            <h1>
                Fool the Blacjack
            </h1>
        </header>
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