// TODO: Finish Later

const Discord = require("discord.js");
const ytSearch = require("youtube-search");

module.exports = {
    name: "yt",
    description: "Searches YouTube for a video of your choice.",
    execute(aribot, message, params) {
        var opts = {
            maxResults: 1,
            key: 'API key'
          };

          ytSearch(params.join(" "), opts, function(err, results) {
            if (err) {
                return console.log(err);
            }
            console.log(results);
          });
    },
};