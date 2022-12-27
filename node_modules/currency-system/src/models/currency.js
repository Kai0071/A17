const {
  Schema,
  model
} = require("mongoose");
const def = {
  type: Number,
  default: 0
};
const def2 = {
  type: Number,
  default: 1
};
module.exports = model('currency', new Schema({
  userID: String,
  guildID: String,
  inventory: Array,
  wallet: def,
  bank: def,
  networth: def,
  lastUpdated: {
    type: Date,
    default: new Date()
  },
  lastGamble: def,
  lastHourly: def,
  lastQuaterly: def,
  lastHafly: def,
  lastRob: def,
  lastDaily: def,
  lastWeekly: def,
  lastMonthly: def,
  lastYearly: def,
  lastBegged: def,
  lastWork: def,
  bankSpace: def,
  begTimeout: {
    type: Number,
    default: 240
  },
  streak: {
    hourly: def2,
    daily: def2,
    weekly: def2,
    monthly: def2,
    yearly: def2,
    hafly: def2,
    quaterly: def2,
  }
}));