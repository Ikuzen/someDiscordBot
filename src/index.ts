import { Client } from "discord.js";
import { DISCORD_TOKEN } from "./config";

const client = new Client();

client.on("ready", () => {
    console.log(`Logged in as ${ client?.user?.tag }`);
});

client.on("message", message => {
    console.log(message.content);
});

client.on("messageUpdate", (oldMessage, newMessage) => {
    console.log(oldMessage.content, " -> ", newMessage.content);
});

client.on("messageDelete", message => {
    console.log("deleted:", message.content)
});

const token = DISCORD_TOKEN;
if (!token) {
    throw new Error("DISCORD_TOKEN has not been set");
}

// noinspection JSIgnoredPromiseFromCall
client.login(token);
