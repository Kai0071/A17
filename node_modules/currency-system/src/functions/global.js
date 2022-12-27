const db = require("mongoose");
const event = new (require("events").EventEmitter)();
module.exports.event = event;
module.exports.parseSeconds = parseSeconds;
let maxWallet;
let workCooldown = 0; // work, info
const {
  removeMoney,
  addMoney,
  addMoneyToAllUsers,
  removeMoneyFromAllUsers,
  withdraw,
  deposite,
  gamble,
  setBankSpace,
  transferMoney,
  setDefaultBankAmount,
  setDefaultWalletAmount,
  setMaxBankAmount,
  findUser,
  makeUser,
  saveUser,
  amount,
} = require("./management");
const {
  monthly,
  daily,
  weekly,
  quaterly,
  beg,
  rob,
  hafly,
  hourly,
  yearly,
} = require("./moneyMaking");
const {
  getUserItems,
  getShopItems,
  globalLeaderboard,
  leaderboard,
  balance,
  getInventory,
  makeInventory,
  updateInventory,
} = require("./informative");
// ===================================================================
function setMaxWalletAmount(amount) {
  if (parseInt(amount)) maxWallet = amount || 0;
}
// ===================================================================
function connect(that, toLog = true) {
  let connected = true;
  db.connect(that, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .catch((e) => {
      connected = false;
      throw new TypeError(`${e}`);
    })
    .then(() => {
      if (connected && toLog) console.info("Connected to DB successfully.");
    });
}
// ===================================================================
async function info(userID, guildID) {
  let data = await findUser(
    {},
    userID,
    guildID,
    arguments.callee
      .toString()
      .substring(15, arguments.callee.toString().indexOf("("))
  );

  let lastHourlyy = true,
    lastHaflyy = true,
    lastDailyy = true,
    lastWeeklyy = true,
    lastMonthlyy = true,
    lastBeggedy = true,
    lastQuaterlyy = true,
    lastWorkk = true,
    lastYearlyy = true;
  if (
    data.lastBegged !== null &&
    (data.begTimeout || 240) - (Date.now() - data.lastBegged) / 1000 > 0
  )
    lastBeggedy = false;
  if (
    data.lastHourly !== null &&
    3600 - (Date.now() - data.lastHourly) / 1000 > 0
  )
    lastHourlyy = false;
  if (
    data.lastDaily !== null &&
    86400 - (Date.now() - data.lastDaily) / 1000 > 0
  )
    lastDailyy = false;
  if (
    data.lastHafly !== null &&
    43200 - (Date.now() - data.lastHafly) / 1000 > 0
  )
    lastHaflyy = false;
  if (
    data.lastQuaterly !== null &&
    12600 - (Date.now() - data.lastQuaterly) / 1000 > 0
  )
    lastQuaterlyy = false;
  if (
    data.lastWeekly !== null &&
    604800 - (Date.now() - data.lastWeekly) / 1000 > 0
  )
    lastWeeklyy = false;
  if (
    data.lastMonthly !== null &&
    2.592e6 - (Date.now() - data.lastMonthly) / 1000 > 0
  )
    lastMonthlyy = false;
  if (
    data.lastWork !== null &&
    workCooldown - (Date.now() - data.lastWork) / 1000 > 0
  )
    lastWorkk = false;
  if (
    data.lastYearly !== null &&
    (31536000000 - (Date.now() - data.lastYearly)) / 1000 > 0
  )
    lastYearlyy = false;
  return {
    error: false,
    rawData: data,
    info: Object.entries({
      Hourly: {
        used: lastHourlyy,
        timeLeft: parseSeconds(
          Math.floor(3600 - (Date.now() - data.lastHourly) / 1000)
        ),
      },
      Hafly: {
        used: lastHaflyy,
        timeLeft: parseSeconds(
          Math.floor(43200 - (Date.now() - data.lastHafly) / 1000)
        ),
      },
      Daily: {
        used: lastDailyy,
        timeLeft: parseSeconds(
          Math.floor(86400 - (Date.now() - data.lastDaily) / 1000)
        ),
      },
      Weekly: {
        used: lastWeeklyy,
        timeLeft: parseSeconds(
          Math.floor(604800 - (Date.now() - data.lastWeekly) / 1000)
        ),
      },
      Monthly: {
        used: lastMonthlyy,
        timeLeft: parseSeconds(
          Math.floor(2.592e6 - (Date.now() - data.lastMonthly) / 1000)
        ),
      },
      Begged: {
        used: lastBeggedy,
        timeLeft: parseSeconds(
          Math.floor(
            (data.begTimeout || 240) - (Date.now() - data.lastBegged) / 1000
          )
        ),
      },
      Quaterly: {
        used: lastQuaterlyy,
        timeLeft: parseSeconds(
          Math.floor(12600 - (Date.now() - data.lastQuaterly) / 1000)
        ),
      },
      Work: {
        used: lastWorkk,
        timeLeft: parseSeconds(
          Math.floor(12600 - (Date.now() - data.lastWork) / 1000)
        ),
      },
      Yearly: {
        used: lastYearlyy,
        timeLeft: parseSeconds(
          Math.floor((31536000000 - (Date.now() - data.lastYearly)) / 1000)
        ),
      },
    }),
  };
}
// ===================================================================
async function work(settings) {
  let data = await findUser(
    settings,
    null,
    null,
    arguments.callee
      .toString()
      .substring(15, arguments.callee.toString().indexOf("("))
  );
  const oldData = data;
  let lastWork = data.lastWork;
  let timeout = settings.cooldown;
  workCooldown = timeout;
  if (lastWork !== null && timeout - (Date.now() - lastWork) / 1000 > 0)
    return {
      error: true,
      type: "time",
      time: parseSeconds(Math.floor(timeout - (Date.now() - lastWork) / 1000)),
    };
  else {
    let amountt = Math.floor(Math.random() * settings.maxAmount || 100) + 1;
    data.lastWork = Date.now();
    data = amount(
      data,
      "add",
      "wallet",
      amountt,
      arguments.callee
        .toString()
        .substring(15, arguments.callee.toString().indexOf("("))
    );
    await saveUser(data);
    event.emit("userUpdate", oldData, data);
    let result = Math.floor(Math.random() * settings.replies.length);
    return {
      error: false,
      type: "success",
      workType: settings.replies[result],
      amount: amountt,
    };
  }
}
// ===================================================================
function parseSeconds(seconds) {
  if (String(seconds).includes("-")) return "0 Seconds";
  let days = parseInt(seconds / 86400);
  seconds = seconds % 86400;
  let hours = parseInt(seconds / 3600);
  seconds = seconds % 3600;
  let minutes = parseInt(seconds / 60);
  seconds = parseInt(seconds % 60);

  if (days) {
    return `${days} days, ${hours} hours, ${minutes} minutes`;
  } else if (hours) {
    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  } else if (minutes) {
    return `${minutes} minutes, ${seconds} seconds`;
  }

  return `${seconds} second(s)`;
}
// Basic Functions
// ===================================================================
function searchForNewUpdate(state = true) {
  if (state) _checkUpdate();
}
// ===================================================================
// colors : https://github.com/shiena/ansicolor/blob/master/README.md
async function _checkUpdate() {
  if (!require("node-fetch")) return;
  const packageData = await require("node-fetch")(
    `https://registry.npmjs.com/currency-system`
  ).then((text) => text.json());
  if (
    require("../../package.json").version !== packageData["dist-tags"].latest
  ) {
    console.log("\n\n");
    console.log(
      "\x1b[32m" + "---------------------------------------------------"
    );
    console.log(
      "\x1b[32m" + "| @ currency-system                        - [] X |"
    );
    console.log(
      "\x1b[32m" + "---------------------------------------------------"
    );
    console.log(
      "\x1b[33m" +
        `|            The module is\x1b[31m out of date!\x1b[33m           |`
    );
    console.log(
      "\x1b[35m" + "|             New version is available!           |"
    );
    console.log(
      "\x1b[34m" +
        `|                ${require("../../package.json").version} --> ${
          packageData["dist-tags"].latest
        }                  |`
    );
    console.log(
      "\x1b[36m" + '|        Run "npm i currency-system@latest"       |'
    );
    console.log(
      "\x1b[36m" + "|                    to update!                   |"
    );
    console.log(
      "\x1b[37m" + `|          View the full changelog here:          |`
    );
    console.log(
      "\x1b[31m" + "|         https://currency-system.js.org          |"
    );
    console.log(
      "\x1b[32m" + "---------------------------------------------------\x1b[37m"
    );
    console.log("\n\n");
  }
}
// ===================================================================
module.exports = {
  setDefaultWalletAmount,
  setDefaultBankAmount,
  connect,
  gamble,
  withdraw,
  deposite,
  balance,
  leaderboard,
  globalLeaderboard,
  work,
  monthly,
  yearly,
  weekly,
  quaterly,
  hafly,
  daily,
  hourly,
  rob,
  beg,
  addMoney,
  removeMoney,
  transferMoney,
  getUserItems,
  getShopItems,
  findUser,
  makeUser,
  saveUser,
  getInventory,
  makeInventory,
  updateInventory,
  info,
  setMaxBankAmount,
  setMaxWalletAmount,
  setBankSpace,
  searchForNewUpdate,
  addMoneyToAllUsers,
  removeMoneyFromAllUsers,
  event,
  parseSeconds,
};
