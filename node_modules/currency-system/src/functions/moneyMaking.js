const { event, parseSeconds } = require("./global");
const cs = require("../models/currency");
const { findUser, makeUser, saveUser, amount } = require("./management");

// ===================================================================
async function monthly(settings) {
  let data = await findUser(
    settings,
    null,
    null,
    arguments.callee
      .toString()
      .substring(15, arguments.callee.toString().indexOf("("))
  );
  const oldData = data;
  let monthly = data.lastMonthly;
  let timeout = 2.592e6;
  if (monthly !== null && timeout - (Date.now() - monthly) / 1000 > 0)
    return {
      error: true,
      type: "time",
      time: parseSeconds(Math.floor(timeout - (Date.now() - monthly) / 1000)),
    };
  else {
    data.lastMonthly = Date.now();
    data = amount(
      data,
      "add",
      "wallet",
      settings.amount,
      arguments.callee
        .toString()
        .substring(15, arguments.callee.toString().indexOf("("))
    );
    if ((Date.now() - monthly) / 1000 > timeout * 2) data.streak.monthly = 0;
    data.streak.monthly += 1;
    await saveUser(data);
    event.emit("userUpdate", oldData, data);
    return {
      error: false,
      type: "success",
      amount: settings.amount,
      rawData: data,
    };
  }
}
// ===================================================================
async function yearly(settings) {
  let data = await findUser(
    settings,
    null,
    null,
    arguments.callee
      .toString()
      .substring(15, arguments.callee.toString().indexOf("("))
  );
  const oldData = data;
  let yearly = data.lastYearly;
  let timeout = 31536000000;
  if (yearly !== null && (timeout - (Date.now() - yearly)) / 1000 >= 0)
    return {
      error: true,
      type: "time",
      time: parseSeconds(Math.floor((timeout - (Date.now() - yearly)) / 1000)),
    };
  else {
    data.lastYearly = Date.now();
    data = amount(
      data,
      "add",
      "wallet",
      settings.amount,
      arguments.callee
        .toString()
        .substring(15, arguments.callee.toString().indexOf("("))
    );
    if ((Date.now() - yearly) / 1000 > timeout * 2) data.streak.yearly = 0;
    data.streak.yearly += 1;
    await saveUser(data);
    event.emit("userUpdate", oldData, data);
    return {
      error: false,
      type: "success",
      amount: settings.amount,
      rawData: data,
    };
  }
}
// ===================================================================
async function weekly(settings) {
  let data = await findUser(
    settings,
    null,
    null,
    arguments.callee
      .toString()
      .substring(15, arguments.callee.toString().indexOf("("))
  );
  const oldData = data;
  let weekly = data.lastWeekly;
  let timeout = 604800;
  if (weekly !== null && timeout - (Date.now() - weekly) / 1000 > 0)
    return {
      error: true,
      type: "time",
      time: parseSeconds(Math.floor(timeout - (Date.now() - weekly) / 1000)),
    };
  else {
    data.lastWeekly = Date.now();
    data = amount(
      data,
      "add",
      "wallet",
      settings.amount,
      arguments.callee
        .toString()
        .substring(15, arguments.callee.toString().indexOf("("))
    );
    if ((Date.now() - data.lastWeekly) / 1000 > timeout * 2)
      data.streak.weekly = 0;
    data.streak.weekly += 1;
    await saveUser(data);
    event.emit("userUpdate", oldData, data);
    return {
      error: false,
      type: "success",
      amount: settings.amount,
      rawData: data,
    };
  }
}
// ===================================================================
async function quaterly(settings) {
  let data = await findUser(
    settings,
    null,
    null,
    arguments.callee
      .toString()
      .substring(15, arguments.callee.toString().indexOf("("))
  );
  const oldData = data;
  let quaterly = data.lastQuaterly;
  let timeout = 21600;
  if (quaterly !== null && timeout - (Date.now() - quaterly) / 1000 > 0)
    return {
      error: true,
      type: "time",
      time: parseSeconds(Math.floor(timeout - (Date.now() - quaterly) / 1000)),
    };
  else {
    data.lastQuaterly = Date.now();
    data = amount(
      data,
      "add",
      "wallet",
      settings.amount,
      arguments.callee
        .toString()
        .substring(15, arguments.callee.toString().indexOf("("))
    );
    if ((Date.now() - quaterly) / 1000 > timeout * 2) data.streak.quaterly = 0;
    data.streak.quaterly += 1;
    await saveUser(data);
    event.emit("userUpdate", oldData, data);
    return {
      error: false,
      type: "success",
      amount: settings.amount,
      rawData: data,
    };
  }
}
// ===================================================================
async function hafly(settings) {
  let data = await findUser(
    settings,
    null,
    null,
    arguments.callee
      .toString()
      .substring(15, arguments.callee.toString().indexOf("("))
  );
  const oldData = data;
  let hafly = data.lastHafly;
  let timeout = 43200;
  if (hafly !== null && timeout - (Date.now() - hafly) / 1000 > 0)
    return {
      error: true,
      type: "time",
      time: parseSeconds(Math.floor(timeout - (Date.now() - hafly) / 1000)),
    };
  else {
    data.lastHafly = Date.now();
    data = amount(
      data,
      "add",
      "wallet",
      settings.amount,
      arguments.callee
        .toString()
        .substring(15, arguments.callee.toString().indexOf("("))
    );
    if ((Date.now() - data.lastHafly) / 1000 > timeout * 2)
      data.streak.hafly = 0;
    data.streak.hafly += 1;
    await saveUser(data);
    event.emit("userUpdate", oldData, data);
    return {
      error: false,
      type: "success",
      amount: settings.amount,
      rawData: data,
    };
  }
}
// ===================================================================
async function daily(settings) {
  let data = await findUser(
    settings,
    null,
    null,
    arguments.callee
      .toString()
      .substring(15, arguments.callee.toString().indexOf("("))
  );
  const oldData = data;
  let daily = data.lastDaily;
  let timeout = 86400;
  if (daily !== null && timeout - (Date.now() - daily) / 1000 > 0)
    return {
      error: true,
      type: "time",
      time: parseSeconds(Math.floor(timeout - (Date.now() - daily) / 1000)),
    };
  else {
    data.lastDaily = Date.now();
    data = amount(
      data,
      "add",
      "wallet",
      settings.amount,
      arguments.callee
        .toString()
        .substring(15, arguments.callee.toString().indexOf("("))
    );
    if ((Date.now() - daily) / 1000 > timeout * 2) data.streak.daily = 0;
    data.streak.daily += 1;
    await saveUser(data);
    event.emit("userUpdate", oldData, data);
    return {
      error: false,
      type: "success",
      amount: settings.amount,
      rawData: data,
    };
  }
}
// ===================================================================
async function hourly(settings) {
  let data = await findUser(
    settings,
    null,
    null,
    arguments.callee
      .toString()
      .substring(15, arguments.callee.toString().indexOf("("))
  );
  const oldData = data;
  let lastHourly = data.lastHourly;
  let timeout = 3600;

  if (lastHourly !== null && timeout - (Date.now() - lastHourly) / 1000 > 0)
    return {
      error: true,
      type: "time",
      time: parseSeconds(
        Math.floor(timeout - (Date.now() - lastHourly) / 1000)
      ),
    };
  else {
    data.lastHourly = Date.now();
    data = amount(
      data,
      "add",
      "wallet",
      settings.amount,
      arguments.callee
        .toString()
        .substring(15, arguments.callee.toString().indexOf("("))
    );
    if ((Date.now() - lastHourly) / 1000 > timeout * 2) data.streak.hourly = 0;
    data.streak.hourly += 1;
    await saveUser(data);
    event.emit("userUpdate", oldData, data);
    return {
      error: false,
      type: "success",
      amount: settings.amount,
      rawData: data,
    };
  }
}
// ===================================================================
async function rob(settings) {
  if (typeof settings.guild === "string") settings.guild.id = settings.guild;
  if (typeof settings.user === "string") settings.user.id = settings.user;
  if (!settings.guild)
    settings.guild = {
      id: null,
    };
  let user1 = await findUser(
    settings,
    null,
    null,
    arguments.callee
      .toString()
      .substring(15, arguments.callee.toString().indexOf("("))
  );
  const oldData = user1;
  let user2 = await cs.findOne({
    userID: settings.user2.id,
    guildID: settings.guild.id || null,
  });
  if (!user2) user2 = await makeUser(settings, true);
  const oldData2 = user2;
  let lastRob = user1.lastRob;
  let timeout = settings.cooldown;

  if (lastRob !== null && timeout - (Date.now() - lastRob) / 1000 > 0)
    return {
      error: true,
      type: "time",
      time: parseSeconds(Math.floor(timeout - (Date.now() - lastRob) / 1000)),
    };

  if (user1.wallet < settings.minAmount - 2)
    return {
      error: true,
      type: "low-money",
      minAmount: settings.minAmount,
    };
  if (user2.wallet < settings.minAmount - 2)
    return {
      error: true,
      type: "low-wallet",
      user2: settings.user2,
      minAmount: settings.minAmount,
    };
  let max = settings.maxRob;
  if (!max || max < 1000) max = 1000;
  let random = Math.floor(Math.random() * (Math.floor(max || 1000) - 99)) + 99;
  if (random > user2.wallet) random = user2.wallet;
  user1.lastRob = Date.now();
  // 5 here is percentage of success.
  if (testChance(settings.successPercentage || 5)) {
    // Success!
    user2 = amount(
      user2,
      "remove",
      "wallet",
      random,
      arguments.callee
        .toString()
        .substring(15, arguments.callee.toString().indexOf("("))
    );
    user1 = amount(
      user1,
      "add",
      "wallet",
      random,
      arguments.callee
        .toString()
        .substring(15, arguments.callee.toString().indexOf("("))
    );

    await saveUser(user1, user2);
    event.emit("userUpdate", oldData, user1, oldData2, user2);
    return {
      error: false,
      type: "success",
      user2: settings.user2,
      minAmount: settings.minAmount,
      amount: random,
    };
  } else {
    // Fail :(
    if (random > user1.wallet) random = user1.wallet;
    user2 = amount(
      user2,
      "add",
      "wallet",
      random,
      arguments.callee
        .toString()
        .substring(15, arguments.callee.toString().indexOf("("))
    );
    user1 = amount(
      user1,
      "remove",
      "wallet",
      random,
      arguments.callee
        .toString()
        .substring(15, arguments.callee.toString().indexOf("("))
    );
    await saveUser(user1, user2);
    event.emit("userUpdate", oldData, user1, oldData2, user2);
    return {
      error: true,
      type: "caught",
      user2: settings.user2,
      minAmount: settings.minAmount,
      amount: random,
    };
  }
}
// ===================================================================
async function beg(settings) {
  let data = await findUser(
    settings,
    null,
    null,
    arguments.callee
      .toString()
      .substring(15, arguments.callee.toString().indexOf("("))
  );
  const oldData = data;
  let beg = data.lastBegged; // XDDDD
  let timeout = 240;
  if (parseInt(settings.cooldown)) timeout = parseInt(settings.cooldown);
  if (beg !== null && timeout - (Date.now() - beg) / 1000 > 0)
    return {
      error: true,
      type: "time",
      time: parseSeconds(Math.floor(timeout - (Date.now() - beg) / 1000)),
    };
  else {
    const amountt = Math.round(
      (settings.minAmount || 200) + Math.random() * (settings.maxAmount || 400)
    );
    data.lastBegged = Date.now();
    data.begTimeout = timeout;
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

    return {
      error: false,
      type: "success",
      amount: amountt,
    };
  }
}
// ===================================================================
// ===================================================================
// This is for Rob Command
function testChance(successPercentage) {
  let random = Math.random() * 10;
  return (random -= successPercentage) < 0;
}

module.exports = {
  monthly,
  daily,
  weekly,
  quaterly,
  beg,
  rob,
  hafly,
  hourly,
  yearly,
};
