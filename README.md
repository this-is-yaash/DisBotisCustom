# DisBotisCustom 

## Features

1. **Welcome and Goodbye Events:**
    - **Event Triggers:** Automatically initiates welcome and goodbye `embeds` upon `guildMemberAdd` & `guildMemberRemove`.
    - **Channel Customization:** Allows selection of specific `#text channels` for these messages.
    - **Personalization:** Customizes messages with randomly selected `emojis` for a unique touch.
    - **Automated Role Assignment:** Facilitates role allocation upon entry for new members.
        - Assigns designated roles to newcomers.
        - Sends tailored direct messages for a personalized experience.
    - **Role Restrictions:** Limits access to `/welcome` and `/goodbye` commands to specific roles for enhanced control and security.

2. **Command-Based Help System:**
    - `/help` command showcasing available commands.

3. **Admin Commands:**

| **Command** | **Description** | **Usage** | **Permissions** | **Functionality** |
|-------------|-----------------|-----------|-----------------|-------------------|
| `/kick`     | Remove users    | `/kick <@user> <reason>` | Specified Roles | Kicks user with reason |
| `/ban`      | Ban users       | `/ban <@user> <reason>`  | Specified Roles | Bans user with reason |
| `/unban`    | Unban users     | `/unban <username>`      | Specified Roles  | Unbans user by username or ID |
