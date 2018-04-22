const Discord = require("discord.js");
const config = require("../config.json");

module.exports = {
    name: "help",
    description: "Posts this message.",
    execute(aribot, message, params) {
        if (params[0] == "-h" || params[0] == "--help") {
            const embed = new Discord.RichEmbed()
            .setColor(0x0000B3)
            .setAuthor("!help", aribot.user.avatarURL)
            .addField("Usage:", "!help")
            .setFooter("wyd lol this is help");

            message.channel.send({embed});
        } else {
            let command = aribot.commands.array();
            const embed = new Discord.RichEmbed()
            .setColor(0x0000B3)
            .setAuthor(`Welcome to ${aribot.user.username}! All availble commands are listed below.`, aribot.user.avatarURL)
            .setDescription(`If you'd like help on specific commands, type "${config.bot.prefix}command --help or -h" (ex: ${config.bot.prefix}setalbum -h)"`)
            .setFooter(`Page 1 / 1`);

            for (let i = 0; i < aribot.commands.array().length; i++) {
                embed.addField(`${config.bot.prefix}${command[i].name}`, command[i].description)
            }

            message.channel.send({embed});
        }
    },
};