# Templates
This will go through all functions with example's
See https://github.com/BIntelligent/currency-system/tree/main/v14-ExampleBot for a Example bot.
# NEW!
+  Added `transferItems()`. 
# Bug reports
Join our [Support Server](https://discord.gg/stERZwjA9m): 
Package Made by: `Be Intelligent#1715`.
# Docs
📚 https://currency-system.js.org ( Outdated ik, please use github repo, its always maintained )
# For Global Economy
To make it global, remove following line from every command 
```js
guild: interaction.guild,
```
and add 
```js
guild: { id : null } 
```