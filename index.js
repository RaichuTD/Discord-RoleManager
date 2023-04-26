const discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const Bot = require('./src/Utils/Discord');

const client = new Bot({
    intents: [
        discord.GatewayIntentBits.MessageContent,
        discord.GatewayIntentBits.GuildMessageReactions,
        discord.GatewayIntentBits.Guilds,
        discord.GatewayIntentBits.GuildMembers,
        discord.GatewayIntentBits.GuildMessages,
    ],
    partials: [discord.Partials.Message, discord.Partials.Channel, discord.Partials.Reaction],
});

client.start();




