# Dark Dus - A Custom Fortnite Bot Lobby

Dark Dus is a custom Fortnite lobby bot designed to help manage your Fortnite Bot Lobby.

This project is open-source and free.

## 📌 Information
- **Chapter 6 - Season 1**
- **Version: 2.6.2**
- **Created by: Mr_Julus**

## 🔧 Installation and Setup
### 1️⃣ Requirements
Make sure you have installed [Node.js](https://nodejs.org/) and the following dependencies:
```sh
npm install colors discord.js dotenv fnbr axios fs nconf readline
```

### 2️⃣ Authentication
Rename the file env.example to .env
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

## 🛠️ Customize your bot
### You can fully customize your Fortnite Bot and Discord Bot
You can fully customize it by editing the config.json file

### Configure Discord Webhook
Edit the `.env` file with your webhook URL to receive logs.

### Configure Discord Bot
Edit the `.env` file with your Discord Token.

## 🏷️ Branches
- **[Default] `main`** (version 2.6.2)
- **[Obsolete] `DarkDus-v1`** (version 1.3.6)

## Get the status and if the bot is avaible with a API
### Client's info that you can get
| Info | Description |
|----------|-------------|
| `username` | The username of the bot |
| `status` | The status of the bot (online or offline) |
| `friends` | The number of friend |
| `party` | Party status (alone => no one with the bot or in_use => the bot is in use) |
| `matchmaking` | Matchmaking status of the bot (available or banned) |
| `timestamp` | Last update date |

### Localhost
You can access to all of there info in localhost, if you active it on the config file

### Example
```js
async function getUserStatus(username) {
    try {
        const response = await fetch(`https://darkdus-client-status.vercel.app/api/status?username=${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Data retrieved:', data);
        } else {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

getUserStatus('testUsername');
```
⚠️ If you kill the terminal, this will not work (the status will not change to offline), you need to do the command bot@logout

## 🚀 New Features
✅ A API that allow to get the status and if the bot is available

✅ Detection of Fortnite matchmaking ban with a special status.

✅ Automatic verification of device info.

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