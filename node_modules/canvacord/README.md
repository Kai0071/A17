[![SWUbanner](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner2-direct.svg)](https://vshymanskyy.github.io/StandWithUkraine)

# Canvacord
Powerful image manipulation tool to manipulate images easily.

# Installation

```sh
$ npm i canvacord
```

[![NPM](https://nodei.co/npm/canvacord.png)](https://nodei.co/npm/canvacord/)

# Features
- Super simple and easy to use 😎
- Faster than canvacord v4 🚀
- More than **50 methods**...? Yay! 🎉
- Built on top of **[@napi-rs/canvas](https://npm.im/@napi-rs/canvas)** 🔥
- Object oriented 💻
- Beginner friendly 🤓
- Supports emojis 😀

# Documentation
**[https://canvacord.js.org](https://canvacord.js.org)**

# Join our Discord server
**[https://discord.gg/CR8JxrxSwr](https://discord.gg/CR8JxrxSwr)**

# Examples
## Rank Card

```js
const canvacord = require("canvacord");
const img = "https://cdn.discordapp.com/embed/avatars/0.png";

const userData = getDataSomehow();

const rank = new canvacord.Rank()
    .setAvatar(img)
    .setCurrentXP(userData.xp)
    .setRequiredXP(userData.requiredXP)
    .setStatus("dnd")
    .setProgressBar("#FFFFFF", "COLOR")
    .setUsername("Snowflake")
    .setDiscriminator("0007");

rank.build()
    .then(data => {
        const attachment = new Discord.MessageAttachment(data, "RankCard.png");
        message.channel.send(attachment);
    });
```

### Preview
![RankCard](https://raw.githubusercontent.com/DevAndromeda/canvacord/v5/test/images/RankCard.png)

## Other Examples

```js
const Discord = require("discord.js");
const client = new Discord.Client();
const canvacord = require("canvacord");

client.on("ready", () => {
    console.log("I'm online!");
});

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content === "!triggered") {
        let avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png' });
        let image = await canvacord.Canvas.trigger(avatar);
        let attachment = new Discord.MessageAttachment(image, "triggered.gif");
        return message.channel.send(attachment);
    }
});

client.login("Your_Bot_Token_here");
```

# Support me
[![](https://www.paypalobjects.com/webstatic/icon/pp258.png)](https://paypal.me/devsnowflake)

# Note
> ⚠ | In order to use `Canvacord#Welcomer`/`Canvacord#Leaver`/`Canvacord#CaptchaGen`, you may need to install packages like **[discord-canvas](https://npmjs.com/package/discord-canvas)** & **[captcha-canvas](https://npmjs.com/package/captcha-canvas)**.
