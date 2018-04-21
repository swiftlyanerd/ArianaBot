const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");

const aribot = new Discord.Client();
aribot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands");

for (const file of commandFiles) { // TODO: Handle multiple names for one command
    const mCommand = require(`./commands/${file}`);
    aribot.commands.set(mCommand.name, mCommand);
}

aribot.on("ready", () => {
    console.log(`${time()} - Logged in as ${aribot.user.tag}.`); // We are logged in and ready to go
    aribot.user.setActivity("No Tears Left To Cry", { type : "LISTENING" });
});

aribot.on("message", message => {
    if (message.author.bot) return;

    const params = message.content.slice(config.prefix.length).split(/ +/g);
    const command = params.shift().toLowerCase();

    //if (!aribot.commands.has(command)) return; // Experimental

    if (message.content.startsWith(config.prefix)) { // If the message starts with the prefix, run the command handler.
        try {
            aribot.commands.get(command).execute(aribot, message, params);
        } catch (ne) { // Non Existent
            console.log(ne);
            message.reply(`Command \`!${command}\` not found. Type \`!help\` to see the command list.`);
        }
    }

    // Need to be able to access main. Temporary?
    if (message.content.startsWith(".eval")) {
        if (message.author.id !== config.ownerID) return;
        try {
            const codeToEval = params.join(" ");
            let evaled = eval(codeToEval);
            if (typeof evaled !== "string") {
                evaled = require("util").inspect(evaled);
            }
            message.channel.send(clean(evaled), {code:"xl"});
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
});

// Used by eval
function clean(text) {
    if (typeof(text) === "string") {
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    } else {
        return text;
    }
}

function time() {
    let date = new Date();
    let time = date.toLocaleString();
    return time;
}

aribot.login(config.token);