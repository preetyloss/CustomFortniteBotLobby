# Dark Dus - A Custom Fortnite Bot Lobby

Dark Dus is a custom Fortnite lobby bot designed to help manage your Fortnite Bot Lobby.

This project is open-source and free.

## 📌 Information
- **Chapter 6 - Season 1 and Season 2**
- **Version: 2.8.5**
- **Created by: Mr_Julus**

## 🔧 Installation and Setup
### ⚙️ A useful link
A useful link for the outfit, emote, backpack and pickaxe [to find id](https://fortnite.gg/cosmetics)

### 1️⃣ Requirements
Make sure you have installed [Node.js](https://nodejs.org/) v20.12.0 (minimum) and the following dependencies:
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

### 3️⃣ Create your API Key
In the file .env, you need a API Key for the field DARKDUS_API_KEY (if you use it).    
You can create our, for exemple: MySecretKey

## 🛠️ Customize your bot
### You can fully customize your Fortnite Bot and Discord Bot
You can fully customize it by editing the config.json file

### Configure Discord Webhook
Edit the `.env` file with your webhook URL to receive logs.

### Configure Discord Bot
Edit the `.env` file with your Discord Token.

## 🏷️ Branches
- **[Default] `main`** (version 2.8.5)
- **[Obsolete] `DarkDus-v1`** (version 1.3.6)

## Get the status and if the bot is avaible with a API
### Client's info that you can get
| Info | Description |
|----------|-------------|
| `username` | The username of the bot |
| `id` | The id of the bot |
| `status` | The status of the bot (online or offline) |
| `friends` | The number of friend |
| `party` | Party status (alone => no one with the bot or in_use => the bot is in use) |
| `matchmaking` | Matchmaking status of the bot (available or banned) |
| `timestamp` | Last update date |

### Parameter for the method GET
| Info | Description |
|----------|-------------|
| `username` | The username of the bot |

### Parameter for the method POST and DELETE
| Info | Description |
|----------|-------------|
| `username` | The username of the bot |
| `key` | You custom key |

### Localhost
You can access to all of there info in localhost, if you active it on the config file

### Examples
There are examples of the use of the API, here : [./exampleAPI](https://github.com/DarkDusOfficial/CustomFortniteBotLobby/tree/main/exampleAPI)

### Info
If you have trouble with the API, you can check the status of the API here :    
[https://darkdus.is-a.dev/api/status](https://darkdus.is-a.dev/api/status)

### WARNING!
⚠️ If you kill the terminal, this will not work (the status will not change to offline), you need to do the command bot@logout or /panel and then click on the button logout

## 🚀 New Features
✅ A API that allow to get the status and if the bot is available

✅ Detection of Fortnite matchmaking ban with a special status.

✅ Automatic verification of device info.

## 🛠️ Discord Bot Commands
| Command | Description |
|----------|-------------|
| `/panel` | Manage the Fortnite bot (logout) |
| `/admin add <accountID>` | Add an admin |
| `/admin delete <username>` | Remove an admin |
| `/admin list` | Show the admin list |
| `/banned_player add <username>` | Ban a player |
| `/banned_player remove <username>` | Unban a player |
| `/banned_player list` | List banned players |
| `/help` | Display help |
| `/show_bot` | Show bot information |

## 🎮 Fortnite Commands
### 🎭 Appearance
- `bot@outfit <newSkin>`: Change the bot's skin.
- `bot@pickaxe <newPickaxe>`: Change the bot's pickaxe.
- `bot@backpack <newBackpack>`: Change the bot's backpack.

### 🏠 Party
- `bot@changeGamemode <gamemode>`: Change the game mode.
- `bot@kick <username>`: Kick a player from the party.
- `bot@promote <username>`: Promote a player to party leader.

### 👥 Friends
- `bot@inviteFriend <username>`: Invite a friend.
- `bot@addFriend <username>`: Add a friend.
- `bot@removeFriend <username>`: Remove a friend
- `bot@clearFriends`: Clear the friend list
- `bot@friendList`: Show the friend list

### ⚙️ Others
- `bot@emote <emote>`: Make the bot perform an emote.
- `bot@stopEmote`: Stop the emote.
- `bot@level <level>`: Set the bot's level.
- `bot@crowns <level>`: Set the bot's crowns.
- `bot@showCrown`: Show the crowns (emote).
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