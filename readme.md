
# Raichu - RoleManager

- Simple Reactions handler

## Slash commands

#### All commands


#### Send message with predefined role reaction.
| Prefix | Name             | Args                                                    |
| :-------- |:-----------------|:--------------------------------------------------------|
| `/` | `rolemsg-create` | {channel}, {description} Markdown can be used for desc. |

#### Add roles & reactions
| Prefix | Name     | Args                                      |
| :-------- | :------- |:------------------------------------------|
`/` | `rolemsg-add` | {role}, {emoji} (No need to paste the id) |

#### Will send the embed, and start reacting to defined reactions
| Prefix | Name     |           
| :-------- | :------- |
`/` | `rolemsg-confirm` |   




- Everytime, you execute the rolemsg-confirm command it will reset the previous config.
 - This mean the the message will be deleted instead of edited and once you run the confirm commands it will delete the old one and send a new one.


## Installation


run `npm i` to install all packages.


To run bot, you will need to update the following variables in the config.json file

`bot_token` `clientId` `GuildId`


You can read this [guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) to get your discord token.


You will need the to grab the clientId aswell, Should be under OAuth2 -> General -> Client informations -> Client ID


You will need to enable all Intents, as well should be under Bot -> Privileged Gateway Intents

Also, make sure the PUBLIC BOT value is unchecked.


You can use the following link to invite the bot, just replace the `client_id` by your.

- https://discord.com/oauth2/authorize?client_id=yourclientId&permissions=8&scope=bot%20applications.commands


- Once you have done everything you can run the bot by using `npm start` .

## Note

- If you actually dont see the slash commands in other guild server you could simply update the value `true` to `false` in the `./config/guild.json`





    