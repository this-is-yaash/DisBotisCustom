const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Shows the server information'),

    async execute(interaction) {
        if (!interaction.inGuild()) {
            interaction.reply({
                content: "This command can only be used in a server.",
                ephemeral: true
            });
            return;
        }

        const guild = interaction.guild;

        const infoEmbed = new EmbedBuilder()
            .setTitle('Server Information')
            .setColor('#3498db') // You can change the color as needed
            .addFields(
                { name: 'Owner', value: (await guild.fetchOwner()).user.tag, inline: true },
                { name: 'Text Channels', value: guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').size, inline: true },
                { name: 'Voice Channels', value: guild.channels.cache.filter(c => c.type === 'GUILD_VOICE').size, inline: true },
                { name: 'Category Channels', value: guild.channels.cache.filter(c => c.type === 'GUILD_CATEGORY').size, inline: true },
                { name: 'Members', value: guild.memberCount, inline: true },
                { name: 'Roles', value: guild.roles.cache.size, inline: true },
                { name: 'Role List', value: guild.roles.cache.map(role => role.name).join(', ') }
            );

        await interaction.reply({ embeds: [infoEmbed] });
    }
};
