const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ComponentType } = require('discord.js');

const games = [
    {
        label: "Valorant",
        description: "5v5 PvP",
        value: "VALO"
    },
    // ... (other game options)
];

module.exports = {
    createGameMenu: async (interaction) => {
        const gameMenu = new ActionRowBuilder()
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

        return gameMenu;
    },

    createGameCollector: (interaction) => {
        const gameCollector = interaction.channel.createMessageComponentCollector({
            componentType: ComponentType.SELECT_MENU,
            filter: (i) => i.user.id === interaction.user.id && i.customId === 'select_game',
            time: 10000,
        });

        return gameCollector;
    }
};
