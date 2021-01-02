const cards = require('./cards');
const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config');

const client = new Discord.Client()
const deck = new cards.deck()
cards.makeDeck()

client.login(config.token);
client.on('ready', () => {
    console.log('logged in as ' + client.user.tag)
})
client.on('message', (msg) => {
    if (!msg.content.startsWith(config.prefix)) return;
    console.log(msg.content.split(' '))
    switch (msg.content.split(' ')[0].slice(1)) {
        default:
            break;
    }
})