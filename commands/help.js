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
            .setDescription(`If you'd like help on specific commands, type "${config.prefix}command --help or -h" (ex: ${config.prefix}setalbum -h)"`)
            .addField(`${config.prefix}avatar`, command[0].description)
            .addField(`${config.prefix}clearalbums`, command[1].description)
            .addField(`${config.prefix}github`, command[2].description)
            .addField(`${config.prefix}help`, command[3].description)
            .addField(`${config.prefix}sinfo`, command[4].description)
            .addField(`${config.prefix}setalbum`, command[5].description)
            .addField(`${config.prefix}uinfo`, command[6].description)
            .addField(`${config.prefix}version`, command[7].description)
            .setFooter(`Page 1 / 1`);

            message.channel.send({embed});
        }
    },
};