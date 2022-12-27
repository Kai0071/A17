## Installation
```bash
npm i discord-mongoose-economy
```
## Connect to MongoDB
```javascript
const eco = require('discord-mongoose-economy');

eco.connect('mongodb://localhost/database'); //MongoDB Connection String(You also need to specify database)
```

## Balance Command
```javascript
const eco = require('discord-mongoose-economy');

if(msg === "balance"){
const balance = await eco.balance(message.author.id, message.guild.id); //Returns wallet, bank, and bankCapacity. Also creates a USer if it doesn't exist.
message.channel.send(`Wallet: ${balance.wallet}\nBank: ${balance.bank}/${balance.bankCapacity}`);
}
```
## Give User Random Balance/Message
```javascript
const eco = require('discord-mongoose-economy');
const min = 10; //Minimum of 10
const max = 100; //Maximum of 100
const random = Math.floor(Math.random() * (max - min + 1) ) + min; //Number Generator, no need to touch as we already have min, max constant above.

client.on('message', async(message) => { //Make sure Event Listener is Asynchrononous
if(message.author.bot) return;
await eco.give(message.author.id, message.guild.id, random); // Make Sure this Code is under Message Event Listener
})
```
## Give Balance To User
```javascript
//When you're using this Library, I assume you already know how to handle Arguments.
const eco = require('discord-mongoose-economy');

if(msg === "give"){ //give @shuncey 1000
    if(!message.mentions.users.first()) return message.reply(`please mention a user.`);
    if(!args[2]) return message.reply('please specify an amount.');
    const give = await eco.give(message.mentions.users.first().id, message.guild.id, args[2]); //Creates a new entry in the DB if User doesn't Exist.
    message.reply(`I gave ${message.mentions.users.first()} ${give.amount}`);
}
```
## Deduct User Balance
```javascript
const eco = require('discord-mongoose-economy');

if(msg === "deduct"){ //deduct @shuncey 1000
    if(!message.mentions.users.first()) return message.reply(`please mention a user.`);
    if(!args[2]) return message.reply('please specify an amount.');
    const deduct = await eco.deduct(message.mentions.users.first().id, message.guild.id, args[2]); //Creates a new entry in the DB if User doesn't Exist.
    message.reply(`I deducted ${deduct.amount} from ${message.mentions.users.first()} wallet.`);
}
```
## Give User More Bank Capacity
```javascript
const eco = require('discord-mongoose-economy');

if(msg === "givebankcap"){
    if(!message.mentions.users.first()) return message.reply(`please mention a user.`);
    if(!args[2]) return message.reply('please specify an amount to add to bank space.');
    const add = eco.giveCapacity(message.mentions.users.first().id, message.guild.id, args[2]); //If the user doesn't exist in the Database, it makes one. Bank Capacity Will Be 2500(Default)+Amount you specified.
}
```
## Create User
```javascript
const eco = require('discord-mongoose-economy');

if(msg === "create"){
    if(!message.mentions.users.first()) return message.reply(`Please mention a user.`);
    const create = await eco.create(message.mentions.users.first().id, message.guild.id);
    if(create.exists) return message.reply('Use already exists'); //exists[boolean] whether the user exists in the database. if it does, return.
    message.reply(`Added ${message.mentions.users.first()} to the database`);
}
```
## Delete User
```javascript
const eco = require('discord-mongoose-economy');

if(msg === "delete"){
    if(!message.mentions.users.first()) return message.reply(`Please mention a user.`);
    const delete = await eco.create(message.mentions.users.first().id, message.guild.id);
    if(!delete.exists) return message.reply('User doesn\'t exist'); //exists[boolean] whether the user exist in the database or not. in this case we are checking if user exists(exists === true), if it does exists.
    message.reply(`Removed ${message.mentions.users.first()} to the database`);
}
```
## Create Leaderboard
```javascript
const eco = require('discord-mongoose-economy');

if(msg === "leaderboard"){
        const lb = await eco.lb(message.guild.id, 10); //(guildID, limit)
        if(lb < 1) return message.reply('less than 1'); //If leaderboard is empty, reply to user that it is.
        var index = 0;
        const mapped = lb.map(i => `**${index+=1}. ${client.users.cache.get(i.userID).tag} - ${i.wallet}**`);
        const lbembed = new discord.MessageEmbed()
        .setTitle(`${message.guild.name}\'s Leaderboard`)
        .setDescription(`${mapped.join('\n')}`)
        .setColor("RANDOM");
        message.channel.send(lbembed);
    }
```
## Daily Command
```javascript 
const eco = const eco = require('discord-mongoose-economy');

if(msg === "daily"){
    const daily  = await eco.daily(message.author.id, message.guild.id, 500); //give 500 for daily, can be changed
    if(daily.cd) return message.reply(`Daily on cooldown come back in ${daily.cdL}`); //cdL is already formatted cooldown Left
    message.reply(`you claimed ${daily.amount} for daily`);
}
```
## Deposit and Withdraw
```javascript
const eco = require('discord-mongoose-economy');

if(msg === "deposit"){
    if(args[1] !== "all" && isNaN(args[1])) return message.reply('not valid'); //deposit only accepts integers or string "all" which deposits all from the users wallet.
    const deposit = await eco.deposit(message.author.id, message.guild.id, args[1]);
    if(deposit.noten) return message.reply('You can\'t deposit what you don\'t have.'); //if user states more than whats in his wallet
    message.reply(`Deposited ${deposit.amount} to your bank.`)
}
if(msg === "withdraw"){
    if(args[1] !== "all" && isNaN(args[1])) return message.reply('not valid'); //withdraw only accepts integers or string "all" which deposits all from the users wallet.
    const withdraw = await eco.withdraw(message.author.id, message.guild.id, args[1]);
    if(withdraw.noten) return message.reply('You can\'t withdraw what you don\'t have.');  //if user tries withdraw more than whats in their wallet
    message.reply(`${withdraw.amount}`);
}
```