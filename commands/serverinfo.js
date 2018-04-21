const Discord = require("discord.js");

module.exports = {
    name: "sinfo",
    description: `Posts the server's information, from server icon to created date.`,
    execute(aribot, message, params) {
        if (params[0] == "-h" || params[0] == "--help") {
            const embed = new Discord.RichEmbed()
            .setColor(0x0000B3)
            .setAuthor("!sinfo", aribot.user.avatarURL)
            .addField("Usage:", "!sinfo");

            message.channel.send({embed});
        } else {
            let server = message.guild;

            const embed = new Discord.RichEmbed()
            .setColor(0x340034) // Monochromatic Purple
            .setAuthor(server.name, server.iconURL)
            .addField("Server Owner:", server.owner)
            .addField("Server ID:", server.id)
            .addField("Created On:", server.createdAt)
            .addField("Members:", server.memberCount)
            .addField("Channels:", server.channels.size)
            .addField(`Roles (${server.roles.size}):`, server.roles.map(m => m.name).join(", "))
            .addField("Region:", server.region)
            .setThumbnail(server.iconURL);

            message.channel.send({embed});
        }
    },
};