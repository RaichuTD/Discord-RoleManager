const {SlashCommandBuilder, ChannelType} = require('discord.js');
const RolesManager = require('../Manager/RoleManager');
const Manager = require("../Manager/RoleManager");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('rolemsg-add')
        .setDescription('Add roles & reactions.')
        .setDefaultMemberPermissions(0)
        .addRoleOption(option => option.setName('role')
            .setRequired(true)
            .setDescription('Select the role you would like to be assigned with that reaction')
        )
        .addStringOption(option => option.setName('emoji')
            .setRequired(true)
            .setDescription("Copy & paste EmojiID (Will be added as reaction, and assign the role you've selected.")),
    async execute(client, interaction) {
        const roleSelect = interaction.options.getRole('role').id;
        const emojiSelect = interaction.options.getString('emoji');

        const StepsRoles = await Manager.update(client, interaction, roleSelect, emojiSelect);

        if (StepsRoles) {
            interaction.reply({ephemeral: true, content: "Successfully Added."})
        } else {
            interaction.reply({ephemeral: true, content: "Something went wrong."});
        }
    }
}