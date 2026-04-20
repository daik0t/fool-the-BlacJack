import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import "./main.css";

const StyledLink = styled(Link)`
      color: black;
      text-decoration:;
    `;

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
    <div>
        <div className="group-btn">
            <main>
                <ul type="None">
                    <li><button onClick={toPlay}>Play</button></li>
                    <li><button onClick={toInstructions}>How to play</button></li>
                    <li><button onClick={toLeaderboard}>Leaderboard</button></li>
                </ul>
            </main>
        </div>
    </div> 
    );
}

    
export default Main;