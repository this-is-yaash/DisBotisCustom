const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

let selectedGame =[]
console.log(selectedGame)
module.exports = {
    inviteCommandEmbed: async (interaction, client) => {
        try {
            const menu = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('select_game')          
                        .setPlaceholder("Select Game")
                        .addOptions([
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
                        ])
                );
            await interaction.reply({ content: "Select Game", components: [menu] });

            // Collect the interaction for the select menu
            const collector = interaction.channel.createMessageComponentCollector({ componentType: 'SELECT_MENU', time: 15000 });

            collector.on('collect', async (selectInteraction) => {
                if (selectInteraction.isSelectMenu()) {
                    const selectedOption = selectInteraction.values[0]; // Assuming only one value can be selected
                    selectedValues.push(selectedOption); // Store the selected value in the array
                    await selectInteraction.reply(`You selected ${selectedOption}`);
                    // You can perform further processing here based on the selectedOption value
                }
            });

            collector.on('end', (collected) => {
                console.log(`Collected ${collected.size} interactions`);
                // You can perform additional actions or post-process the collected values here if needed
            });

        } catch (error) {
            console.error('Error fetching commands:', error);
            interaction.reply({ content: 'Error fetching commands.', ephemeral: true });
        }
    },
    getSelectedValues: () => {
        return selectedValues;
    }
};
