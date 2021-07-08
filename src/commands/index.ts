import { Client, Message, MessageReaction } from "discord.js";
import { CommandMap } from "../commands-misc/command-map";
import { prefix } from "../config";
import { help } from "./help";
import {ping, react } from "./misc-commands";



export class BotCommandHandler {
  static next(message: Message, channelList?: string[]) {
    try {
      if (!channelList || channelList.some((channelId) => message.channel.id === channelId)) {
      
        if (message.content === `${prefix}ping`) {
          ping(message);
        } else if (message.content === `${prefix}help`) {
          help(message);
        } else if(message.content === `${prefix}react`){
          react(message);
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  constructor() { }
}


