const { EmbedBuilder } = require('discord.js');
require('dotenv').config();

const greetings = [
  'Welcome to the server!',
  'Hello and welcome!',
  'Glad to have you here!',
  'Welcome aboard!',
  'Hey there, welcome!',
  'Greetings, traveler!',
  'It\'s party time! Welcome!',
  'Buckle up, new friend. The fun is just beginning!',
  'Hooray! A new member has arrived!',
  'Get ready for an adventure, new recruit!',
  'Time to celebrate! You\'ve joined the party!',
  'A warm welcome to our fantastic new member!',
  'Welcome to the family! Grab a seat and enjoy!',
  'We were waiting for someone as awesome as you. Welcome!',
  'New member detected! Welcome to the chaos!'
];


module.exports = {
  execute: (member) => {
    // Select a random greeting from the array
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

    // Create the welcome embed with the random greeting
    const welcomeEmbed = new EmbedBuilder()
      .setColor('#00ff00')
      .setTitle('Welcome to the Server!')
      .setDescription(`${randomGreeting} **${member.displayName}**`)
      .setThumbnail(member.user.displayAvatarURL())
      .addFields(
        { name: 'User Name', value: member.user.tag },
        { name: 'Name', value: member.displayName },
        { name: 'Join Date', value: member.joinedAt.toDateString() }
      )
      .setImage('https://img.freepik.com/free-vector/lovely-welcome-composition-with-origami-style_23-2147920269.jpg?w=826&t=st=1694888632~exp=1694889232~hmac=3d1090555f6a0c31f9ddbf33c4a2cd155c84e8fbf783f4286c9b523b5092b631'); // Reference the attachment by its filename

    // Send the embed to a specific channel in your server
    const channel = member.guild.channels.cache.get(process.env.WELCOME);
    if (channel) {
      channel.send({ embeds: [welcomeEmbed] });
      console.log('guildMemberAdd event triggered. Member');
    }
  },
};
