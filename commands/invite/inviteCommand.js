const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder, StringSelectMenuOptionBuilder, ComponentType } = require('discord.js');

const config = require('./gameList.json');
const games = config.games


module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Send Invite for specified users'),

    async execute(interaction, client, users) {
        // Check permissions
        if (!interaction.member.permissions.has('SEND_MESSAGES')) {
            return await interaction.reply({ content: 'You don\'t have permission to use this command!', ephemeral: true });
        }    
        // Game selection
        const gameSelectionRow = new ActionRowBuilder()
            .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('game_selection')
                .setPlaceholder('Select a game')
                .addOptions(
                games.map((game) =>
                    new StringSelectMenuOptionBuilder()
                    .setLabel(game.label)
                    .setDescription(game.description)
                    .setValue(game.value)
                )
                )
            );
        // Send initial embed with game selection menu
        const initialEmbed = new EmbedBuilder()
            .setTitle('Choose a Game')
            .setDescription('Please select the game you want to invite members to play.');
        
        await interaction.reply({ embeds: [initialEmbed], components: [gameSelectionRow] });
        
        // Store selected game on interaction object
        interaction.selectedGame = null;  
        const collector = interaction.channel.createMessageComponentCollector({
            componentType: ComponentType.SELECT_MENU,
            filter: (i) => i.user.id === interaction.user.id && i.customId === 'game_selection',
            time: 10000,
        });
        
        // Collect selected game
        collector.on('collect', async (collected) => {
            interaction.selectedGame = games.find((game) => game.value === collected.values[0]); // Store selected game object
            
            // Create user selection menu
            const userSelectionMenu = await interaction.client.commands.get('inviteUsers').createUserMenu(interaction);
          
            // Edit reply with instructions and user selection menu
            await interaction.editReply({ content: `Select users to invite for ${interaction.selectedGame.label}:`, components: [userSelectionMenu] });
          
            // **Initialize userCollector inside collect event**
            const userCollector = interaction.client.commands.get('inviteUsers').createUserCollector(interaction);
        });
    }
};
