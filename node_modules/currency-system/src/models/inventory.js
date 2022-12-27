const {
    Schema,
    model
  } = require("mongoose");
  
    module.exports = model('Inventory-currency', new Schema({
      guildID: { type: String, default: null },
      inventory: { type: Array },
      lastUpdated: { type: Date, default: new Date() },
    }));