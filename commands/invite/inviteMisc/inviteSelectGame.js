const { ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js')

module.exports={
    inviteSelectGame: async(interaction, client) => {
        try{

            const menu = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                .setCustomId('game_selection_menu')
                .setPlaceholder("Select Game")
                .addOptions(
            {
            label:"first",
            description: "first test description",
            value: "OPTION 1",
            },
            {
                label: "second",
                description:"second test description",
                value: "OPTION 2"
            }
            )
            )
            await interaction.reply({content: "This is reply interaction", components:[menu], ephemeral: true})
        } catch (error){
            console.log(error)
            await interaction.reply({content: "Error Fetching Dropdown", ephemeral: true })
        }

    }
}


