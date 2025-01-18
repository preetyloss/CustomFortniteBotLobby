# Dark Dus - A Custom Fortnite Bot
> Dark Dus -  version 1.3.5
Made by Mr_Julus

> You need to have an authorizationCode
```(https://www.epicgames.com/id/logout?redirectUrl=https%3A//www.epicgames.com/id/login%3FredirectUrl%3Dhttps%253A%252F%252Fwww.epicgames.com%252Fid%252Fapi%252Fredirect%253FclientId%253D3f69e56c7649492c8cc29f1af08a8a12%2526responseType%253Dcode)```
-> then run : node ./client/createDeviceAuth.js

## Discord Webhook (Send logs with webhook url)
Change .env with your webhook url

## Discord Bot Commands
- `/help` : Display help information
- `/login <authorizationCode>` : Login the client
- `/logout` : Logout the client
- `/start` : Start the client
> Invite the Discord Bot
``` NOT AVAIBLE FOR THE MOMENT...```

## Fortnite Client Commands
### Outfit
- `bot@outfit <newSkin>` : Change the bot's skin.
- `bot@pickaxe <newPickaxe>` : Change the bot's pickaxe.
- `bot@backpack <newBackpack>` : Change the bot's backpack.

### Party/Friends
- `bot@changeGamemode <gamemode>` : Change the current game mode.
- `bot@kick <username>` : Kick a player from the party.
- `bot@promote <username>` : Promote a player to party leader.
- `bot@ready` : Set the bot's status to ready.
- `bot@inviteFriend <username>` : Invite a friend to the party.
- `bot@addFriend <username>` : Add a friend.

### Client
- `bot@emote <emote>` : Make the bot perform an emote.
- `bot@stopEmote` : Stop the current emote.
- `bot@level <level>` : Set the bot's level.
- `bot@battlepass <purchased> <level>` : Set the bot's battle pass status and level.

### Others
- `bot@changeStatus <newStatus>` : Change the bot's status.
- `bot@logout` : Log out the bot.
- `bot@version` : Display the bot's version.
- `bot@help` : Display help information (not available).

## Features
- Automatically accepts friend requests.
- A status that changes if there are players with the bot or not.
- When the timer is finished, the bot leaves the party.
- Automatically accepts join requests.
- Automatically accepts invite requests.
- You can set a default outfit (pickaxe, backpack, and skin).
- You can set a default level.
- Custom commands.

## New Features
- A Discord bot that allows running and stopping the client on Discord.
- Reload time: after an amount of time, the client restarts.
- Add a custom prefix for the Fortnite commands.

## Features that come soon (I hope)
- Custom matchmaking to get a party with only bots.

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

## Contributors
Mr_Julus (@mr-julus)