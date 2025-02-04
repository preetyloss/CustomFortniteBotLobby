# Dark Dus - A Custom Fortnite Bot Lobby

Dark Dus is a custom Fortnite lobby bot designed to help manage your lobby.

This project is open-source and free. Contributions are welcome!

## 📌 Information
- **Chapter 6 - Season 1**
- **Version: 2.5.8**
- **Created by: Mr_Julus**

## 🔧 Installation and Setup
### 1️⃣ Requirements
Make sure you have installed [Node.js](https://nodejs.org/) and the following dependencies:
```sh
npm install colors discord.js dotenv fnbr axios fs nconf
```

### 2️⃣ Authentication
You need to have a deviceAuth information !
if you already have the deviceAuth of a new account, you can put them in .env and run:
```sh
node index.js
```

else, you can obtain the deviceAuth by an **authorizationCode** by visiting this link:
[Login and Retrieve Code](https://www.epicgames.com/id/logout?redirectUrl=https%3A//www.epicgames.com/id/login%3FredirectUrl%3Dhttps%253A%252F%252Fwww.epicgames.com%252Fid%252Fapi%252Fredirect%253FclientId%253D3f69e56c7649492c8cc29f1af08a8a12%2526responseType%253Dcode)

and then, run:
```sh
node ./client/createDeviceAuth.js
```

## Customize your bot
### You can fully customize your Fortnite Bot and Discord Bot
You can fully customize it by editing the config.json file

### 3️⃣ Configure Discord Webhook
Edit the `.env` file with your webhook URL to receive logs.

### 3️⃣ Configure Discord Bot
Edit the `.env` file with your Discord Token.

## 🏷️ Branches
- **[Default] `main`** (version 2.5.8)
- **[Obsolete] `DarkDus-v1`** (version 1.3.6)

## 🚀 New Features
✅ Detection of Fortnite matchmaking ban with a special status.
✅ Automatic verification of device info.
✅ New custom command: `stopTimer`.

## 🛠️ Discord Bot Commands
| Command | Description |
|----------|-------------|
| `/restart` | Restart the bot |
| `/admin add <accountID>` | Add an admin |
| `/admin delete <username>` | Remove an admin |
| `/admin list` | Show the admin list |
| `/banned_player add <username>` | Ban a player |
| `/banned_player remove <username>` | Unban a player |
| `/banned_player list` | List banned players |
| `/help` | Display help |
| `/show_bot` | Show bot information |
| `/logout` | Log out the bot |

## 🎮 Fortnite Commands
### 🎭 Appearance
- `bot@outfit <newSkin>`: Change the bot's skin.
- `bot@pickaxe <newPickaxe>`: Change the bot's pickaxe.
- `bot@backpack <newBackpack>`: Change the bot's backpack.

### 🏠 Party and Friends
- `bot@changeGamemode <gamemode>`: Change the game mode.
- `bot@kick <username>`: Kick a player from the party.
- `bot@promote <username>`: Promote a player to party leader.
- `bot@inviteFriend <username>`: Invite a friend.
- `bot@addFriend <username>`: Add a friend.

### ⚙️ Others
- `bot@emote <emote>`: Make the bot perform an emote.
- `bot@stopEmote`: Stop the emote.
- `bot@level <level>`: Set the bot's level.
- `bot@battlepass <purchased> <level>`: Set battle pass status and level.
- `bot@stopTimer`: Stop the party timer.
- `bot@setStatus <newStatus>`: Change the bot's status.
- `bot@logout`: Log out the bot.

## ⭐ Features
✔️ Automatically accepts friend requests.
✔️ Automatically accepts invitations and join requests.
✔️ Leaves the party when members enter a match.
✔️ Dynamic status based on player presence.
✔️ Integrated matchmaking system.
✔️ Advanced customization with custom commands.

## 📜 Disclaimer
> **Fortnite** is a registered trademark of Epic Games, Inc. in the United States and elsewhere.
> **DarkDus** is not affiliated with, sponsored, or endorsed by Epic Games, Inc.

## ❤️ Contributors
- **Mr_Julus** (@MrJulus)

---
💡 *Feel free to contribute by opening an issue or a pull request!*