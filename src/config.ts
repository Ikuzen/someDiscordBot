import { config } from 'dotenv';
import * as path from 'path';

config({
    path: path.resolve('.env'),
});

function env(name: string): string {
    const value = process.env[name]?.trim();
    if (!value) {
        throw new Error(`Environment variable "${name}" must be defined`);
    }

    return value;
}

export const DISCORD_TOKEN = env('DISCORD_TOKEN');
export const WEBHOOK = env('WEBHOOK');
export const prefix = "/";
export const roleChannelId = env("ROLE_CHANNEL_ID");
export const botChannelId = env("BOT_CHANNEL_ID");
export const roleMessageId = env("ROLE_MESSAGE_ID")