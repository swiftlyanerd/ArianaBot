const Discord = require("discord.js");
const lfmAPI = require("lastfmapi");
const config = require("../config.json")

module.exports = {
    name: "fm",
    description: "Posts scrobble data from a last.fm profile.",
    execute(aribot, message, params) {
        const lfm = new lfmAPI({
            api_key : config.lastfm.lfmAPIKey,
            secret  : config.lastfm.lfmAPISecret
        });
        if (params[0] == null) {
            message.reply("looks like you didn't give me a last.fm profile to look up.");
        } else if (params[0] == "-h" || params[0] == "--help") {
            const embed = new Discord.RichEmbed()
            .setColor(0x0000B3)
            .setAuthor("!fm", aribot.user.avatarURL)
            .addField("Usage:", "!fm [params]")
            .addField("Params:", "last.fm username");

            message.channel.send({embed});
        } else {
            lfm.user.getRecentTracks({
                limit : 2,
                user  : params[0]
            }, function (err, recentTracks) {
                if (err) { console.log(err); }
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
                    .setAuthor(params[0], `https://i.imgur.com/x5AhTlq.png`, `https://www.last.fm/user/${recentTracks["@attr"].user}`)
                    //.setURL()
                    .addField(`${status} Song`, `${recentTracks.track[0].name}`, true)
                    .addField(`${status} Artist`, `${recentTracks.track[0].artist["#text"]}`, true)
                    .addField("Previous Song", `${recentTracks.track[1].name}`, true)
                    .addField("Previous Artist", `${recentTracks.track[1].artist["#text"]}`, true)
                    .setThumbnail(`${recentTracks.track[0].image[3]["#text"]}`)
                    .setFooter(`Total Scrobbles: ${recentTracks["@attr"].total}`);
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
        }
    },
};