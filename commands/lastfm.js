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
            try {
                let nowPlaying = false;
                let status = "";
                try {
                    if (recentTracks.track[0]["@attr"].nowplaying) {
                        nowPlaying = true;
                    }
                } catch (undef) { // undefined
                    console.log(undef);
                }

                switch (nowPlaying) {
                    case true:
                        status = "Current";
                        break;
                    case false:
                        status = "Most Recent";
                        break;
                }

                const embed = new Discord.RichEmbed()
                .setColor(0xFFFFFF)
                .setAuthor(params[0], `https://i.imgur.com/x5AhTlq.png`)
                .addField(`${status} Song`, `${recentTracks.track[0].name}`, true)
                .addField(`${status} Artist`, `${recentTracks.track[0].artist["#text"]}`, true)
                .addField("Previous Song", `${recentTracks.track[1].name}`, true)
                .addField("Previous Artist", `${recentTracks.track[1].artist["#text"]}`, true)
                .setThumbnail(`${recentTracks.track[0].image[3]["#text"]}`);
                if(nowPlaying) {
                    embed.setDescription("Currently Scrobbling");
                } else {
                    embed.setDescription(`Last scrobbled on: ${recentTracks.track[0].date["#text"]} (UTC)`);
                }
                message.channel.send({embed});
        } catch (unf) { // user not found
            console.log(unf);
            message.reply(`${params[0]} is not a last.fm user. Please enter a valid last.fm username.`);
        }
        });

    },
};