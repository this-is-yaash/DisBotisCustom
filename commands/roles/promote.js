const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('promote')
    .setDescription('Request for role promotion.'),

  async execute(interaction) {
    try {
      const guild = interaction.guild;

      const roles = guild.roles.cache
        .filter((role) => !role.managed && role.name !== '@everyone')
        .map((role) => role.name);

      const roleOptions = roles.map((role, index) => ({
        label: role,
        value: `role_${index}`,
      }));

      const selectOptions = roleOptions.map((option) =>
        new StringSelectMenuOptionBuilder()
          .setLabel(option.label)
          .setValue(option.value)
      );

      const selectMenu = new StringSelectMenuBuilder()
        .setCustomId('roleMenu')
        .setPlaceholder('Select a role')
        .addOptions(selectOptions);

      const row = new ActionRowBuilder().addComponents(selectMenu);

      // Defer the initial response
      await interaction.deferReply({ ephemeral: true });

      // Send the role selection menu
      await interaction.followUp({ content: 'Please select a role:', components: [row] })
        .catch(console.error);

      const filter = (interaction) => interaction.customId === 'roleMenu';
      const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

      collector.on('collect', async (interaction) => {
        try {
          const selectedRole = interaction.values[0].split('_')[1];
          const roleName = roles[parseInt(selectedRole)];

          const adminRole = guild.roles.cache.find((role) => role.name === 'Admin');

          if (adminRole) {
            const adminMembers = adminRole.members;
            for (const admin of adminMembers) {
              await admin.send(`User ${interaction.user.tag} requested role: ${roleName}`);
            }

            const requestSentEmbed = new EmbedBuilder()
              .setColor('#0099ff')
              .setTitle('Role Request Sent')
              .setDescription(`Your request for the role "${roleName}" has been sent to the admins.`);

            await interaction.update({ content: '', embeds: [requestSentEmbed], components: [] }).catch(console.error);
          }
        } catch (error) {
          console.error('Failed to process the role request:', error);
          const errorMessage = 'Failed to send the request. Please try again later.';
          interaction.followUp(errorMessage).catch(console.error);
        }
      });
    } catch (error) {
      console.error('Error in processing the role promotion:', error);
    }
  },
};
