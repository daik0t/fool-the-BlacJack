import { useLocation, useNavigate } from "react-router-dom";
import { Decks } from "./deck.jsx";
import { useState, useEffect } from "react";
import "./game.css";
import { useAuth } from './context/AuthContext';

const playerFactor = {
    1 : 1.0,
    2 : 1.2,
    3 : 1.4,
    4 : 1.55,
    5 : 1.7
};

const deckFactor = {
    1 : 1.0,
    2 : 1.05,
    3 : 1.1,
    4 : 1.15,
    5 : 1.2
};

const timeFactor = {
    'UltraFast' : 1.4,
    'SuperFast' : 1.2,
    'Fast' : 1.1,
    'Normal' : 1.0,
    'Slow' : 0.9
};

const streakFactor = {
    'Huh' : 1.0,
    'Ok' : 1.2,
    'Not Bad' : 1.3,
    'Good' : 1.4,
    'Wow' : 1.6,
    'Unbelievable' : 1.8
};

const basePoints = 100;

function Game(){
    const location = useLocation();    
    const navigate = useNavigate();
    const { deckNum, playerNum } = location.state.data;

    const [deck, setDeck] = useState(null);
    const [cards, setCards] = useState([]);
    const [value, setValue] = useState(0);
    const [dealerCard, setDealerCard] = useState([]);
    const [lives, setLives] = useState(3);
    const [points, setPoints] = useState(0);
    const [startTime, setStart] = useState(Date.now());
    const [streak, setStreak] = useState(0)

    const { token } = useAuth();
    
    useEffect(() => {

        const newDeck = new Decks(deckNum);
        newDeck.shuffle();
        setDeck(newDeck);

        let newValue = 0;

        const initialDealerCards = [];
        for (let i = 0; i < 2; i++) {
            const card = newDeck.showCard();
            newValue += i % 2 === 0 ? card.getValue() : 0;
            if (i % 2 === 0) {
                initialDealerCards.push(
                    <div key={i} className="dealer-pair">
                        <img src={card.getIcon()} alt={card.getIcon()} className="card dealer-left" />
                        <img src="/src/client/cards/card-back.svg" alt="back" className="card dealer-right" />
                    </div>
                );
            } 
        }

        const initialCards = [];
        for (let i = 0; i < playerNum; i++) {
            const leftCard = newDeck.showCard();
            const rightCard = newDeck.showCard();
            newValue += leftCard.getValue();
            newValue += rightCard.getValue();
            initialCards.push(
                <div key={i} id={`n${i}`} className="card-pair">
                    <img src={leftCard.getIcon()} alt={leftCard.getIcon()}  className="card left-card" />
                    <img src={rightCard.getIcon()} alt={rightCard.getIcon()} className="card right-card" />
                </div>
            );
        }
        newDeck.showCard();
        setDealerCard(initialDealerCards)
        setCards(initialCards);
        setValue(newValue);
        
    }, [deckNum, playerNum]);

    useEffect(() => {
        if (lives === 0 && points > 0) {
          fetch('http://localhost:3000/api/scores', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ score: points })
          }).catch(err => console.error('Failed to save score', err));
        }
      }, [lives, points, token]);


    const getCard = () => {
        let card = deck.showCard();
        if (!card) {
            const newDeck = new Decks(deckNum);
            newDeck.shuffle();
            card = newDeck.showCard();
            setDeck(newDeck)
        }
        
        return card;
    }

    const makeHands = () => {
        let newValue = value;

        const newDealerCard = [];
        for (let i = 0; i < 2; i++) {
            const card = getCard();
            newValue += i % 2 === 0 ? card.getValue() : 0;
            if (i % 2 === 0) {
                newDealerCard.push(
                    <div key={i} className="dealer-pair">
                        <img src={card.getIcon()} alt={card.getIcon()} className="card dealer-left" />
                        <img src="/src/client/cards/card-back.svg" alt="back" className="card dealer-right" />
                    </div>
                );
            } 
        }

        const newCards = [];
        for (let i = 0; i < playerNum; i++) {
            const leftCard = getCard();
            const rightCard = getCard();
            newValue += leftCard.getValue();
            newValue += rightCard.getValue();
            newCards.push(
                <div key={i} id={`n${i}`} className="card-pair">
                    <img src={leftCard.getIcon()} alt={leftCard.getIcon()}  className="card left-card" />
                    <img src={rightCard.getIcon()} alt={rightCard.getIcon()} className="card right-card" />
                </div>
            );
        }
        setDealerCard(newDealerCard)
        setCards(newCards);
        setValue(newValue);
        
    }

    const timePoints = (timeElapsed) => {
        if (timeElapsed <= 2) return 'UltraFast';
        if (timeElapsed <= 4) return 'SuperFast';
        if (timeElapsed <= 8) return 'Fast';
        if (timeElapsed <= 16) return 'Normal';
        return 'Slow';
    }

    const streakPoints = () => {
        if (streak >= Math.floor(100 / playerNum)) return 'Unbelievable';
        if (streak >= Math.floor(80 / playerNum)) return 'Wow'; 
        if (streak >= Math.floor(40 / playerNum)) return 'Good';
        if (streak >= Math.floor(15 / playerNum)) return 'Not Bad';
        if (streak >= Math.floor(10 / playerNum)) return 'Ok';
        return 'Huh';
    }

    const checkScore = (score) => {
        let timeElapsed = (Date.now() - startTime) / 1000;
        setStart(Date.now())
        
        if (score == value) {
            setPoints(points + Math.ceil(basePoints * playerFactor[playerNum] * deckFactor[deckNum] * timeFactor[timePoints(timeElapsed)] * streakFactor[streakPoints(streak)]))
        }
        else {
            setLives(lives - 1)
            setStreak(0)
        }
    }

    const toPlay = () =>{
        navigate("../play");
    }

    const HandleSubmit = (e) =>{    
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        form.reset();
        checkScore(formJson["score"]);
        makeHands();
    }

    if (!deck || !dealerCard) return <div>Загрузка...</div>;

    if (lives === 0) {
        
        return (
        <div className="again">
            <button onClick={toPlay}>Try Again</button>
        </div>
        );
    }

    console.log(value);
    
    return (
        <div>
            <main>
                <button className="back-btn" onClick={toPlay}>Back</button>
                <div className="gameStats">
                    Жизни: {lives}&nbsp; 
                    Счёт: {points}
                </div>
                
                <div className="game">

                    <div className="dealer" align="center">
                        {dealerCard}
                    </div>
                    
                    <div className="players" align="center">
                        {cards}
                    </div>

                </div>

                <form method="post" onSubmit={HandleSubmit} onClick={null} align="center">
                        <input name="score" type="number" placeholder="Общий счет" />
                        <button type="submit">Ok</button>
                </form>
            </main>
        </div>
    );
}

export default Game;