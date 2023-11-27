const { EmbedBuilder } = require('discord.js');
require('dotenv').config(); // Load environment variables from a .env file

const farewells = [
  '👋 Farewell, friend. We\'ll miss you!',
  '🌟 Goodbye and take care!',
  '😢 Sad to see you go. Farewell!',
  '🌈 May your journey be filled with joy and success. Goodbye!',
  '🚀 Wishing you all the best on your new adventures. Goodbye!',
  '🌟 It won\'t be the same without you. Farewell!',
  '🛣️ Safe travels on the road ahead. Goodbye!',
  '🤗 Until we meet again, take care and farewell!',
  '😔 Your presence will be missed. Goodbye!',
  '🌷 Parting is such sweet sorrow. Farewell!',
  '🎭 Take a bow as you exit the stage of our server. Goodbye!',
  '📸 The memories we shared will linger even after your departure. Farewell!',
  '👋 A fond farewell to an amazing member. Goodbye!',
  '🌟 Your contributions were invaluable. Best of luck in your next journey. Farewell!',
  '🍃 May the wind be at your back as you embark on new endeavors. Goodbye!',
];

const emojis = ['👋', '🌟', '😢', '🌈', '🚀', '🛣️', '🤗', '😔', '🌷', '📸'];

module.exports = {
  execute: async (member) => {
    const randomFarewell = farewells[Math.floor(Math.random() * farewells.length)];

    // Select a random emoji from the array
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];


    const goodbyeEmbed = new EmbedBuilder()
      .setColor('#ff0000')
      .setTitle('Goodbye!')
      .setDescription(`${randomFarewell} **${member.displayName}**`)
      .setThumbnail(member.user.displayAvatarURL())
      .addFields(
        { name: 'User Name', value: member.user.tag },
        { name: 'Name', value: member.displayName },
        { name: 'Join Date', value: member.joinedAt.toDateString() },
        { name: 'Left Date', value: new Date().toDateString() } // Add the left date field
      )
      .setImage('https://img.freepik.com/free-vector/goodbye-good-luck-lettering-background_23-2147979463.jpg?w=826&t=st=1694888315~exp=1694888915~hmac=588717deb26330a44808516f9daecf30eb10d6a422173a1327526bead8a835fa')

    // Send the embed to a specific channel in your server
  const channel = member.guild.channels.cache.find(channel => channel.name === 'goodbye');
  if (channel) {
    const sentMessage = await channel.send({ embeds: [goodbyeEmbed] });
    
    // Add a reaction using the random emoji
    await sentMessage.react(randomEmoji);
    console.log('guildMemberRemove event triggered. Member:');
  }
  },
};
