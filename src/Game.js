import { useLocation } from "react-router-dom";
import {Decks} from "./deck.js";
import { useNavigate } from "react-router-dom";
import { CardJoker } from "game-icons-react/dist/delapouite/CardJoker.js";

function Game(){
    const location = useLocation();    
    const navigate = useNavigate();
    var deck = new Decks(location.state.data.deckNum);
    var playerNum = location.state.data.playerNum;
    deck.shuffle();    
    
    var value = 0;
    var dealerCard = deck.showCard();
    value += dealerCard.getValue();
    
    var cards = [];
    
    for (let i = 0;i < playerNum * 2;i++){
        var card = deck.showCard();
        value += card.getValue();
        if (i % 2 === 0){
            cards.push(<svg width={125} height={125} viewBox="-3 0 24 24">
                {card.getIcon()}
            </svg>); 
        } else {
            cards.push(<svg width={125} height={125} viewBox="3 0 24 24">
                {card.getIcon()}
            </svg>); 
        }
    }

    deck.showCard();

    const toPlay = () =>{
        navigate("../play");
    }

    return (
        <div>
            <footer align="center">
                <h1>
                    Fool the blackkack
                </h1>
            </footer>
            <main>
                <div className="gameStats">
                    <button onClick={toPlay}>Back</button>
                    Жизни: x
                    Счёт: {value}
                </div>
                <div className="dealer" align="center">
                    <svg width={125} height={125} viewBox="-3 0 24 24">
                        {dealerCard.getIcon()}    
                    </svg>
                    <svg width={125} height={125} viewBox="3 0 24 24">
                        <CardJoker/>    
                    </svg>
                </div>
                <div className="players" align="center">
                    {cards}
                </div>
            </main>
        </div>
    );
}

export default Game;