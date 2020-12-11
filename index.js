import { Client } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client();

client.on('ready', () => {});

client.on('messageReactionAdd', (reaction, user) => {
  if (reaction.emoji.name === '📌') {
    reaction.message.pin();
  }
});

client.on('messageReactionRemove', async (reaction, user) => {
  const pushpins = await reaction.message.awaitReactions(
    (reaction, user) => reaction.emoji.name === '📌'
  );
  if (pushpins.size === 0) {
    reaction.message.unpin();
  }
});

client.login(env.BOT_TOKEN);