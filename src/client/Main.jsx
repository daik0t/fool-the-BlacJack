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
                    <li><button className="ui-btn" onClick={toPlay}><span>Play</span></button></li>
                    <li><button className="ui-btn" onClick={toInstructions}><span>How to play</span></button></li>
                    <li><button className="ui-btn" onClick={toLeaderboard}><span>Leaderboard</span></button></li>
                </ul>
            </main>
        </div>
    </div> 
    );
}

    
export default Main;