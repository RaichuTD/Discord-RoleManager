const {SlashCommandBuilder, ChannelType} = require('discord.js');
const RolesManager = require('../Manager/RoleManager');
const Manager = require("../Manager/RoleManager");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('rolemsg-create')
        .setDescription('Send message with predefined role reaction.')
        .setDefaultMemberPermissions(0)
        .addChannelOption(option => option.setName('channel')
            .setDescription('Channel where the message will be sent.')
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText))
        .addStringOption(option => option.setName('description')
            .setDescription('Text shown on embed as description.')
            .setRequired(true)
        ),
    async execute(client, interaction) {
        const description = interaction.options.getString('description');
        const channel = interaction.options.getChannel('channel').id;

        await Manager.init(client, interaction, description, channel);

        return interaction.reply({ephemeral: true, content: "Successfully prebuild the message, please run /rolemsg-add to start adding emojis & roles."});
    }
}