const Discord = require("discord.js");

module.exports = {
    name: "clearalbums",
    description: "Clears all your album roles.",
    execute(aribot, message, params) {
        let user = message.member;
        let server = message.guild;
        let albumRoles = message.member.roles;
        let yt = server.roles.get("285664181577973761"); // Yours Truly
        let me = server.roles.get("285664163974479872"); // My Everything
        let dw = server.roles.get("285656127696535553"); // Dangerous Woman
        let ntltc = server.roles.get("436807863856398346"); // No Tears Left To Cry

        if (params[0] == "-h" || params[0] == "--help") {
            const embed = new Discord.RichEmbed()
            .setColor(0x0000B3)
            .setAuthor("!clearalbums", aribot.user.avatarURL)
            .addField("Usage:", "!clearalbums");

            message.channel.send({embed});
        } else {
            albumRoles.forEach( role => {
                switch (role.id) {
                    case "285664181577973761": // Yours Truly
                        user.removeRole(yt);
                        break;
                    case "285664163974479872": // My Everything
                        user.removeRole(me);
                        break;
                    case "285656127696535553": // Dangerous Woman
                        user.removeRole(dw);
                        break;
                    case "436807863856398346": // No Tears Left To Cry
                        user.removeRole(ntltc);
                        break;
                }
            });
            message.reply("your album roles have been cleared.");
        }
    },
};