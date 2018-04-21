const Discord = require("discord.js");

module.exports = {
    name: "github",
    description: "Posts a link to the bot's repository, where all the source code is kept.",
    execute(aribot, message, params) {

        if (params[0] == "-h" || params[0] == "--help") {
            const embed = new Discord.RichEmbed()
            .setColor(0x0000B3)
            .setAuthor("!github", aribot.user.avatarURL)
            .addField("Usage:", "!github");

            message.channel.send({embed});
        } else {
            let github = "https://github.com/swiftlyanerd/ArianaBot";
            message.channel.send(github);
        }
    },
};