const inviteSelectGame = require('./inviteSelectGame');
const inviteSelectUsers = require('./inviteSelectUsers');

module.exports = {
    selectedGame: "", // Variable to store selected game globally

    inviteCommandEmbed: async (interaction, client) => {
        try {
            const gameMenu = await inviteSelectGame.createGameMenu(interaction);
            await interaction.reply({ content: "Select Game", components: [gameMenu] });

            const gameCollector = inviteSelectGame.createGameCollector(interaction);
            gameCollector.on('collect', async (selectInteraction) => {
                const selectedValue = selectInteraction.values[0];
                this.selectedGame = selectedValue;

                const userSelect = await inviteSelectUsers.createUserMenu(interaction, selectedValue);
                await selectInteraction.update({
                    content: `You selected: ${selectedValue}. Now select users:`,
                    components: [userSelect],
                });

                const userCollector = inviteSelectUsers.createUserCollector(interaction);
                userCollector.on('collect', async (userInteraction) => {
                    const selectedUsers = userInteraction.values;

                    selectedUsers.forEach(async (userId) => {
                        const user = await client.users.fetch(userId);
                        await user.send(`Reply with the selected game name: ${this.selectedGame}`);
                    });

                    await interaction.channel.send("Sent DMs to selected users to reply with the selected game name.");
                });

                userCollector.on('end', (collected) => {
                    console.log(`Collected ${collected.size} user interactions`);
                    // Perform additional actions or post-processing if needed
                });
            });

            gameCollector.on('end', (collected) => {
                console.log(`Collected ${collected.size} interactions`);
                // Perform additional actions or post-processing if needed
            });
        } catch (error) {
            console.error('Error fetching commands:', error);
            interaction.reply({ content: 'Error fetching commands.', ephemeral: true });
        }
    },
};
