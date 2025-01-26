# Dark Dus - A Custom Fortnite Bot Lobby
Dark Dus is a simple Custom Fortnite Bot Lobby

DarkDus is a Fortnite lobby bot that is designed to help you manage your Fortnite Bot Lobby.

DarkDus is a free and open-source project, and you are welcome to contribute to the project.

Chapiter 6 - Saison 1

> Dark Dus -  version 2.5.4-5

Made by Mr_Julus

> You need to have an authorizationCode
```(https://www.epicgames.com/id/logout?redirectUrl=https%3A//www.epicgames.com/id/login%3FredirectUrl%3Dhttps%253A%252F%252Fwww.epicgames.com%252Fid%252Fapi%252Fredirect%253FclientId%253D3f69e56c7649492c8cc29f1af08a8a12%2526responseType%253Dcode)```
-> then run : node ./client/createDeviceAuth.js

## Branches :
=> [Default] main (version 2.5.4-5) 

=> [Obsolete] DarkDus-v1 (version 1.3.6) 

## Discord Webhook (Send logs with webhook url)
Change .env with your webhook url

## New Features
- Add a verification if all device info is present
- Add stopTimer custom command
- Add discord bot with a lot of features

## Discord Bot Commands
- [✅] `/restart` : Restart the bot
- [✅] `/admin delete <username>` : Remove an admin
- [✅] `/admin add <accountID>` : Add an admin
- [✅] `/admin list` : Show the admin's list
- [✅] `/banned_player add <username>` : Ban an username
- [✅] `/banned_player remove <username>` : Unban an username
- [✅] `/banned_player liste` : List of the banned player
- [✅] `/help` : Help command
- [✅] `/show_bot` : Show the bot's info
- [✅] `/logout` : Log out the bot

## Fortnite Client Commands
### Outfit
- [✅] `bot@outfit <newSkin>` : Change the bot's skin.
- [✅] `bot@pickaxe <newPickaxe>` : Change the bot's pickaxe.
- [✅] `bot@backpack <newBackpack>` : Change the bot's backpack.

### Party/Friends 
- [✅] `bot@changeGamemode <gamemode>` : Change the current game mode.
- [✅] `bot@kick <username>` : Kick a player from the party.
- [✅] `bot@promote <username>` : Promote a player to party leader.
- [✅] `bot@inviteFriend <username>` : Invite a friend to the party.
- [✅] `bot@addFriend <username>` : Add a friend.

### Client
- [✅] `bot@emote <emote>` : Make the bot perform an emote.
- [✅] `bot@stopEmote` : Stop the current emote.
- [✅] `bot@level <level>` : Set the bot's level. (Level max: 2,147,483,647)
- [✅] `bot@battlepass <purchased> <level>` : Set the bot's battle pass status and level.

### Others
- [✅] `bot@stopTimer` : Stop the party timer
- [✅] `bot@setStatus <newStatus>` : Change the bot's status.
- [✅] `bot@logout` : Log out the bot.
- [✅] `bot@help` : Display help information (not available).

## Features
- [✅] Custom commands.
- [✅] When a timer is finished, the bot reload
- [✅] When the timer is finished, the bot leaves the party.
- [✅] Automatically accepts friend requests.
- [✅] Automatically accepts invite requests.
- [✅] Automatically accepts join requests
- [✅] A status that changes if there are players with the bot or not.
- [✅] Matchmaking system
- [✅] Auto Leave the party when party members are in match
- And more...

## Requirements
```text
colors
discord.js
dotenv
fnbr
axios
fs
nconf
```

## NOTE
> Fortnite is a trademarks or registered trademark of Epic Games, Inc. in the United States of America and elsewhere.
> DarkDus is not affiliated with, or sponsored or endorsed by, Epic Games, Inc

## Contributors
Mr_Julus (@MrJulus)