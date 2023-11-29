const { EmbedBuilder } =require('discord.js')

module.exports = {
    inviteCommandEmbed: async(interaction, client) => {
        try{
            const embed = new EmbedBuilder()
            .setColor("#FF0000")
            .setTitle("Invitation!")
            .setDescription("Invitation description for testing")
            .addFields({
                name: "Invite", value : "Value"
            })
            await interaction.reply({embeds :[embed], ephemeral: true})
        } catch (error) {
        console.error('Error fetching commands:', error)
        ainteraction.reply({ content: 'Error fetching commands.', ephemeral: true })
      }
  }
}