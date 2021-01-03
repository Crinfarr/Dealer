const cards = require('./cards');
const Discord = require('discord.js');
const config = require('./config');

const client = new Discord.Client();
const deck = new cards.deck();
cards.makePokerDeck(deck);
deck.shuffle

let data = {
    hands: {},
    channels: {},
    active: []
}

client.login(config.token);
client.on('ready', () => {
    console.log('logged in as ' + client.user.tag)
});

client.on('message', (msg) => {
    if (!msg.content.startsWith(config.prefix)) return;
    console.log(msg.content.split(' ')[0].slice(1))

    //DMs
    if (msg.channel.type == "dm") {
        switch (msg.content.split(' ')[0].slice(1)) {
            case 'show':

                //don't show hand if there is no hand
                if (!data.active[msg.author.tag]) {
                    msg.author.send('You have no hand!');
                    return;
                }

                //generate text
                let txt = "";
                data.hands[msg.author.tag].forEach(card => {
                    txt = txt.concat(`${card.number}\`${card.suit}\``, ", ");
                });

                //send channel message
                data.channels[msg.author.tag].send(`${msg.author.username} shows their hand! ${txt}`);
                //send DMs message
                data.channels[msg.author.tag].send(`Showed your hand to #${data.channels.name}`);

                //discard all cards
                data.hands[msg.author.tag].forEach(card => {
                    deck.discard(card);
                });

                //empty hand
                data.hands[msg.author.tag] = [];

                //mark player as inactive
                data.active[msg.author.tag] = false;
                return;
            default:
                break;
        }
    }

    //main channels
    switch (msg.content.split(' ')[0].slice(1).toLowerCase()) {
        case 'draw':
            //error detection
            if ((parseInt(msg.content.split(' ')[1]) == NaN) && config.rules != 'poker') {
                msg.channel.send(`invalid number: ${msg.content.split(' ')[1]}`)
                return;
            }

            //draw cards and keep game channels
            switch (config.rules) {
                case 'other':
                    data.hands[msg.author.tag] = deck.draw(parseInt(msg.content.split(' ')[1]));
                    break;
                case 'poker':
                    data.hands[msg.author.tag] = deck.draw(5);
                    break;
                default:
                    break;
            }

            //don't let player replace their hand if they already have one
            if (data.active[msg.author.tag]) {
                msg.channel.send('You already have a hand!');
                return;
            }

            //keep track of game locations
            data.channels[msg.author.tag] = msg.channel;
            if (config.debug) {
                console.log(data.hands);
                console.log(data.channels);
            }

            //generate hand text
            let txt = "Your hand: ";
            data.hands[msg.author.tag].forEach(card => {
                txt = txt.concat(`\`${card.number}${card.suit}\``, ", ");
            });

            //dm hand
            msg.author.send(txt + "\nReply $show to show your hand.\nCard replacement and betting coming soon.");
            msg.channel.send('DMed you your hand.');

            //mark user as active
            data.active[msg.author.tag] = true;
            return;
        case 'shuffle':
            //if this needs to be explained, you need to go to sleep
            deck.shuffle();
            msg.channel.send(`Shuffled the deck. ${deck.cards.length} cards remain, ${deck.discardpile.length} cards in discard, leaving ${54 - (deck.cards.length + deck.discardpile.length)} in play.`);
            return;
        case 'shuffleAll':
            //fucking guess
            deck.shuffleAll();
            msg.channel.send(`Shuffled the deck. ${deck.cards.length} cards remain, ${deck.discardpile.length} cards in discard, leaving ${54 - (deck.cards.length + deck.discardpile.length)} in play.`);
        default:
            return;
    }
})