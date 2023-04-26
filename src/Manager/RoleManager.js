const fs = require('fs');
const path = require('path')
const RolesConfig = path.join(__dirname, '..', 'config/roleListen.json');
const cfg = require('../../config.json');
const {EmbedBuilder, Embed} = require("discord.js");




module.exports = {
    init: async function (client, interaction, description, channel) {
        var preform = {
            description: description,
            channelId: channel,
            list: [],
        }

        fs.writeFileSync(RolesConfig, JSON.stringify(preform), err => {
            if (err) console.log("[BOT] Something went wrong -> Config Role init (1)", err);
        });

    },
    Assign: async function (client, userId, reaction) {
        try {

            const rolesManager = JSON.parse(fs.readFileSync(RolesConfig, 'utf8'));
            const EmojiId = reaction.emoji.id;
            const guilds = await client.guilds.fetch(`${cfg.GuildId}`).catch((err) => {
            });
            const rolesList = Object.entries(rolesManager.list).filter(data => data[1].emojiID === `${EmojiId}`);
            if (rolesList.length < 1) return;


            if (reaction.message.id !== rolesManager.messageId) return;

            reaction.users.remove(userId).catch((err) => {
            });


            const roles = rolesList[0][1].roleAssign;


            const findRoles = await guilds.roles.fetch(roles).catch((err) => {
            });


            if (!findRoles) return;


            const usersDetails = await guilds.members.fetch(`${userId}`)

            if (!usersDetails) return;


            const HasRoles = await usersDetails.roles.cache.has(`${roles}`);

            if (HasRoles) {
                await usersDetails.roles.remove(findRoles);
            } else {
                await usersDetails.roles.add(findRoles);
            }

        } catch (ex) {
            return;
            console.log(ex)
        }

    },
    update: async function (client, interaction, roleSelect, emojiSelect) {
        var alreadyExist = false;
        const config = JSON.parse(fs.readFileSync(RolesConfig, 'utf8'));

        if (!config.hasOwnProperty('channelId')) return;



        var EmojiSet;


        const regex = /^<:[a-zA-Z0-9_]+:(\d+)>$/;
        const matches = emojiSelect.match(regex);

        if(matches){
            EmojiSet = matches[1];
        } else {
            EmojiSet = emojiSelect;
        }


        const ConfigEmojis = new Set();

        if (config.list.length > 0) {
            await Object.entries(config.list).forEach(value => {
                ConfigEmojis.add(value[1].emojiID)
            })

            if (ConfigEmojis.has(`${EmojiSet}`)) {
                alreadyExist = true;
            }
        }


        if (alreadyExist) return;


        const description = config.description;

        var custom = {
            emojiID: EmojiSet,
            roleAssign: roleSelect
        }

        config.list.push(custom);

        fs.writeFileSync(RolesConfig, JSON.stringify(config), err => {
            if (err) console.log("[BOT] Something went wrong -> Config Role update (1)", err);
        });

        return true;

    },
    confirmEmbed: async function (client) {

        const config = JSON.parse(fs.readFileSync(RolesConfig, 'utf8'));

        if (!config.hasOwnProperty('channelId') || !config.list.length > 0) {
            return false;
        } else {


            const guilds = await client.guilds.fetch(`${cfg.GuildId}`);
            const channel = await guilds.channels.fetch(`${config.channelId}`);

            if (!channel) return;

            const embeds = new EmbedBuilder()
                .setDescription(`${config.description}`)
                .setColor(3426654)

            const msg = await channel.send({embeds: [embeds]}).catch((err) => {
            });

            await module.exports.updateConfig(guilds, config, msg.id)

            Object.entries(config.list).forEach(value => {
                msg.react(`${value[1].emojiID}`).catch((err) => {
                })
            })
            return true;
        }


    },
    updateConfig: async function (guilds, configdefault, id) {

        const config = JSON.parse(fs.readFileSync(RolesConfig, 'utf8'));

        if (config.hasOwnProperty('messageId')) {
            const channel = await guilds.channels.fetch(`${config.channelId}`).catch((e) => {
            });
            if (channel) {
                const oldMessage = await channel.messages.fetch(`${config.messageId}`).catch((e) => {
                });

                if (oldMessage) {
                    oldMessage.delete().catch((e) => {
                    });
                }
            }
        }

        config.messageId = `${id}`

        fs.writeFileSync(RolesConfig, JSON.stringify(config), err => {
            if (err) console.log("[BOT] Something went wrong -> Config Role updates global (1)", err);
        });
    },
}