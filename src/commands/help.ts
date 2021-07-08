import { Client, Message } from "discord.js";

export function help(message: Message){
  message.channel.send("<@"+message.author.id+"> \n /help: display the available commands \n /ping: play ping pong with the bot \n /react: bot will react with a smile \n /clear-reacts : bot will clear all reactions "
  )
  console.log(message)
}