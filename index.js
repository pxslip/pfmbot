import { Client } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client();

client.on('ready', () => {
  console.log('pfmbot is listening');
});

client.on('messageReactionAdd', (reaction, user) => {
  console.log('pfmbot hears you');
  if (reaction.emoji.name === '📌') {
    console.log(
      `Pinning message ${reaction.message.content} from user ${user.username}`
    );
    reaction.message.pin();
  }
});

client.on('messageReactionRemove', async (reaction, user) => {
  console.log('You no like pfmbot...');
  const pushpins = await reaction.message.awaitReactions(
    (reaction, user) => reaction.emoji.name === '📌'
  );
  if (pushpins.size === 0) {
    reaction.message.unpin();
  }
});

client.on('error', (error) => {
  console.error(error.message);
});

client.login(process.env.BOT_TOKEN);
