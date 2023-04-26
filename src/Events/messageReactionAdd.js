const Manager = require("../Manager/RoleManager");
module.exports = {
    name: "messageReactionAdd",
    async execute(client, reaction, user) {
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                return;
            }
        }

        if (!user.bot && reaction.message.guild) {
            const reactAuth = user.id;
            await Manager.Assign(client, reactAuth, reaction);
        }
    }
}
