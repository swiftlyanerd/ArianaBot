const Discord = require("discord.js");
const ytSearch = require("youtube-search");
const config = require("../config.json")

module.exports = {
    name: "yt",
    description: "Searches YouTube for a video of your choice.",
    execute(aribot, message, params) {
        if (params[0] == "-h" || params[0] == "--help") {
            const embed = new Discord.RichEmbed()
            .setColor(0x0000B3)
            .setAuthor("!yt", aribot.user.avatarURL)
            .addField("Usage:", "!yt [params]")
            .setFooter("Params:", "keyword");

            message.channel.send({embed});
        } else {
            let opts = {
                maxResults: 1,
                key: config.youtube.ytAPIKey
            };

            ytSearch(params.join(" "), opts, function(err, results) {
                if (err) {
                    console.log(err);
                    message.channel.send(`Could not find ${params.join(" ")}. Try again.`)
                }
                message.channel.send(results[0].link);
            });
        }
    },
};