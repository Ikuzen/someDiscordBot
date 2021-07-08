import { Client, Message } from "discord.js";

export function ping(message: Message) {
  message.channel.send("pong")
}

export async function react(message: Message) {
  try {
    await message.react('😄');
    await message.react('🍊');
    await message.react('🍇');
  } catch (error) {
    console.error('One of the emojis failed to react:', error);
  }
}