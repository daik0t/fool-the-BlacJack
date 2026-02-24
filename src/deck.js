class Card{
    #suit;
    #rank;

    constructor(suit, rnak){
        this.#suit = suit;
        this.#rank = rank;
    }
}

class Deck{
    #suits = ["Spades", "Hearts", "Clubs", "Diamonds"];
    #ranks = [ "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

    #deck = [];

    constructor(){
        for (let i = 0; i < this.#ranks.length; i++){
            for (let j = 0;j < this.#suits.length; j++){
                this.#deck.push(this.#suits[j] + " " + this.#ranks[i]);
            }
        }
    }

    getDeck() {
        for (let i in this.#deck) {
            console.log(this.#deck[i]);  
        }
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
