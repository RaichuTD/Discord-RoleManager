const discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const {register} = require("../Handler/RegisterSlashCommands");
const config = require('../../config.json');
class Bot extends discord.Client {
    constructor(props) {
        super(props);
        this.commands = new discord.Collection();
        this.SlashCommandsLoad();
        this.EventsLoad();
    }

    EventsLoad() {
        const eventsPath = path.join(__dirname, '..', 'Events');
        const EventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
        for (const file of EventsFiles) {
            const event = require(`../Events/${file}`);
            this.on(event.name, (...args) => {
                event.execute(this, ...args)
            });

        }
    }

    SlashCommandsLoad() {
        const commandsPath = path.join(__dirname, '..', 'commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../commands/${file}`);
            this.commands.set(command.data.name, command);
        }
    }
    start() {
        this.login(config.bot_token).catch(error => {
            console.log(error)
        })
        this.setup();
        console.log(`[BOT] Client ready`);
    }

    async setup() {
        await register();
    }
}

module.exports = Bot;

