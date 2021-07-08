import { MessageReaction, PartialUser, User } from "discord.js";
import { roleChannelId, roleMessageId } from "../config";
import { updateAndGetRoleList } from "../roles";
import { clearReacts } from "./reactions";

const roleId = roleMessageId;

export class BotReactionsHandler {
  static async next(messageReaction: MessageReaction, user: User | PartialUser, channelList?: string[]) {
    let message = messageReaction.message
    if (messageReaction.message.id === roleId) {
      const filter = (reaction:any, user:any) => {
        return ['💩', '💰'].includes(reaction.emoji.name) && user.id === message.author.id;
      };

      let roleList = await updateAndGetRoleList(messageReaction.message);
      if (messageReaction.emoji.name === "💩") {
        let poopRole = roleList?.find((role) => role.name === "poop")
        
        if (poopRole) {
          console.log("adding role")
          messageReaction.message.guild?.members.fetch(user.id)
          .then((userWhoReacted)=>{
            userWhoReacted.roles.set(poopRole);
          })
          console.log(messageReaction.message.guild)
          
        }
      }
      else if (messageReaction.emoji.name === "💰") {

      }
    };

    // clearing bot reactions with 👎
    if (messageReaction.partial) {
      try {
        await messageReaction.fetch();
        if (messageReaction.emoji.name === '👎') {
          clearReacts(messageReaction)
        }
      } catch (error) {
        console.error('Something went wrong when fetching the message: ', error);
        return;
      }
    }
    console.log(`${messageReaction.message.author} 's message "${messageReaction.message.content}" gained a reaction!`);
    console.log(`${messageReaction.count} user(s) have given the same reaction to this message!`);
  }
}