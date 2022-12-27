const event = require("./global").event;
const inv = require("../models/inventory");
const cs = require("../models/currency");
const { findUser } = require("./management");
async function balance(settings) {
  let data = await findUser(
    settings,
    null,
    null,
    arguments.callee
      .toString()
      .substring(15, arguments.callee.toString().indexOf("("))
  );
  if (!data.networth) data.networth = 0;
  data.networth = data.wallet + data.bank;
  return {
    rawData: data,
    bank: data.bank,
    wallet: data.wallet,
    networth: data.networth,
  };
}
// ===================================================================
async function leaderboard(guildid) {
  let data = await cs.find({
    guildID: guildid || null,
  });
  data.sort((a, b) => {
    return b.networth - a.networth;
  });
  return data;
}
// ===================================================================
async function globalLeaderboard() {
  let array = await cs.find();
  var output = [];
  array.forEach(function (item) {
    var existing = output.filter(function (v, i) {
      return v.userID == item.userID;
    });
    if (existing.length) {
      var existingIndex = output.indexOf(existing[0]);
      output[existingIndex].bank = output[existingIndex].bank + item.bank;
      output[existingIndex].wallet = output[existingIndex].wallet + item.wallet;
      output[existingIndex].networth =
        output[existingIndex].wallet + output[existingIndex].bank;
    } else {
      output.push(item);
    }
  });
  output.sort((a, b) => {
    return b.networth - a.networth;
  });
  return output;
}
// ===================================================================
async function getUserItems(settings) {
  let data = await findUser(
    settings,
    null,
    null,
    arguments.callee
      .toString()
      .substring(15, arguments.callee.toString().indexOf("("))
  );
  return {
    error: false,
    inventory: data.inventory,
    rawData: data,
  };
}
// ===================================================================
async function getShopItems(settings) {
  let data = await getInventory(settings);
  return {
    error: false,
    inventory: data.inventory,
    rawData: data,
  };
}
// ===================================================================
async function getInventory(settings) {
  if (typeof settings.user === "string")
    settings.user = {
      id: settings.user,
    };
  if (typeof settings.guild === "string")
    settings.guild = {
      id: settings.guild,
    };
  if (!settings.guild)
    settings.guild = {
      id: null,
    };
  let find = await inv.findOne({
    guildID: settings.guild.id || null,
  });
  if (!find) find = await makeInventory(settings);
  if (find.inventory.length > 0)
    find.inventory.forEach((a) => {
      if (!a.description) a.description = "No Description.";
    });
  event.emit("guildInventoryFetch", find);
  return find;
}
// ===================================================================
async function makeInventory(settings) {
  if (typeof settings.user === "string")
    settings.user = {
      id: settings.user,
    };
  if (typeof settings.guild === "string")
    settings.guild = {
      id: settings.guild,
    };
  if (!settings.guild)
    settings.guild = {
      id: null,
    };
  const inventory = new inv({
    guildID: settings.guild.id || null,
    inventory: [],
  });
  // await saveUser(inventory);
  event.emit("guildInventoryCreate", inventory);
  return inventory;
}
// ===================================================================
async function updateInventory(
  mongoURL,
  newData,
  settings,
  collection = "inventory-currencies"
) {
  event.emit(
    "debug",
    `[ CS => Debug ] : UpdateInventory function is executed.`
  );
  if (typeof settings.user === "string")
    settings.user = {
      id: settings.user,
    };
  if (typeof settings.guild === "string")
    settings.guild = {
      id: settings.guild,
    };
  if (!settings.guild)
    settings.guild = {
      id: null,
    };
  let query = {
    guildID: settings.guild.id || null,
  };
  if (settings.user)
    query = {
      userID: settings.user.id,
      guildID: settings.guild.id || null,
    };
  new (require("mongodb").MongoClient)(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).connect(function (err, db) {
    if (err)
      return event.emit(
        "debug",
        `[ CS => Error ] : Unable To Connect to MongoDB ( updateInventory Function )`,
        err
      );

    event.emit(
      "debug",
      `[ CS => Debug ] : Connected to MongoDB ( updateInventory Function )`
    );
    db.db(mongoURL.split("/")[mongoURL.split("/").length - 1])
      .collection(collection)
      .updateOne(
        query,
        {
          $set: {
            inventory: newData,
          },
        },
        {
          upsert: true,
        },
        function (err, res) {
          if (err)
            return event.emit(
              "debug",
              `[ CS => Error ] : Unable To Save Data to MongoDB ( updateInventory Function )`,
              err
            );
          if (res.result.n)
            event.emit(
              "debug",
              `[ CS => Debug ] : Successfully Saved Data ( updateInventory Function )`
            );
          else
            event.emit(
              "debug",
              `[ CS => Error ] : MongoDB Didn't Update the DB. ( updateInventory Function )`
            );
          db.close();
          event.emit(
            "debug",
            `[ CS => Debug ] : Closing DB  ( updateInventory Function )`
          );
        }
      );
  });
}
// ===================================================================
module.exports = {
  getUserItems,
  getShopItems,
  globalLeaderboard,
  leaderboard,
  balance,
  getInventory,
  makeInventory,
  updateInventory,
};
