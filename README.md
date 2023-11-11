# Guild Member Events Documentation

## Introduction

This documentation provides a guide on implementing `guildMemberAdd` and `guildMemberRemove` events in a Discord bot using Discord.js. These events are triggered when a member joins or leaves a server, allowing you to perform custom actions such as sending welcome messages or farewell messages.

## Table of Contents

1. [Implementation](#implementation)
   - [Guild Member Add](#guild-member-add)
   - [Guild Member Remove](#guild-member-remove)
2. [Customization](#customization)
3. [Example Code](#example-code)

## Implementation

```javascript
// Load all event handlers dynamically
const eventHandlerDir = path.join(__dirname, 'eventHandlers');
fs.readdirSync(eventHandlerDir).forEach((file) => {
  const eventHandler = require(path.join(eventHandlerDir, file));
  const eventName = file.split('.')[0]; // Remove the file extension
  client.on(eventName, eventHandler.execute);
});
```
with this code, it will trigger the `guildMemberAdd` & `guildMemberRemove` events

>It has been implemented like when this event occurs, this will implement the mentioned files or program. Such as `guildMemberAdd.js` and `guildMemberRemove.js`.

### Guild Member Add

The `guildMemberAdd` event is triggered when a member joins the server

```javascript
// Example Implementation
client.on('guildMemberAdd', (member) => {
  // Your custom code here
});
```

### Guild Member Remove

The `guildMemberRemove` event is triggered when a member joins the server

```javascript
// Example Implementation
client.on('guildMemberRemove', (member) => {
  // Your custom code here
});
```

## Example code

- prime.js 

```javascript
const fs = require('node:fs');
const path = require('node:path');

// Load all event handlers dynamically
const eventHandlerDir = path.join(__dirname, 'eventHandlers');
fs.readdirSync(eventHandlerDir).forEach((file) => {
  const eventHandler = require(path.join(eventHandlerDir, file));
  const eventName = file.split('.')[0]; // Remove the file extension
  client.on(eventName, eventHandler.execute);
});
```

- guildMemberAdd.js

```javascript
const { EmbedBuilder } = require('discord.js');
require('dotenv').config();

const greetings = [
  'Welcome to the server!',
  'Hello and welcome!',
  'Glad to have you here!',
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
      .setImage('img link'); // Reference the attachment by its filename

    // Send the embed to a specific channel in your server
    const channel = member.guild.channels.cache.get(process.env.WELCOME);
    if (channel) {
      channel.send({ embeds: [welcomeEmbed] });
      console.log('guildMemberAdd event triggered. Member');
    }
  },
};

```

- guildMemberRemove.js

```javascript
const { EmbedBuilder } = require('discord.js');
require('dotenv').config(); // Load environment variables from a .env file

const farewells = [
  'Farewell, friend. We\'ll miss you!',
  'Goodbye and take care!',
  'Sad to see you go. Farewell!',
];


module.exports = {
  execute: (member) => {
    const randomFarewell = farewells[Math.floor(Math.random() * farewells.length)];

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
      .setImage('img link')

    // Send the embed to a specific channel in your server
const channel = member.guild.channels.cache.get(process.env.GOODBYE);
    if (channel) {
      channel.send({ embeds: [goodbyeEmbed] });
      console.log('guildMemberRemove event triggered. Member:');
    }
  },
};

```