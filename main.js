var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
const dbUtils = require("./db-utils");

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

function messageSender(channelID, message) {
    bot.sendMessage({
        to: channelID,
        message: message
    });
}

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
	
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;
            case 'frames':
                getAllFrames(channelID);
            case 'transference':
                console.log(user);
                console.log(userID);
                if (args.length == 1) {
                    addUser(channelID, user, args[0]);
                }
         }
     }
});

async function getAllFrames(channelID) {
    var res = await dbUtils.getAllFrames();
    messageSender(channelID, res);
}

async function addUser(channelID, username, frame) {
    var res = await dbUtils.addUser(username, frame);
    console.log(res);
    messageSender(channelID, res);
}