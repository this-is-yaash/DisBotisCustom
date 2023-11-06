# DisBotisCustom
A lightweight discord bot with customized features.

#### Readme for setting up the bot application.

## Command Implementation
For fully functional slash commands, there are three important pieces of code that need to be written. [They are](https://discordjs.guide/creating-your-bot/slash-commands.html#before-you-continue):

1. The individual command files, containing their definitions and functionality.
2. The *command handler*, which dynamically reads the files and executes the commands.
3. The *command deployment script*, to register your slash commands with Discord so they appear in the interface.

>These steps can be done in any order, but all are required before the commands are fully functional.

*Refer [discord.js](https://discordjs.guide/creating-your-bot/slash-commands.html#individual-command-files) library to start working on implementing commands*