const { EmbedBuilder } = require('discord.js')

module.exports = {
    checkPermission : async (interaction, requiredRole) => {
    // Check if the member has the required role
    if (!interaction.member.roles.cache.some(role => role.name === requiredRole)) {
        const embed = new EmbedBuilder()
          .setColor('#ff0000')
          .setTitle('Permission Denied')
          .setDescription(`Sorry, you do not have the access to use the \`${interaction.commandName}\` command.`)
          .setTimestamp();
        await interaction.reply({ embeds: [embed], ephemeral: true });
        return false;
    }
    return true;
},
}