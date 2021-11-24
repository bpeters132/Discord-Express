import { startServer } from "./server.js"
import { Client, Intents } from "discord.js"
import dotenv from "dotenv"
dotenv.config()

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
  disableMentions: 'everyone'
});
const app = startServer(client)

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
  client.user.setActivity('Serving the People');
})

client.login(process.env.DISCORD_BOT_TOKEN)

var server = app.listen(process.env.PORT || 3000, () => {
  console.log('server is running on port', server.address().port);
});