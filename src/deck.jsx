import React from "react";

const getCardImagePath = (suit, rank) => {
    const suitLower = suit.toLowerCase();
    const rankLower = rank.toLowerCase();
    return `/src/cards/card-${rankLower}-${suitLower}.svg`;
};

class Card {
    #suit;
    #rank;
    #value;
    #icon;

    constructor(suit, rank) {
        this.#suit = suit;
        this.#rank = rank;
        this.#icon = getCardImagePath(suit, rank);
    }

    getSuit() { return this.#suit; }
    getRank() { return this.#rank; }
    getValue() {
        if (this.#rank >= "2" && this.#rank <= "6") this.#value = 1;
        else if (this.#rank >= "7" && this.#rank <= "9") this.#value = 0;
        else this.#value = -1;
        return this.#value;
    }
    getIcon() { return this.#icon; }
    
}

export class Decks {
    #suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
    #ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    #numberOfDecks;
    #deck = [];

    constructor(numberOfDecks) {
        this.#numberOfDecks = numberOfDecks;
        for (let k = 0; k < numberOfDecks; k++) {
            for (let i = 0; i < this.#ranks.length; i++) {
                for (let j = 0; j < this.#suits.length; j++) {
                    this.#deck.push(new Card(this.#suits[j], this.#ranks[i]));
                }
            }
        }
    }

    showCard() { return this.#deck.shift(); }

    shuffle() {
        for (let i = 0; i < this.#deck.length; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.#deck[i], this.#deck[j]] = [this.#deck[j], this.#deck[i]];
        }
    }
}