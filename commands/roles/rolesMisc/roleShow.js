const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js')

function generateRoleSelectMenu (roles) {
  const roleOptions = roles.map((role, index) => ({
    label: role,
    value: `role_${index}`
  }))

  const selectOptions = roleOptions.map((option) =>
    new StringSelectMenuOptionBuilder()
      .setLabel(option.label)
      .setValue(option.value)
  )

  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId('roleMenu')
    .setPlaceholder('Select a role')
    .addOptions(selectOptions)

  const row = new ActionRowBuilder().addComponents(selectMenu)

  return row
}

module.exports = {
  generateRoleSelectMenu
}
