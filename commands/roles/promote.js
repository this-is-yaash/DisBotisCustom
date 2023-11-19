const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('promote')
    .setDescription('Request for role promotion.'),

  async execute(interaction) {
    // Get the guild from the interaction
    const guild = interaction.guild;

    // Fetch all roles available in the guild
    const roles = guild.roles.cache
      .filter((role) => !role.managed && role.name !== '@everyone')
      .map((role) => role.name);

    // Create options for the role selection dropdown menu
    const roleOptions = roles.map((role, index) => ({
      label: role,
      value: `role_${index}`,
    }));

    // Create a role selection menu with a dropdown
    const roleMenu = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('roleMenu')
        .setPlaceholder('Select a role')
        .addOptions(roleOptions)
    );

    // Send the role selection menu
    await interaction.reply({ content: 'Please select a role:', components: [roleMenu] })
      .catch(console.error);

    // Handle the selection
    const filter = (interaction) => interaction.customId === 'roleMenu';
    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async (interaction) => {
      // Get the selected role
      const selectedRole = interaction.values[0].split('_')[1];
      const roleName = roles[selectedRole];

      // Get the Admin role
      const adminRole = guild.roles.cache.find((role) => role.name === 'Admin');

      // Send a DM to the Admin role mentioning the selected role
      if (adminRole) {
        const adminMembers = adminRole.members;
        adminMembers.forEach(async (admin) => {
          try {
            await admin.send(`User ${interaction.user.tag} requested role: ${roleName}`);
          } catch (error) {
            console.error(`Failed to send DM to ${admin.user.tag}: ${error}`);
          }
        });

        // Edit the response to an embed with a message indicating the request was sent
        const requestSentEmbed = new EmbedBuilder()
          .setColor('#0099ff')
          .setTitle('Role Request Sent')
          .setDescription(`Your request for the role "${roleName}" has been sent to the admins.`);

        interaction.editReply({ content: '', embeds: [requestSentEmbed] })
          .catch(console.error);
      }
    });
  },
};
