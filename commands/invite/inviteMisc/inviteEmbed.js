const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ComponentType } = require('discord.js');

// console.log(selectedGame)

const games =[
    {
        label: "Valorant",
        description: "5v5 PvP",
        value: "VALO"
    },
    {
        label: "Minecraft",
        description: "Survival Sandbox",
        value: "MC"
    },
    {
        label: "GTA V",
        description: "Open-World",
        value: "GTA V"
    }
]

module.exports = {

    inviteCommandEmbed: async (interaction, client) => {
        try {
            const menu = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('select_game')          
                        .setPlaceholder("Select Game")
                        .addOptions(
                            games.map((game) =>
                            new StringSelectMenuOptionBuilder()
                                .setLabel(game.label)
                                .setDescription(game.description)
                                .setValue(game.value)
                            )
                        )
                );
            await interaction.reply({ content: "Select Game", components: [menu], ephemeral: true });
            const collector = interaction.channel.createMessageComponentCollector({
                componentType: ComponentType.StringSelect,
                filter: (i) => i.user.id === interaction.user.id && i.customId === 'select_game',
                time: 10000,
            })
            collector.on('collect', (selectInteraction) => {
                console.log(selectInteraction.values);
                // Do something with the selected values here
                interaction.deleteReply({ content: "Selected", ephemeral: true })
            })

            collector.on('end', (collected) => {
                console.log(`Collected ${collected.size} interactions`);
                // Perform additional actions or post-processing if needed
            })
        } catch (error) {
            console.error('Error fetching commands:', error);
            interaction.reply({ content: 'Error fetching commands.', ephemeral: true });
        }
    },
};
