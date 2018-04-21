const Discord = require("discord.js");

module.exports = {
    name: "setalbum",
    description: "Allows you to assign yourself a role based on your favorite album.",
    execute(aribot, message, params) {
        let user = message.member;
        let server = message.guild;
        let albums = ["`Yours Truly`", "`My Everything`", "`Dangerous Woman`", "`No Tears Left To Cry`"];
        let yt = server.roles.get("285664181577973761"); // Yours Truly
        let me = server.roles.get("285664163974479872"); // My Everything
        let dw = server.roles.get("285656127696535553"); // Dangerous Woman
        let ntltc = server.roles.get("436807863856398346"); // No Tears Left To Cry

        if (params[0] == null) {
            message.reply(`you didn't select your favorite album. Ariana's albums are: ${albums.join(", ")}.`);
            return;
        } else if (params[0] == "-h" || params[0] == "--help") {
            const embed = new Discord.RichEmbed()
            .setColor(0x0000B3)
            .setAuthor("!setalbum", aribot.user.avatarURL)
            .addField("Usage:", "!setalbum [params]")
            .addField("Params:", albums.join(", "));

            message.channel.send({embed});
        } else {
            switch (params.join(" ").toLowerCase()) { // This allows us to look past the first index in case of spaces.
                case "yt":
                case "yourstruly":
                case "yours truly":
                    user.addRole(yt);
                    message.reply(`your favorite album has been set to ${albums[0]}.`);
                    break;
                case "me":
                case "myeverything":
                case "my everything":
                    user.addRole(me);
                    message.reply(`your favorite album has been set to ${albums[1]}.`);
                    break;
                case "dw":
                case "dangerouswoman":
                case "dangerous woman":
                    user.addRole(dw);
                    message.reply(`your favorite album has been set to ${albums[2]}.`);
                    break;
                case "ntltc":
                case "notearslefttocry":
                case "no tears left to cry":
                    user.addRole(ntltc);
                    message.reply(`your favorite album has been set to ${albums[3]}.`);
                    break;
                default:
                    message.reply(`${params} is not an Ariana Grande album. Ariana's albums are: ${albums.join(", ")}.`);
                    break;
            }
        }
    },
};