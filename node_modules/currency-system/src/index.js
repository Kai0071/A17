/**
 * @author Silent-Coder
 * @license Apache-2.0
 * @copyright Silent-Coder
 * @file index.js
 */

const {
  findUser,
  getInventory,
  connect,
  event,
  saveUser,
} = require("./functions/global");
/**
 * @class CurrencySystem
 */
class CurrencySystem {
  setMongoURL(password, toLog = true) {
    if (!password.startsWith("mongodb"))
      throw new TypeError("Invalid MongoURL");
    connect(password, toLog);
    process.mongoURL = password;
    event.emit(
      "debug",
      `[ CS => Debug ] : Successfully saved MongoDB URL ( Used in Shop Functions )`
    );
  }

  async buy(settings) {
    return await _buy(settings);
  }

  async addUserItem(settings) {
    return await _buy(settings);
  }

  async addItem(settings) {
    if (!settings.inventory)
      return {
        error: true,
        type: "No-Inventory",
      };
    if (!settings.inventory.name)
      return {
        error: true,
        type: "No-Inventory-Name",
      };
    if (!settings.inventory.price)
      return {
        error: true,
        type: "No-Inventory-Price",
      };
    if (!parseInt(settings.inventory.price))
      return {
        error: true,
        type: "Invalid-Inventory-Price",
      };
    const item = {
      name: String(settings.inventory.name) || "Air",
      price: parseInt(settings.inventory.price) || 0,
      description: String(settings.inventory.description) || "No Description",
      itemId: makeid(),
    };
    if (typeof settings.guild === "string")
      settings.guild = {
        id: settings.guild,
      };
    if (!settings.guild)
      settings.guild = {
        id: null,
      };
    require("./models/inventory").findOneAndUpdate(
      {
        guildID: settings.guild.id || null,
      },
      {
        $push: {
          inventory: item,
        },
      },
      {
        upsert: true,
        useFindAndModify: false,
      },
      (e, d) => {
        if (e) return console.log(e);
      }
    );

    return {
      error: false,
      item: item,
    };
  }
  async removeItem(settings) {
    let inventoryData = await getInventory(settings);

    let thing = parseInt(settings.item);
    if (!thing)
      return {
        error: true,
        type: "Invalid-Item-Number",
      };
    thing = thing - 1;
    if (!inventoryData.inventory[thing])
      return {
        error: true,
        type: "Unknown-Item",
      };
    const deletedDB = inventoryData.inventory[thing];
    inventoryData.inventory.splice(thing, 1);
    inventoryData.save();
    return {
      error: false,
      inventory: deletedDB,
    };
  }
  async setItems(settings) {
    // let inventoryData = await getInventory(settings);

    if (!settings.shop)
      return {
        error: true,
        type: "No-Shop",
      };
    if (!Array.isArray(settings.shop))
      return {
        error: true,
        type: "Invalid-Shop",
      };
    for (const x of settings.shop) {
      if (!x.name)
        return {
          error: true,
          type: "Invalid-Shop-name",
        };
      if (!x.price)
        return {
          error: true,
          type: "Invalid-Shop-price",
        };
      if (!x.description) x.description = "No Description.";
    }
    require("./models/inventory").findOneAndUpdate(
      {
        guildID: settings.guild.id || null,
      },
      {
        $set: {
          inventory: settings.shop,
        },
      },
      {
        upsert: true,
        useFindAndModify: false,
      },
      (e, d) => {
        if (e) return console.log(e);
      }
    );
    return {
      error: false,
      type: "success",
    };
  }
  async removeUserItem(settings) {
    let data = await findUser(settings, null, null, "removeUserItem");
    let item = null;
    let thing = parseInt(settings.item);
    if (!thing)
      return {
        error: true,
        type: "Invalid-Item-Number",
      };
    thing = thing - 1;
    if (!data.inventory[thing])
      return {
        error: true,
        type: "Unknown-Item",
      };
    let done = false;
    // Save change
    let data_user = {};

    let data_error = {
      error: true,
      type: "Invalid-Item-Number",
    };

    // If user want remove all items
    if (settings.amount == "all") {
      // Find index of item
      let i =
        data.inventory.findIndex(
          (i) => i === data.inventory.filter((inv) => inv.name === thing)
        ) + 1;

      let data_to_save = {
        count: 0,
        name: data.inventory[i].name,
        deleted: data.inventory[i].amount,
      };
      data_user = data_to_save;
      item = data.inventory[i];
      data.inventory.splice(i, 1);
      done = true;
    } else {
      for (let i in data.inventory) {
        if (data.inventory[i] === data.inventory[thing]) {
          // If in inventory the number of item is greater to 1 and no amount specified
          if (data.inventory[i].amount > 1 && !settings?.amount) {
            item = data.inventory[i];
            data.inventory[i].amount--;

            let data_to_save = {
              count: data.inventory[i].amount,
              name: data.inventory[i].name,
              deleted: 1,
            };

            data_user = data_to_save;
            done = true;
            // If in inventory the number of item is equal to 1 and no amount specified
          } else if (data.inventory[i].amount === 1 && !settings?.amount) {
            let data_to_save = {
              count: 0,
              name: data.inventory[i].name,
              deleted: 1,
            };

            data_user = data_to_save;
            item = data.inventory[i];
            data.inventory.splice(i, 1);
            done = true;
            // If number specified
          } else if (settings?.amount !== "all") {
            // If number specified is greater to number item in inventory
            if (settings.amount > data.inventory[i].amount) {
              done = false;
              data_error.type = "Invalid-Amount";
            } else if (String(settings.amount).includes("-")) {
              done = false;
              data_error.type = "Negative-Amount";
            } else if (parseInt(settings.amount) === 0) {
              done = false;
              data_error.type = "Invalid-Amount";
            } else {
              item = data.inventory[i];
              data.inventory[i].amount -= settings.amount;

              let data_to_save = {
                count: data.inventory[i].amount,
                name: data.inventory[i].name,
                deleted: settings.amount,
              };

              data_user = data_to_save;
              done = true;
            }
          }
        }
      }
    }
    if (done == false) return data_error;

    require("./models/currency").findOneAndUpdate(
      {
        guildID: settings.guild.id || null,
        userID: settings.user.id || null,
      },
      {
        $set: {
          inventory: data.inventory,
        },
      },
      {
        upsert: true,
        useFindAndModify: false,
      },
      (e, d) => {
        if (e) return console.log(e);
      }
    );

    return {
      error: false,
      inventory: data_user,
      rawData: data,
      item: item
    };
  }
  async transferItem(settings) {
    if (!settings.guild)
      settings.guild = {
        id: null,
      };

    event.emit("debug", `[ CS => Debug ] : transferItem Function is Executed.`);
    event.emit("debug", `[ CS => Debug ] : Fetching User ( Buy Function )`);
    let user1 = await findUser(
      { user: settings.user1, guild: settings.guild },
      null,
      null,
      "transferItem"
    );
    let user2 = await findUser(
      { user: settings.user2, guild: settings.guild },
      null,
      null,
      "transferItem"
    );
    let name, amount_to_transfer, itemsLeft;
    // item
    let thing = parseInt(settings.item);
    if (!thing)
      return {
        error: true,
        type: "No-Item",
      };
    thing = thing - 1;
    // check if item exists
    if (!user1.inventory[thing]) return { error: true, type: "Invalid-Item" };
    // Amount
    amount_to_transfer = settings.amount;
    if (amount_to_transfer === "all" || amount_to_transfer === "max") {
      let user2_has_item = false;
      let ifHasItem_then_index = 0;
      for (let i = 0; i < user1.inventory.length; i++) {
        if (user2.inventory[i].name === user1.inventory[thing].name) {
          user2_has_item = true;
          ifHasItem_then_index = i;
        }
      }
      amount_to_transfer = user1.inventory[thing].amount;
      name = user1.inventory[thing].name;
      itemsLeft = 0;
      if (user2_has_item === false)
        user2.inventory.push(user1.inventory[thing]);
      else
        user2.inventory[ifHasItem_then_index].amount +=
          user1.inventory[thing].amount;

      user1.inventory.splice(thing, 1);
    } else {
      amount_to_transfer = parseInt(amount_to_transfer) || 1;
      if (amount_to_transfer <= 0)
        return { error: true, type: "Invalid-Amount" };
      if (amount_to_transfer > user1.inventory[thing].amount)
        return { error: true, type: "In-Sufficient-Amount" };
      let user2_has_item = false;
      let ifHasItem_then_index = 0;
      for (let i = 0; i < user2.inventory.length; i++) {
        if (user2.inventory[i].name === user1.inventory[thing].name) {
          user2_has_item = true;
          ifHasItem_then_index = i;
        }
      }
      name = user1.inventory[thing].name;
      if (user2_has_item === false)
        user2.inventory.push({
          name: user1.inventory[thing].name,
          amount: amount_to_transfer,
        });
      else user2.inventory[ifHasItem_then_index].amount += amount_to_transfer;
      user1.inventory[thing].amount -= amount_to_transfer;
      itemsLeft = user1.inventory[thing].amount;
    }
    user1.markModified("inventory");
    user2.markModified("inventory");
    await saveUser(user1, user2);
    return {
      error: false,
      type: "success",
      transfered: amount_to_transfer,
      itemName: name,
      itemsLeft: itemsLeft,
    };
  }
}

