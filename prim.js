require('dotenv').config(); // Load environment variables from a .env file

const fs = require('node:fs');
const path = require('node:path');

const welcomeHandler = require('./eventHandlers/guildMemberAdd'); // Import the welcome handler
const goodbyeHandler = require('./eventHandlers/guildMemberRemove'); //Import the goodbye handler


const { Client, Collection, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers,] });

// Greet Messages
client.on('guildMemberAdd', async (member) => {
	const welcomeChannelId = process.env.WELCOME; 
	const welcomeChannel = member.guild.channels.cache.get(welcomeChannelId);
  
	if (!welcomeChannel) return;
  
	const sentMessage = await welcomeHandler.handleWelcome(member, welcomeChannel);
  });
  // Depart Messages
  client.on('guildMemberRemove', async (member) => {
	const goodbyeChannelId = process.env.GOODBYE;
	const goodbyeChannel = member.guild.channels.cache.get(goodbyeChannelId);
  
	if (!goodbyeChannel) return;
  
	const sentMessage = await goodbyeHandler.handleGoodbye(member, goodbyeChannel);
  });

//command handling
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	console.log(`Command :${commandFiles}`)
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

//event handling
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
console.log(`Events :${eventFiles}`)

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
  
client.login(process.env.BOT_TOKEN);