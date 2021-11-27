import { startServer } from "./server.js"
import { Client, Intents } from "discord.js"
import dotenv from "dotenv"
dotenv.config()

const client = new Client({
  intents: [
    Intents.FLAGS.GUILD_MEMBERS,
  ],
  disableMentions: 'everyone'
});
const appServer = startServer(client)

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
  client.user.setActivity('Serving the People');
})

client.login(process.env.DISCORD_BOT_TOKEN)

var server = appServer.listen(process.env.PORT || 443, () => {
  console.log('API Server is running on port', server.address().port);
});