Object.assign(CurrencySystem.prototype, require("./functions/global"));
module.exports = CurrencySystem;

function _getDbURL() {
  let url = process.mongoURL;
  if (require("mongoose").connections.length)
    url = require("mongoose").connections[0]._connectionString;
  return url;
}
module.exports.cs = event;

async function _buy(settings) {
  event.emit("debug", `[ CS => Debug ] : Buy Function is Executed.`);
  let inventoryData = await getInventory(settings);
  event.emit("debug", `[ CS => Debug ] : Fetching Inventory. ( Buy Function )`);

  event.emit("debug", `[ CS => Debug ] : Fetching User ( Buy Function )`);
  let data = await findUser(settings, null, null, "buy");

  if (!settings.guild)
    settings.guild = {
      id: null,
    };
  let amount_to_add = parseInt(settings.amount) || 1;
  let thing = parseInt(settings.item);
  if (!thing)
    return {
      error: true,
      type: "No-Item",
    };
  thing = thing - 1;
  if (!inventoryData.inventory[thing])
    return {
      error: true,
      type: "Invalid-Item",
    };
  let price = inventoryData.inventory[thing].price;
  if (amount_to_add > 1)
    price = amount_to_add * inventoryData.inventory[thing].price;

  if (data.wallet < price)
    return {
      error: true,
      type: "low-money",
    };
  if (amount_to_add <= 0) return { error: true, type: "Invalid-Amount" };
  data.wallet -= price;
  let done = false;
  let makeItem = true;

  for (let j in data.inventory) {
    if (inventoryData.inventory[thing].name === data.inventory[j].name)
      makeItem = false;
  }

  if (makeItem == false) {
    for (let j in data.inventory) {
      if (inventoryData.inventory[thing].name === data.inventory[j].name) {
        data.inventory[j].amount += amount_to_add || 1;
        done = true;
      }
    }
  }

  if (done == false) {
    data.inventory.push({
      name: inventoryData.inventory[thing].name,
      amount: amount_to_add || 1,
    });
  }
  require("./models/currency").findOneAndUpdate(
    {
      guildID: settings.guild.id || null,
      userID: settings.user.id || null,
    },
    {
      $set: {
        inventory: data.inventory,
        wallet: data.wallet,
      },
    },
    {
      upsert: true,
      useFindAndModify: false,
    },
    (e, d) => {
      if (e) return console.error(e);
    }
  );
  event.emit("debug", `[ CS => Debug ] : Updating Inventory ( Buy Function )`);
  return {
    error: false,
    type: "success",
    inventory: inventoryData.inventory[thing],
    price: price,
    amount: amount_to_add,
  };
}
function makeid(length = 5) {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++)
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  return result;
}