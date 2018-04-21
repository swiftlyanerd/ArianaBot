const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: "version",
    description: "Posts the current version the bot is running.",
    execute(aribot, message, params) {
        if (params[0] == "-h" || params[0] == "--help") {
            const embed = new Discord.RichEmbed()
            .setColor(0x0000B3)
            .setAuthor("!version", aribot.user.avatarURL)
            .addField("Usage:", "!version");

            message.channel.send({embed});
        } else {
            message.channel.send(`Running version: \`${config.version}\``);
        }
    },
};