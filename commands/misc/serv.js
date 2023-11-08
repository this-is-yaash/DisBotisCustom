// const { SlashCommandBuilder } = require('discord.js');

// module.exports = {
// 	data: new SlashCommandBuilder()
// 		.setName('serv')
// 		.setDescription('Provides information about the server.')
// 		.addStringOption(option =>
// 			option.setName('query')
// 				.setDescription('Phrase to search for')
// 				.setAutocomplete(true)),

// 	async execute(interaction) {
// 		// interaction.guild is the object representing the Guild in which the command was run
// 		await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
// 	},
// };