import { useLocation } from "react-router-dom";
import { Decks } from "./deck.js";
import { useNavigate } from "react-router-dom";
import { CardJoker } from "game-icons-react/dist/delapouite/CardJoker.js";
import { useState, useEffect } from "react";

function Game(){
    const location = useLocation();    
    const navigate = useNavigate();
    const { deckNum, playerNum } = location.state.data;

    const [deck, setDeck] = useState(null);
    const [cards, setCards] = useState([]);
    const [value, setValue] = useState(0);
    const [dealerCard, setDealerCard] = useState([]);
    const [text, setText] = useState(null)
    
    useEffect(() => {
        setText('начало')

        const newDeck = new Decks(deckNum);
        newDeck.shuffle();
        setDeck(newDeck);

        let newValue = 0;

        const initialDealerCards = [];
        for (let i = 0; i < 2; i++){
            const card = newDeck.showCard();
            newValue += i % 2 === 0 ? card.getValue() : 0;
            initialDealerCards.push(
                <svg width={125} height={125} viewBox={i % 2 === 0 ? "-3 0 24 24" : "3 0 24 24"}>
                    {i % 2 === 0 ? card.getIcon() : <CardJoker/>}
                </svg>
            );
        }

        const initialCards = [];
        for (let i = 0; i < playerNum * 2; i++) {
            const card = newDeck.showCard();
            newValue += card.getValue();
            initialCards.push(
                <svg width={125} height={125} viewBox={i % 2 === 0 ? "-3 0 24 24" : "3 0 24 24"}>
                    {card.getIcon()}
                </svg>
            );
        }
        newDeck.showCard();
        setDealerCard(initialDealerCards)
        setCards(initialCards);
        setValue(newValue);
    }, [deckNum, playerNum]);

    const makeHands = () => {
        if (!deck) return;
        let newValue = value;

        const newDealerCard = [];
        for (let i = 0; i < 2; i++){
            const card = deck.showCard();
            newValue += i % 2 === 0 ? card.getValue() : 0;
            newDealerCard.push(
                <svg width={125} height={125} viewBox={i % 2 === 0 ? "-3 0 24 24" : "3 0 24 24"}>
                    {i % 2 === 0 ? card.getIcon() : <CardJoker/>}
                </svg>
            );
        }

        const newCards = [];
        for (let i = 0; i < playerNum * 2; i++) {
            const card = deck.showCard();
            newValue += card.getValue();
            newCards.push(
                <svg width={125} height={125} viewBox={i % 2 === 0 ? "-3 0 24 24" : "3 0 24 24"}>
                    {card.getIcon()}
                </svg>
            );
        }
        setDealerCard(newDealerCard)
        setCards(newCards);
        setValue(newValue);
    }

    const checkScore = (score) => {
        setText(score == value ? "ДА" : "НЕТ");
    }

    const toPlay = () =>{
        navigate("../play");
    }

    const HandleSubmit = (e) =>{    
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        checkScore(formJson["score"]);
        makeHands();
    }

    if (!deck || !dealerCard) return <div>Загрузка...</div>;

    return (
        <div>
            <footer align="center">
                <h1>
                    Fool the blackjack
                </h1>
            </footer>
            <main>
                
                <div className="gameStats">
                    <button onClick={toPlay}>Back</button>
                    Жизни: x
                    Счёт: {value}
                    Проверка: {text}
                </div>
                
                <div className="dealer" align="center">
                    {dealerCard}
                </div>
                
                <div className="players" align="center">
                    {cards}
                </div>

                <form method="post" onSubmit={HandleSubmit} align="center">
                        <input name="score" type="number" placeholder="Общий счет" />
                        <button type="submit">Ok</button>
                </form>
            </main>
        </div>
    );
}

export default Game;