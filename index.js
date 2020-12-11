import { Client } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client();

client.on('ready', () => {});

client.on('messageReactionAdd', (reaction, user) => {
  if (reaction.emoji.name === '📌') {
    console.log(
      `Pinning message ${reaction.message.content} from user ${user.username}`
    );
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

client.login(process.env.BOT_TOKEN);
