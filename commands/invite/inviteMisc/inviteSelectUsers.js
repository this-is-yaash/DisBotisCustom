const { ActionRowBuilder, UserSelectMenuBuilder, ComponentType } = require('discord.js');

module.exports = {
    createUserMenu: async (interaction, selectedValue) => {
        const userSelect = new ActionRowBuilder()
            .addComponents(
                new UserSelectMenuBuilder()
                    .setCustomId('users')
                    .setPlaceholder('Select multiple users.')
                    .setMinValues(1)
                    .setMaxValues(5)
            );

        return userSelect;
    },

    createUserCollector: (interaction) => {
        const userCollector = interaction.channel.createMessageComponentCollector({
            componentType: ComponentType.SELECT_MENU,
            filter: (i) => i.user.id === interaction.user.id && i.customId === 'users',
            time: 10000,
        });

        const selectedUsers = []; // Array to store selected user IDs

        userCollector.on('collect', (userInteraction) => {
            const userIds = userInteraction.values; // Get the selected user IDs
            userIds.forEach((userId) => {
                selectedUsers.push(userId); // Store the selected user IDs
            });
        });

        userCollector.on('end', (collected) => {
            // Perform any additional actions after user selection ends
            console.log(`Collected ${selectedUsers.length} user IDs: ${selectedUsers}`);
        });

        return userCollector;
    }
};
