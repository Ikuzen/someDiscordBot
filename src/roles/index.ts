import { Message, Role } from "discord.js";

export function updateAndGetRoleList(message: Message): Role[] | undefined {
  return message?.guild?.roles.cache
    .sort((a, b) => b.position - a.position)
    .map(r => r)
}