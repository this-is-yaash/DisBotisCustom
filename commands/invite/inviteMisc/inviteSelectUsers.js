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

        return userCollector;
    }
};
