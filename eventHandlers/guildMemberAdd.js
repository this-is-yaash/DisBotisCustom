const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');
require('dotenv').config();

const greetings = [
  '🌟 Welcome to the server!\n',
  '👋 Hello and welcome!\n',
  '😊 Glad to have you here!\n',
  '🚀 Welcome aboard!\n',
  '👋 Hey there, welcome!\n',
  '🌍 Greetings, traveler!\n',
  '🎉 It\'s party time! Welcome!\n',
  '🎈 Buckle up, new friend.\n The fun is just beginning!\n',
  '🎉 Hooray! A new member has arrived!\n',
  '🌟 Get ready for an adventure, new recruit!\n',
  '🎉 Time to celebrate! You\'ve joined the party!\n',
  '🏠 A warm welcome to our fantastic new member!\n',
  '👪 Welcome to the family!\n Grab a seat and enjoy!\n',
  '🌟 We were waiting for someone as awesome as you.\n Welcome!\n',
  '🌀 New member detected!\n Welcome to the chaos!\n'
];

const emojis = ['🌟', '👋', '😊', '🚀', '👋', '🌍', '🎉', '🎈', '🎉', '🌟', '🎉', '🏠', '👪', '🌟', '🌀'];

module.exports = {
  execute: async (member) => {
    // Select a random greeting from the array
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

    // Select a random emoji from the array
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

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
    const channel = member.guild.channels.cache.get(config.welcome_id);
    
    if (channel) {
      const sentMessage = await channel.send({ embeds: [welcomeEmbed] });
      
      // Add a reaction using the random emoji
      await sentMessage.react(randomEmoji);
      console.log('guildMemberAdd event triggered. Member');
    }
    
    // Role Assignment Logic
    const role = member.guild.roles.cache.find(role => role.name === 'Member');
    if (role) {
      try {
        await member.roles.add(role);
        console.log(`Assigned 'Member' role to ${member.user.tag}`);
        // Sending a DM to the member after role assignment
        const dmEmbed = new EmbedBuilder()
          .setColor('#3498db')
          .setTitle('Role Assigned')
          .setDescription('You have been assigned the `Member` role!')
          .addFields(
            {name: 'Server', value:member.guild.name },
            {name: 'Role', value: role.name}
          )        
        // Sending the DM to the member
        await member.send({ embeds: [dmEmbed] });
        console.log(`Sent DM to ${member.user.tag}`);
      } catch (error) {
        console.error(`Error assigning role to ${member.user.tag}:`, error);
      }
    } else {
      console.error("Could not find 'Member' role in the server.");
    }
  },
};
