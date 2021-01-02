/**
 * @description creates a preset using specified cards
 * @constructor
 * @typedef preset
 * @class
 * @example
 * //create a deck of red, green, and blue cards with 2 of each number 0-5 and 4 wilds
 * var baby_uno = new preset(['red', 'green', 'blue'], [
 *  {name:'0', count: 2, has_suit: true}, 
 *  {name: '1', count: 2, has_suit: true},
 *  {name: '2', count: 2, has_suit: true},
 *  {name: '3', count: 2, has_suit: true},
 *  {name: '4', count: 2, has_suit: true},
 *  {name: '5', count: 2, has_suit: true},
 *  {name: 'wild', count: 4, has_suit: false}
 * ]);
 */
class preset {
    /**
     * @description creates a new preset
     * @param {String[]} suits 
     * @param {...{name: String, count: Number, suited: Boolean}} nums 
     */
    constructor(suits, nums) {
        this.suits = suits;
        this.nums = nums;
    }
}

/**
 * @description generate a deck of cards from a preset
 * @param {preset} preset the {@link preset} to use
 * @param {deck} deck the {@link deck} to place the cards into
 */
exports.makeDeck = (preset, deck) => {

    preset.nums.forEach(type => {
        if (!type.suited) {
            for (let i = type.count; i != 0; i--) {
                let tmpcrd = new card(null, type.name, `${type.name} (number ${i})`);
                deck.addCards(tmpcrd);
            }
        }
        else {
            preset.suits.forEach(suit => {
                for (let i = type.count; i != 0; i--) {
                    let tmpcrd = new card(suit, type.name, `${suit} ${type.name} (number ${i})`);
                    deck.addCards(tmpcrd);
                }
            });
        }
    });
}

/**
 * @description creates a card with a given emote, suit, and number.
 * @typedef {Object} card
 * @param {String} suit the suit of the card. can be c, d, h, or s
 * @param {String} number the number of the card. 2-10 + j, q, k, a
 * @param {String} name the name of the card
 * @class
 */

class card {
    constructor(suit, number, name = 'null') {
        this.suit = suit;
        this.number = number;
        this.name = name
    }
}

/**
 * @description creates a deck of {@link card} objects 
 * @param {...card} cards cards to initialize the deck with
 * @typedef {Object} deck
 * @class
 */
class deck {
    constructor(...cards) {
        this.cards = cards
        this.discardpile = []
    }
    /**
     * @description adds cards to the deck after it is created
     * @param  {...cards} cards: 
     */
    addCards(...cards) {
        cards.forEach(item => {
            this.cards.push(item)
        })
    }
    /**
     * @description shuffles the deck
     * 
     */
    shuffle() {
        var m = this.cards.length, t, i;
        while (m) {
            i = Math.floor(Math.random() * m--)
            t = this.cards[m];
            this.cards[m] = this.cards[i];
            this.cards[i] = t
        }
    }

    /**
     * @description shuffles all the cards, including discard
     */
    shuffleAll() {
        this.discardpile.forEach(card => {
            this.cards.push(card);
        })
        this.discardpile = []
        this.shuffle()
    }
    /**
     * @description draw a number of cards
     * @param {number} n how many cards to draw
     */
    draw(n) {
        return this.cards.splice(0, n)
    }

    /**
     * @description discard any number of cards
     * @param  {...card} discard cards to put in the discard
     */
    discard(...discard) {
        discard.forEach(card => {
            this.discardpile.push(card)
        })
    }
    /**
     * @description runs {@link makeDeck} on this {@link deck}. takes no arguments.
     */
    makePokerDeck() { makePokerDeck(this) };
}

/**
 * @description creates a {@link deck} of standard poker {@link card} objects
 * @param {deck | String} deck the deck to place the cards in, or a string to return the deck
 * @param {?object} style the card generator, defaults to poker
 */
exports.makePokerDeck = (deck) => {
    cards.poker.suits.forEach(suit => {
        cards.poker.nums.forEach(num => {
            switch (suit) {
                case '♣️':
                    //var s = 'c';
                    var sn = 'clubs';
                    break;
                case '♦️':
                    //var s = 'd';
                    var sn = 'diamonds';
                    break;
                case '♥️':
                    //var s = 'h';
                    var sn = 'hearts';
                    break;
                case '♠️':
                    //var s = 's';
                    var sn = 'spades';
                    break;
                default:
                    //var s = null;
                    var sn = null;
                    break;
            }
            var tmpcrd = new cards.card(suit, num, `${num} of ${sn}`);
            deck.addCards(tmpcrd);
        })
    });
}

/**
 * @description the possible suits and numbers in a deck of poker cards
 * @constant poker
 */
exports.poker = {
    /**
     * @description the 4 suits of playing card as unicode symbols
     */
    suits: ['♣️', '♦️', '♥️', '♠️'],
    /**
     * @description every value of card in a deck of poker cards
     */
    nums: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
}

exports.card = card;
exports.deck = deck;
exports.preset = preset;