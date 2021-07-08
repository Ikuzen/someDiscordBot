import { GuildMember, MessageReaction, PartialUser, Role, User } from "discord.js";
import { roleChannelId, roleMessageId } from "../config";
import { updateAndGetRoleList } from "../roles";
import { clearReacts } from "./reactions";

const roleId = roleMessageId;

const roleMap = {
  "💩": "poop",
  "💰": "money"
}

interface Options{
  type:string
}


function addRole(member: GuildMember, roleList: Role[], reaction: MessageReaction){
  let emoji = reaction.emoji.name;
  // @ts-ignore
  let roleId = roleList?.find((role)=> role.name === roleMap[emoji])?.id
  if(roleId)member.roles.add(roleId);
  console.log("adding")

}

function removeRole(member: GuildMember, roleList: Role[], reaction: MessageReaction){
  let emoji = reaction.emoji.name;
  // @ts-ignore
  let roleId = roleList?.find((role)=> role.name === roleMap[emoji])?.id
  console.log("removing")
  if(roleId)member.roles.remove(roleId);
}


export class BotReactionsHandler {
  static async next(messageReaction: MessageReaction, user: User | PartialUser, options?:Options) {
    let message = messageReaction.message
    let reactUser = await messageReaction.message.guild?.members.fetch(user.id);
    if (messageReaction.message.id === roleId && reactUser) {
      let roleList = await updateAndGetRoleList(messageReaction.message);
      if(roleList){
        if(options?.type === "add"){
          addRole(reactUser, roleList, messageReaction);
         }
        else if (options?.type === "remove"){
          removeRole(reactUser, roleList, messageReaction) ;
        } 
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