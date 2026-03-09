import { useLocation } from "react-router-dom";
import {Decks} from "./deck.js";

function Game(){
    const location = useLocation();    

    var deck = new Decks(location.state.data.deckNum);
    deck.shuffle();
    console.log(deck);
    const temp = 100;
    const t = `0 0 100 ${temp}`;
    return (
        <div>
            <svg viewBox={t}>
                {deck.showCard().getIcon()}
            </svg>
        </div>
    );
}

export default Game;