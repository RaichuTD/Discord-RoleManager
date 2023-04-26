module.exports = {
    name: "interactionCreate",
    async execute(client, interaction) {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(client, interaction);
            } catch (ex) {
                console.log(`[BOT] Slash commands, interactionCreate errors`);
                console.log(ex);
            }
        }
    }
}