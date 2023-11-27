const { SlashCommandBuilder, ChannelType, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, EmbedBuilder } = require('discord.js');

const { writeFile } = require('./add/writeAddID')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('welcome')
        .setDescription('Text channel selection for welcome embeds'),

    async execute(interaction) {
        try {
            const guild = interaction.guild;
            if (!guild) return console.log('Unable to fetch guild.');

            const textChannels = guild.channels.cache.filter(channel => channel.type === ChannelType.GuildText);
            if (textChannels.size === 0) return console.log('No text channels found.');

            // Create options for the select menu based on text channels
            const channelOptions = textChannels.map(channel => {
                return new StringSelectMenuOptionBuilder()
                    .setLabel(channel.name)
                    .setDescription(`#${channel.name}`)
                    .setValue(channel.id);
            });

            // Create a select menu with the text channel options
            const selectMenu = new StringSelectMenuBuilder()
                .setCustomId('welcomeChannelSelector')
                .setPlaceholder('Select a channel')
                .addOptions(channelOptions);

            // Add the select menu to an action row
            const actionRow = new ActionRowBuilder().addComponents(selectMenu);

            // Reply to the interaction with the select menu
            await interaction.reply({
                content: 'Please select a channel for welcome messages:',
                components: [actionRow],
            });

            // Listen for the selection made by the user
            const filter = i => i.customId === 'welcomeChannelSelector' && i.user.id === interaction.user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

            collector.on('collect', async collected => {
                const selectedChannel = textChannels.find(channel => channel.id === collected.values[0]);
                if (!selectedChannel) {
                    await interaction.followUp('Error: Invalid channel selection.');
                } else {
                    console.log(`Selected channel ID: ${selectedChannel.id}`); // Logging the selected channel ID

                    const embed = new EmbedBuilder()
                        .setColor('#00ff00')
                        .setTitle('Channel Selected')
                        .setDescription(`You've selected ${selectedChannel.name} as the welcome channel!`);

                    // Update the interaction with the embed
                    await interaction.editReply({ content: '', embeds: [embed], components: [] });
                    collector.stop();

                    const channelID = selectedChannel.id;
                    // Call the function from writeAddID.js to write the channel ID to a file
                    writeFile(channelID);
                }
            });

            collector.on('end', collected => {
                if (collected.size === 0) {
                    interaction.followUp('Channel selection timed out.');
                }
            });
        } catch (error) {
            console.error('Error occurred:', error);
        }
    },
};