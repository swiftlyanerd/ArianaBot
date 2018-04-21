const Discord = require("discord.js");

module.exports = {
    name: "uinfo",
    description: `Posts a user's information, from avatar to the account's creation date.`,
    execute(aribot, message, params) {
        let mentionedNick = "None";
        let selfNick = "None";
        let status = "";
        let hasMentionedNick = false;
        let hasSelfNick = false;

        let self = message.author;
        let mentionedUser = message.mentions.members.first();

        if (hasSelfNick) nick = message.member.nickname;
        if(hasMentionedNick) mentionedNick = message.guild.member(mentionedUser).nickname;

        if (params[0] == null) {
            const embed = new Discord.RichEmbed()
            .setColor(0xB300B3) // Monochromatic Magenta
            .setAuthor(self.tag, self.avatarURL)
            .addField("Username:", self.username)
            .addField("Discriminator:", self.discriminator)
            .addField("Nickname:", selfNick)
            .addField("ID:", self.id)
            .addField(`Roles (${message.member.roles.size}):`, // Start
            message.member.roles.map(m => m.name).join(", ")) // End
            .addField("Account Created:", self.createdAt)
            .addField("Join Date", message.member.joinedAt)
            .setThumbnail(self.avatarURL);

            message.channel.send({embed});
        } else if (params[0] == "-h" || params[0] == "--help") {
            const embed = new Discord.RichEmbed()
            .setColor(0x0000B3)
            .setAuthor("!uinfo", aribot.user.avatarURL)
            .addField("Usage:","!uinfo (optional)[params]")
            .addField("Params:", "@mention");

            message.channel.send({embed});
        } else {
            try {
                const embed = new Discord.RichEmbed()
                .setColor(0xB300B3) // Monochromatic Magenta
                .setAuthor(mentionedUser.user.tag, mentionedUser.user.avatarURL)
                .addField("Username:", mentionedUser.user.username)
                .addField("Discriminator:", mentionedUser.user.discriminator)
                .addField("Nickname:", mentionedNick)
                .addField("ID:", mentionedUser.user.id)
                .addField(`Roles (${message.guild.member(mentionedUser).roles.size}):`, // Start
                message.guild.member(mentionedUser).roles.map(m => m.name).join(", ")) // End
                .addField("Account Created:", mentionedUser.user.createdAt)
                .addField("Join Date:", message.guild.member(mentionedUser).joinedAt)
                .setThumbnail(mentionedUser.user.avatarURL);
            
                message.channel.send({embed});
            } catch (err) {
                console.log(err);
                message.reply(`user ${params} was not found on the server.`);
            }
        }
    },
};