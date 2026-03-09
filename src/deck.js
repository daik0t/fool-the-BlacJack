import {Aussiesim} from "game-icons-react";
import React from "react";

var ICONS = {
    "Spades2": <Aussiesim.Card2Spades/>,
    "Spades3": <Aussiesim.Card3Spades/>,
    "Spades4": <Aussiesim.Card4Spades/>,
    "Spades5": <Aussiesim.Card5Spades/>,
    "Spades6": <Aussiesim.Card6Spades/>,
    "Spades7": <Aussiesim.Card7Spades/>,
    "Spades8": <Aussiesim.Card8Spades/>,
    "Spades9": <Aussiesim.Card9Spades/>,
    "Spades10": <Aussiesim.Card10Spades/>,
    "SpadesJ": <Aussiesim.CardJackSpades/>,
    "SpadesQ": <Aussiesim.CardQueenSpades/>,
    "SpadesK": <Aussiesim.CardKingSpades/>,
    "SpadesA": <Aussiesim.CardAceSpades/>,

    "Diamonds2": <Aussiesim.Card2Diamonds color="red"/>,
    "Diamonds3": <Aussiesim.Card3Diamonds color="red"/>,
    "Diamonds4": <Aussiesim.Card4Diamonds color="red"/>,
    "Diamonds5": <Aussiesim.Card5Diamonds color="red"/>,
    "Diamonds6": <Aussiesim.Card6Diamonds color="red"/>,
    "Diamonds7": <Aussiesim.Card7Diamonds color="red"/>,
    "Diamonds8": <Aussiesim.Card8Diamonds color="red"/>,
    "Diamonds9": <Aussiesim.Card9Diamonds color="red"/>,
    "Diamonds10": <Aussiesim.Card10Diamonds color="red"/>,
    "DiamondsJ": <Aussiesim.CardJackDiamonds color="red"/>,
    "DiamondsQ": <Aussiesim.CardQueenDiamonds color="red"/>,
    "DiamondsK": <Aussiesim.CardKingDiamonds color="red"/>,
    "DiamondsA": <Aussiesim.CardAceDiamonds color="red"/>,

    "Clubs2": <Aussiesim.Card2Clubs/>,
    "Clubs3": <Aussiesim.Card3Clubs/>,
    "Clubs4": <Aussiesim.Card4Clubs/>,
    "Clubs5": <Aussiesim.Card5Clubs/>,
    "Clubs6": <Aussiesim.Card6Clubs/>,
    "Clubs7": <Aussiesim.Card7Clubs/>,
    "Clubs8": <Aussiesim.Card8Clubs/>,
    "Clubs9": <Aussiesim.Card9Clubs/>,
    "Clubs10": <Aussiesim.Card10Clubs/>,
    "ClubsJ": <Aussiesim.CardJackClubs/>,
    "ClubsQ": <Aussiesim.CardQueenClubs/>,
    "ClubsK": <Aussiesim.CardKingClubs/>,
    "ClubsA": <Aussiesim.CardAceClubs/>,

    "Hearts2": <Aussiesim.Card2Hearts color="red"/>,
    "Hearts3": <Aussiesim.Card3Hearts color="red"/>,
    "Hearts4": <Aussiesim.Card4Hearts color="red"/>,
    "Hearts5": <Aussiesim.Card5Hearts color="red"/>,
    "Hearts6": <Aussiesim.Card6Hearts color="red"/>,
    "Hearts7": <Aussiesim.Card7Hearts color="red"/>,
    "Hearts8": <Aussiesim.Card8Hearts color="red"/>,
    "Hearts9": <Aussiesim.Card9Hearts color="red"/>,
    "Hearts10": <Aussiesim.Card10Hearts color="red"/>,
    "HeartsJ": <Aussiesim.CardJackHearts color="red"/>,
    "HeartsQ": <Aussiesim.CardQueenHearts color="red"/>,
    "HeartsK": <Aussiesim.CardKingHearts color="red"/>,
    "HeartsA": <Aussiesim.CardAceHearts color="red"/>
}

class Card{
    #suit;
    #rank;
    #value;
    #icon

    constructor(suit, rank, icon){
        this.#suit = suit;
        this.#rank = rank;
        this.#icon = icon;
    }
    
    getSuit(){
        return this.#suit;
    }
    
    getRank(){
        return this.#rank;
    }
    
    getValue(){
        if (this.#rank >= "2" && this.#rank <= "6") this.#value = 1;
        else if (this.#rank >= "7" && this.#rank <= "9") this.#value = 0;
        else this.#value = -1;
        return this.#value;
    }
    
    getIcon(){
        return this.#icon;
    }
}

export class Decks{
    #suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
    #ranks = [ "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];


    #deck = [];

    constructor(numberOfDecks){
        for (let k = 0; k < numberOfDecks;k++) {
            for (let i = 0; i < this.#ranks.length; i++){
                for (let j = 0;j < this.#suits.length; j++){
                    this.#deck.push(new Card(this.#suits[j], this.#ranks[i], ICONS[this.#suits[j] + this.#ranks[i]]));
                }
            }
        }
    }

    getDeck() {
        for (let i in this.#deck) {
            console.log(this.#deck[i].getRank(), this.#deck[i].getSuit(), this.#deck[i].getValue());  
        }
    }

    showCard(){
        return this.#deck.shift();
    }
    
    shuffle() {
        for (let i in this.#deck){
            let j = Math.floor(Math.random() * (i));
            var b = this.#deck[i];
            this.#deck[i] = this.#deck[j];
            this.#deck[j] = b;
        }
    }
}
