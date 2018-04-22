//TODO: Add help for command, finish embed (footer), and edit description.

const Discord = require("discord.js");
const lfmAPI = require("lastfmapi");
const config = require("../config.json")

module.exports = {
    name: "fm",
    description: "Does lastfm stuff",
    execute(aribot, message, params) {
        const lfm = new lfmAPI({
            api_key : config.lastfm.lfmAPIKey,
            secret  : config.lastfm.lfmAPISecret
        });

        lfm.user.getRecentTracks({
            limit : 2,
            user  : params[0]
        }, function (err, recentTracks) {
            if (err) {console.log(err);}
            const embed = new Discord.RichEmbed()
            .setColor(0xFF0000)
            .setAuthor(params[0], `https://i.imgur.com/x5AhTlq.png`)
            .addField("Current Song", `${recentTracks.track[0].name}`, true)
            .addField("Current Artist", `${recentTracks.track[0].artist["#text"]}`, true)
            .addField("Previous Song", `${recentTracks.track[1].name}`, true)
            .addField("Previous Artist", `${recentTracks.track[0].artist["#text"]}`, true)
            .setThumbnail(`${recentTracks.track[0].image[3]["#text"]}`);

            message.channel.send({embed});
        });
    },
};