# Dark Dus - A Custom Fortnite Bot Lobby
Dark Dus is a simple Custom Fortnite Bot Lobby
> Chapiter 6 - Saison 1

> Dark Dus -  version 2.4.5
Made by Mr_Julus

> You need to have an authorizationCode
```(https://www.epicgames.com/id/logout?redirectUrl=https%3A//www.epicgames.com/id/login%3FredirectUrl%3Dhttps%253A%252F%252Fwww.epicgames.com%252Fid%252Fapi%252Fredirect%253FclientId%253D3f69e56c7649492c8cc29f1af08a8a12%2526responseType%253Dcode)```
-> then run : node ./client/createDeviceAuth.js

## Discord Webhook (Send logs with webhook url)
Change .env with your webhook url

## New Features
- Add a DarkDus's version checker
- Add discord bot with a lot of features
- Add a features to ban user from use the bot
- Upgrade the system of custom commands
- Admin commands
- Custom matchmaking to get a party with only bots.

## Discord Bot Commands
- [✅] `/restart` : Restart the bot
- [✅] `/admin delete <username>` : Remove an admin
- [✅] `/admin add <accountID>` : Add an admin
- [✅] `/admin list` : Show the admin's list
- [✅] `/banned_player add <username>` : Ban an username
- [✅] `/banned_player remove <username>` : Unban an username
- [✅] `/banned_player liste` : List of the banned player
- [✅] `/help` : Help command
- [✅] `/show_bots` : Show the bot's info
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
- [✅] `bot@level <level>` : Set the bot's level.
- [✅] `bot@battlepass <purchased> <level>` : Set the bot's battle pass status and level.

### Others
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
Mr_Julus (@mr-julus)