## Classes

<dl>
<dt><a href="#preset">preset</a></dt>
<dd></dd>
<dt><a href="#card">card</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#deck">deck</a> : <code>Object</code></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><a href="#poker">poker</a></dt>
<dd><p>the possible suits and numbers in a deck of poker cards</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#makeDeck">makeDeck(preset, deck)</a></dt>
<dd><p>generate a deck of cards from a preset</p>
</dd>
<dt><a href="#makePokerDeck">makePokerDeck(deck, style)</a></dt>
<dd><p>creates a <a href="#deck">deck</a> of standard poker <a href="#card">card</a> objects</p>
</dd>
</dl>

<a name="preset"></a>

## preset
**Kind**: global class  
<a name="new_preset_new"></a>

### new preset()
creates a preset using specified cards

**Example**  
```js
//create a deck of red, green, and blue cards with 2 of each number 0-5 and 4 wildsvar baby_uno = new preset(['red', 'green', 'blue'], [ {name:'0', count:'2', has_suit: true},  {name: '1', count: 2, has_suit: true}, {name: '2', count: 2, has_suit: true}, {name: '3', count: 2, has_suit: true}, {name: '4', count: 2, has_suit: true}, {name: '5', count: 2, has_suit: true}, {name: 'wild', count: 4, has_suit: false}]);
```
<a name="card"></a>

## card : <code>Object</code>
**Kind**: global class  
<a name="new_card_new"></a>

### new card(suit, number, name)
creates a card with a given emote, suit, and number.


| Param | Type | Description |
| --- | --- | --- |
| suit | <code>String</code> | the suit of the card. can be c, d, h, or s |
| number | <code>String</code> | the number of the card. 2-10 + j, q, k, a |
| name | <code>String</code> | the name of the card |

<a name="deck"></a>

## deck : <code>Object</code>
**Kind**: global class  

* [deck](#deck) : <code>Object</code>
    * [new deck(...cards)](#new_deck_new)
    * [.addCards(...cards:)](#deck+addCards)
    * [.shuffle()](#deck+shuffle)
    * [.shuffleAll()](#deck+shuffleAll)
    * [.draw(n)](#deck+draw)
    * [.discard(...discard)](#deck+discard)
    * [.makePokerDeck()](#deck+makePokerDeck)

<a name="new_deck_new"></a>

### new deck(...cards)
creates a deck of [card](#card) objects


| Param | Type | Description |
| --- | --- | --- |
| ...cards | [<code>card</code>](#card) | cards to initialize the deck with |

<a name="deck+addCards"></a>

### deck.addCards(...cards:)
adds cards to the deck after it is created

**Kind**: instance method of [<code>deck</code>](#deck)  

| Param | Type |
| --- | --- |
| ...cards: | <code>cards</code> | 

<a name="deck+shuffle"></a>

### deck.shuffle()
shuffles the deck

**Kind**: instance method of [<code>deck</code>](#deck)  
<a name="deck+shuffleAll"></a>

### deck.shuffleAll()
shuffles all the cards, including discard

**Kind**: instance method of [<code>deck</code>](#deck)  
<a name="deck+draw"></a>

### deck.draw(n)
draw a number of cards

**Kind**: instance method of [<code>deck</code>](#deck)  

| Param | Type | Description |
| --- | --- | --- |
| n | <code>number</code> | how many cards to draw |

<a name="deck+discard"></a>

### deck.discard(...discard)
discard any number of cards

**Kind**: instance method of [<code>deck</code>](#deck)  

| Param | Type | Description |
| --- | --- | --- |
| ...discard | [<code>card</code>](#card) | cards to put in the discard |

<a name="deck+makePokerDeck"></a>

### deck.makePokerDeck()
runs [makeDeck](#makeDeck) on this [deck](#deck). takes no arguments.

**Kind**: instance method of [<code>deck</code>](#deck)  
<a name="poker"></a>

## poker
the possible suits and numbers in a deck of poker cards

**Kind**: global constant  

* [poker](#poker)
    * [.suits](#poker.suits)
    * [.nums](#poker.nums)

<a name="poker.suits"></a>

### poker.suits
the 4 suits of playing card as unicode symbols

**Kind**: static property of [<code>poker</code>](#poker)  
<a name="poker.nums"></a>

### poker.nums
every value of card in a deck of poker cards

**Kind**: static property of [<code>poker</code>](#poker)  
<a name="makeDeck"></a>

## makeDeck(preset, deck)
generate a deck of cards from a preset

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| preset | [<code>preset</code>](#preset) | the [preset](#preset) to use |
| deck | [<code>deck</code>](#deck) | the [deck](#deck) to place the cards into |

<a name="makePokerDeck"></a>

## makePokerDeck(deck, style)
creates a [deck](#deck) of standard poker [card](#card) objects

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| deck | [<code>deck</code>](#deck) \| <code>String</code> | the deck to place the cards in, or a string to return the deck |
| style | <code>object</code> | the card generator, defaults to poker |

