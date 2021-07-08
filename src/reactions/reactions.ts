import { Client, Message, MessageReaction } from "discord.js";

export async function clearReacts(messageReaction: MessageReaction) {
  messageReaction.message.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
}