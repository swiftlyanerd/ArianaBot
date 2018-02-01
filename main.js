const config = require("./config.json");
const Discord = require("discord.js");

const aribot = new Discord.Client();

aribot.on("ready", () =>{
    console.log("Ready.")
});

aribot.login(config.token);