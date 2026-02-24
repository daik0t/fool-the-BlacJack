import React from "react";
import { Link } from "react-router-dom";

function main(){
    return ( 
    <div className="Main">
        <header>
            <h1>
                Fool the Blacjack
            </h1>
        </header>
        <main>
            <ul type="None">
                <li><Link to="./play">Play</Link></li>
                <li><Link to="./instructions"> How to play</Link></li>
                <li><Link to="./leaderboard">Leaderboard</Link></li>
            </ul>
        </main>
    </div>
    );
}

    
export default main;