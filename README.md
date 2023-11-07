# Command Implementation

## Creating Individual Command Files
- ping.js
	```
	const { SlashCommandBuilder } = require('discord.js');

	module.exports = {
		data: new SlashCommandBuilder()
			.setName('ping')
			.setDescription('Replies with Pong!'),
		async execute(interaction) {
			await interaction.reply('Pong!');
		},
	};
	```
- server.js
	```
	const { SlashCommandBuilder } = require('discord.js');

	module.exports = {
		data: new SlashCommandBuilder()
			.setName('server')
			.setDescription('Provides information about the server.'),
		async execute(interaction) {
			// interaction.guild is the object representing the Guild in which the command was run
			await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
		},
	};
	```
## Register Commands (Add/Update)

```
const { REST, Routes } = require('discord.js');
require('dotenv').config(); // Load environment variables from a .env file
const fs = require('node:fs');
const path = require('node:path');

<<<<<<< HEAD
=======
*Refer [discord.js](https://discordjs.guide/creating-your-bot/slash-commands.html) library to start working on implementing commands*

## Command Deploy

When we run this code, it will register the commands into the bot

```
const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

>>>>>>> command
const commands = [];
// Grab all the command files from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    console.log(commandFiles)
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
        // console.log(filePath)
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
// Construct and prepare an instance of the REST module
<<<<<<< HEAD
const rest = new REST().setToken(process.env.BOT_TOKEN);
=======
const rest = new REST().setToken(token);
>>>>>>> command

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
<<<<<<< HEAD
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
			{ body: commands },
		);
=======
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

>>>>>>> command
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
<<<<<<< HEAD

```

## Command Execution & Handling

Implemented in `main` file, can be used in a separate file to implement this to encourage readability.

```
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, IntentsBitField } = require('discord.js');

=======
```
> Run this file `node <filename>.js` to registering new command(s) files.

## Command Handler

This code is responsible for handling the command by dynamically executing the proper commands.

```
>>>>>>> command
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
<<<<<<< HEAD
  
=======

>>>>>>> command
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});
<<<<<<< HEAD
```
=======
```

## Command Files

Command files should be individually written with functions and operations.

### ping.js
```
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};
```

### server.js
```

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
	},
};
```
> Make sure to save these command files inside `subfolders` rather than placing these inside the `folder`.
>>>>>>> command
