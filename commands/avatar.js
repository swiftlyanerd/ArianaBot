const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: "avatar",
    description: `Posts a user's avatar.`,
    execute(aribot, message, params) {
        let self = message.author;
        let mentionedUser = message.mentions.members.first();

        if (params[0] == null) {
            const embed = new Discord.RichEmbed()
            .setColor(0x00CD00)
            .setAuthor(self.tag, self.avatarURL)
            .setImage(self.avatarURL);

            message.channel.send({embed});
        } else if (params[0] == "-h" || params[0] == "--help") {
            const embed = new Discord.RichEmbed()
            .setColor(0x0000B3)
            .setAuthor("!avatar", aribot.user.avatarURL)
            .addField("Usage:", "!avatar (optional)[params]")
            .addField("Params:", "@mention");

            message.channel.send({embed});
        } else {
            try {
                const embed = new Discord.RichEmbed()
                .setColor(0x00CD00)
                .setAuthor(mentionedUser.user.tag, mentionedUser.user.avatarURL)
                .setImage(mentionedUser.user.avatarURL);

                message.channel.send({embed});
            } catch (err) {
                console.log(err);
                message.reply(`user ${params} was not found on the server.`);
            }
        }
    },
};