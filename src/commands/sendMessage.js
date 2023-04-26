const {SlashCommandBuilder, ChannelType} = require('discord.js');
const Manager = require("../Manager/RoleManager");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('rolemsg-confirm')
        .setDescription('Will send the embed, and start reacting to defined reactions.')
        .setDefaultMemberPermissions(0),
    async execute(client, interaction) {


        const validate = await Manager.confirmEmbed(client);

        if (validate) {
            interaction.reply({ephemeral: true, content: "Successfully Sent the message."});
        } else {
            interaction.reply({ephemeral: true, content: "Something went wrong, try-again."})
        }

    }
}