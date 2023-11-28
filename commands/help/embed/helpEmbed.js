const { EmbedBuilder } = require('discord.js')

module.exports = {
  helpEmbed: async (interaction, client) => {
    try {
      await client.application?.commands.fetch()
      const guildCommands = await interaction.guild.commands.fetch()

      let commandList = ''

      guildCommands.forEach((command) => {
        commandList += `\`/${command.name}\`\n**${command.description}**\n\n`
      })

      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('Help Commands')
        .setDescription('Here are available commands:')
        .addFields({
          name: 'Commands:', value: commandList
        }
        )

      await interaction.reply({ embeds: [embed], ephemeral: true })
    } catch (error) {
      console.error('Error fetching commands:', error)
      await interaction.reply({ content: 'Error fetching commands.', ephemeral: true })
    }
  }
}
