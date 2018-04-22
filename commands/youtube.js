const Discord = require("discord.js");
const ytSearch = require("youtube-search");

module.exports = {
    name: "yt",
    description: "Searches YouTube for a video of your choice.",
    execute(aribot, message, params) {
        var opts = {
            maxResults: 1,
            key: "API KEY HERE"
          };

          ytSearch(params.join(" "), opts, function(err, results) {
            if (err) {
                console.log(err);
                message.channel.send(`Could not find ${params.join(" ")}. Try again.`)
            }
            message.channel.send(results[0].link);
          });
    },
};