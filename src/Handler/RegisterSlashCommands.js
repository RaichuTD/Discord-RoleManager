const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');
const GuildsConfig = path.join(__dirname, '..', 'config/guild.json');
const isSetup = JSON.parse(fs.readFileSync(GuildsConfig));
const config = require('../../config.json');


module.exports = {
    updateConfig: async function (){
        isSetup.loaded = true;
        fs.writeFileSync(GuildsConfig, JSON.stringify(isSetup), err => {
            if (err) console.log("[BOT] Something went wrong -> Guilds Setup Slash Commands (1)", err);
        });
    },

    register: async function () {
        if (!isSetup.loaded) {
            const commands = [];
            const commandsPath = path.join(__dirname, '..', 'commands');
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const command = require(`../commands/${file}`);
                commands.push(command.data.toJSON());
            }

            const rest = new REST().setToken(config.bot_token);
            try {
                await rest.put(
                    Routes.applicationGuildCommands(config.clientId, config.GuildId),
                    {body: commands},
                );

                await module.exports.updateConfig();

                console.log(`[BOT] Successfully updated the current (/) commands.`);


            } catch (e) {
                console.log("Couldn't not register the current (/) commands.");
                console.log(e);
            }
        }
    }
}