import { Client, TextChannel } from "discord.js";
import { BotCommandHandler } from "./commands";
import { botChannelId, DISCORD_TOKEN, prefix } from "./config";
import { BotReactionsHandler } from "./reactions";
import { updateAndGetRoleList } from "./roles";

export const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });


client.on("ready", () => {
    console.log(`Logged in as ${ client?.user?.tag }`);
});

client.on('message', message => {
	console.log(message.content);
  // case command
  if(message.content[0] === prefix){
    BotCommandHandler.next(message, [botChannelId])
  }
  // message.awaitReactions()
	// .then(collected => {)
});

client.on('messageReactionAdd', (reaction, user) =>{
  BotReactionsHandler.next(reaction, user, {type:"add"});
})

client.on('messageReactionRemove', (reaction, user) =>{
  BotReactionsHandler.next(reaction, user, {type:"remove"});
})

const token = DISCORD_TOKEN;
if (!token) {
    throw new Error("DISCORD_TOKEN has not been set");
}

// noinspection JSIgnoredPromiseFromCall
client.login(token);
