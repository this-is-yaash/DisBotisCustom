const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js')
// Import the functions from roleShow.js and roleSelect.js
const { generateRoleSelectMenu } = require('./rolesMisc/roleShow.js')
const { handleRoleSelection } = require('./rolesMisc/roleSelect.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('promote')
    .setDescription('Request for role promotion.'),

  // Your execute function
  async execute (interaction) {
    try {
      const guild = interaction.guild
      const roles = guild.roles.cache
        .filter((role) => !role.managed && role.name !== '@everyone')
        .map((role) => role.name)

      // Generate role selection menu
      const roleMenu = generateRoleSelectMenu(roles)

      // Defer the initial response
      await interaction.deferReply({ ephemeral: true })

      // Send the role selection menu
      await interaction.followUp({ content: 'Please select a role:', components: [roleMenu] })

      // Handle role selection
      handleRoleSelection(interaction, roles, guild)
    } catch (error) {
      console.error('Error in processing the role promotion:', error)
    }
  }
}
