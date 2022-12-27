const { event, parseSeconds } = require("./global");
const cs = require("../models/currency");
let wallet; //  makeUser, setDefaultWalletAmount
let bank; // makeUser, setDefaultBankAmount
let maxBank; // setMaxBankAmount, amount, findUser, makeUser

// ===================================================================
function setDefaultWalletAmount(amount) {
  if (parseInt(amount)) wallet = amount || 0;
}
// ===================================================================
function setDefaultBankAmount(amount) {
  if (parseInt(amount)) bank = amount || 0;
}
// ===================================================================
function setMaxBankAmount(amount) {
  if (parseInt(amount)) maxBank = amount || 0;
}
// ===================================================================
async function findUser(settings, uid, gid, by) {
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
  let find = await cs.findOne({
    userID: uid || settings.user.id,
    guildID: gid || settings.guild.id || null,
  });
  if (!find) find = await makeUser(settings, false, uid, gid);

  if (maxBank > 0 && find.bankSpace == 0) find.bankSpace = maxBank;
  if (!find.streak) find.streak = {};
  if (!find.streak.hourly) find.streak.hourly = 0;
  if (!find.streak.daily) find.streak.daily = 0;
  if (!find.streak.weekly) find.streak.weekly = 0;
  if (!find.streak.monthly) find.streak.monthly = 0;
  if (!find.streak.yearly) find.streak.yearly = 0;
  if (!find.streak.hafly) find.streak.hafly = 0;
  if (!find.streak.quaterly) find.streak.quaterly = 0;
  try {
    event.emit(
      "userFetch",
      find,
      by
        .split(" ")
        .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
        .join(" ")
    );
  } catch (e) {}
  return find;
}
// ===================================================================
async function makeUser(settings, user2 = false, uid, gid) {
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
  let user = uid || settings.user.id;
  if (user2) user = settings.user2.id;
  const newUser = new cs({
    userID: user,
    guildID: gid || settings.guild.id || null,
    wallet: wallet || 0,
    bank: bank || 0,
    bankSpace: maxBank || 0,
    streak: {
      hourly: 0,
      daily: 0,
      weekly: 0,
      monthly: 0,
      yearly: 0,
      hafly: 0,
      quaterly: 0,
    },
  });
  if (!newUser)
    throw new Error(
      "Missing data to fetch from DB. (A function in Currency System is used and userID wasn't provided.)"
    );
  // await saveUser(newUser);
  event.emit("userCreate", newUser);
  return newUser;
}
// ===================================================================
async function saveUser(data, data2) {
  // this will prevent error
  // ParallelSaveError: Can't save() the same doc multiple times in parallel.
  // await sleep(Math.floor((Math.random() * 10) + 1) * 100) // 100 - 1000 random  Number generator
  // await data.save(function (err) {
  //     if (err) throw err;
  // });
  // if (data2) {
  //     await sleep(Math.floor((Math.random() * 10) + 1) * 100) // 100 - 1000 random  Number generator
  //     await data2.save(function (err) {
  //         if (err) throw err;
  //     });
  // }
  process.nextTick(
    async () => {
      await sleep(Math.floor(Math.random() * 10 + 1) * 100); // 100 - 1000 random  Number generator
      data.save((_) =>
        _
          ? console.error(
              `ERROR Occured while saving data (Currency-system) \n${"=".repeat(
                50
              )}\n${_ + "\n" + "=".repeat(50)}`
            )
          : "No Error"
      );
      if (data2)
        data2.save((_) =>
          _
            ? console.error(
                `ERROR Occured while saving data (Currency-system) \n${"=".repeat(
                  50
                )}\n${_ + "\n" + "=".repeat(50)}`
              )
            : "No Error"
        );
    },
    data,
    data2
  );
}
// ===================================================================
function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}
// ===================================================================
function amount(data, type = "add", where = "wallet", amount, by) {
  if (!data.bankSpace) data.bankSpace = maxBank || 0;

  if (where === "bank") {
    if (type === "add") data.bank += amount;
    else data.bank -= amount;
  } else {
    if (type === "add") data.wallet += amount;
    else data.wallet -= amount;
  }
  if (data.bankSpace > 0 && data.bank > data.bankSpace) {
    const a = data.bank;
    data.bank = data.bankSpace;
    data.wallet += Math.abs(a - data.bankSpace);
  }
  if (!data.networth) data.networth = 0;
  data.networth = data.bank + data.wallet;
  try {
    event.emit(
      "balanceUpdate",
      data,
      by
        .split(" ")
        .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
        .join(" ")
    );
  } catch (E) {}
  return data;
}
// ===================================================================
async function setBankSpace(userID, guildID, newAmount) {
  let data = await findUser(
    {},
    userID,
    guildID,
    arguments.callee
      .toString()
      .substring(15, arguments.callee.toString().indexOf("("))
  );
  const oldData = data;
  newAmount = parseInt(newAmount);
  if (!newAmount && newAmount !== 0)
    return {
      error: true,
      type: "no-amount-provided",
      rawData: data,
    };
  data.bankSpace = newAmount;

  await saveUser(data);
  event.emit("userUpdate", oldData, data);
  if (oldData.bankSpace !== data.bankSpace)
    return {
      error: false,
      type: "success",
      amount: data.bankSpace,
      rawData: data,
    };
  else
    return {
      error: true,
      type: "same-amount",
      rawData: data,
    };
}
// ===================================================================
async function gamble(settings) {
  let data = await findUser(
    settings,
    null,
    null,
    arguments.callee
      .toString()
      .substring(15, arguments.callee.toString().indexOf("("))
  );
  const oldData = data;
  const money = parseInt(settings.amount);
  const result = Math.floor(Math.random() * 10);
  const balance = data.wallet;
  let lastGamble = data.lastGamble;
  let cooldown = settings.cooldown || 50;
  if (!money)
    return {
      error: true,
      type: "amount",
    };
  if (isNaN(money))
    return {
      error: true,
      type: "nan",
    };
  if (money > balance || !balance || balance === 0)
    return {
      error: true,
      type: "low-money",
      neededMoney: Math.abs(balance - money),
    };
  if (money < settings.minAmount || 0)
    return {
      error: true,
      type: "gamble-limit",
      minAmount: settings.minAmount || 0,
    };
  if (lastGamble !== null && cooldown - (Date.now() - lastGamble) / 1000 > 0)
    return {
      error: true,
      type: "time",
      second: parseSeconds(
        Math.floor(cooldown - (Date.now() - lastGamble) / 1000)
      ),
    };

  if (result <= 5) {
    data.lastGamble = Date.now();
    data = amount(
      data,
      "remove",
      "wallet",
      money,
      arguments.callee
        .toString()
        .substring(15, arguments.callee.toString().indexOf("("))
    );
    await saveUser(data);
    return {
      error: false,
      type: "lost",
      amount: money,
      wallet: data.wallet,
    };
  } else if (result > 5) {
    data.lastGamble = Date.now();

    data = amount(
      data,
      "add",
      "wallet",
      money,
      arguments.callee
        .toString()
        .substring(15, arguments.callee.toString().indexOf("("))
    );

    await saveUser(data);
    event.emit("userUpdate", oldData, data);
    return {
      error: false,
      type: "won",
      amount: money,
      wallet: data.wallet,
    };
  }
}
// ===================================================================
async function withdraw(settings) {
  let data = await findUser(
    settings,
    null,
    null,
    arguments.callee
      .toString()
      .substring(15, arguments.callee.toString().indexOf("("))
  );
  const oldData = data;
  let money = String(settings.amount);

  if (!money)
    return {
      error: true,
      type: "money",
    };
  if (money.includes("-"))
    return {
      error: true,
      type: "negative-money",
    };

  if (money === "all" || money === "max") {
    if (data.bank < 1)
      return {
        error: true,
        type: "no-money",
      };
    data.wallet += data.bank;
    data.bank = 0;
    if (!data.networth) data.networth = 0;
    data.networth = data.bank + data.wallet;
    event.emit("userUpdate", oldData, data);
    await saveUser(data);
    return {
      error: false,
      rawData: data,
      type: "all-success",
    };
  } else {
    money = parseInt(money);
    if (data.bank < parseInt(money))
      return {
        error: true,
        type: "low-money",
      };
    if (isNaN(money))
      return {
        error: true,
        type: "money",
      };

    if (money > data.bank)
      return {
        error: true,
        type: "low-money",
      };

    data.wallet += money;
    data.bank -= money;

    await saveUser(data);
    event.emit("userUpdate", oldData, data);
    return {
      error: false,
      type: "success",
      amount: money,
      rawData: data,
    };
  }
}
// ===================================================================
async function deposite(settings) {
  let data = await findUser(
    settings,
    null,
    null,
    arguments.callee
      .toString()
      .substring(15, arguments.callee.toString().indexOf("("))
  );
  const oldData = data;
  let money = String(settings.amount);

  if (!money)
    return {
      error: true,
      type: "money",
    };
  if (String(money).includes("-"))
    return {
      error: true,
      type: "negative-money",
    };

  if (money === "all" || money === "max") {
    if (data.wallet === 0)
      return {
        error: true,
        type: "no-money",
      };
    if (data.bankSpace > 0 && money === "all" && data.bank === data.bankSpace) {
      return {
        error: true,
        rawData: data,
        type: "bank-full",
      };
    }
    data.bank += data.wallet;
    data.wallet = 0;

    if (data.bankSpace > 0 && data.bank > data.bankSpace) {
      const a = data.bank;
      data.bank = data.bankSpace;
      data.wallet += Math.abs(a - data.bankSpace);
    }

    if (!data.networth) data.networth = 0;
    data.networth = data.bank + data.wallet;
    await saveUser(data);
    event.emit("userUpdate", oldData, data);
    return {
      error: false,
      rawData: data,
      type: "all-success",
    };
  } else {
    money = parseInt(money);
    if (!money)
      return {
        error: true,
        type: "money",
      };
    if (money > data.wallet)
      return {
        error: true,
        type: "low-money",
      };
    if (data.bankSpace > 0 && data.bank == data.bankSpace)
      return {
        error: true,
        type: "bank-full",
        rawData: data,
      };

    data.bank += money;

    if (data.wallet - money < 0) {
      const a = data.wallet;
      data.wallet = 0;
      data.bank -= Math.abs(a - money);
    }

    data.wallet -= money;

    if (!data.networth) data.networth = 0;
    data.networth = data.bank + data.wallet;

    if (data.bankSpace > 0 && data.bank > data.bankSpace) {
      const a = data.bank;
      data.bank = data.bankSpace;
      data.wallet += Math.abs(a - data.bankSpace);
    }

    await saveUser(data);
    event.emit("userUpdate", oldData, data);
    return {
      error: false,
      rawData: data,
      type: "success",
      amount: money,
    };
  }
}
// ===================================================================
async function addMoneyToAllUsers(settings) {
  if (String(settings.amount).includes("-"))
    return {
      error: true,
      type: "negative-money",
    };
  let amountt = parseInt(settings.amount) || 0;

  if (typeof settings.guild === "string")
    settings.guild = {
      id: settings.guild,
    };
  if (!settings.guild)
    settings.guild = {
      id: null,
    };
  let data = await cs.find({
    guildID: settings.guild.id || null,
  });
  if (!data)
    return {
      error: true,
      type: "no-users",
    };
  const oldData = data;
  data.forEach(async (user) => {
    if (settings.wheretoPutMoney === "bank")
      user = amount(
        user,
        "add",
        "bank",
        amountt,
        arguments.callee
          .toString()
          .substring(15, arguments.callee.toString().indexOf("("))
      );
    else
      user = amount(
        user,
        "add",
        "wallet",
        amountt,
        arguments.callee
          .toString()
          .substring(15, arguments.callee.toString().indexOf("("))
      );
  });
  event.emit("usersUpdate", oldData, data);

  data.forEach((a) =>
    a.save(function (err, saved) {
      if (err) console.log(err);
    })
  );

  return {
    error: false,
    type: "success",
    rawData: data,
  };
}
// ===================================================================
async function addMoney(settings) {
  let data = await findUser(
    settings,
    null,
    null,
    arguments.callee
      .toString()
      .substring(15, arguments.callee.toString().indexOf("("))
  );
  const oldData = data;
  if (String(settings.amount).includes("-"))
    return {
      error: true,
      type: "negative-money",
    };
  let amountt = parseInt(settings.amount) || 0;
  if (settings.wheretoPutMoney === "bank")
    data = amount(
      data,
      "add",
      "bank",
      amountt,
      arguments.callee
        .toString()
        .substring(15, arguments.callee.toString().indexOf("("))
    );
  else
    data = amount(
      data,
      "add",
      "wallet",
      amountt,
      arguments.callee
        .toString()
        .substring(15, arguments.callee.toString().indexOf("("))
    );

  event.emit("userUpdate", oldData, data);
  await saveUser(data);
  return {
    error: false,
    type: "success",
    rawData: data,
  };
}
// ===================================================================
async function removeMoneyFromAllUsers(settings) {
  if (String(settings.amount).includes("-"))
    return {
      error: true,
      type: "negative-money",
    };
  let amountt = parseInt(settings.amount) || 0;

  if (typeof settings.guild === "string")
    settings.guild = {
      id: settings.guild,
    };
  if (!settings.guild)
    settings.guild = {
      id: null,
    };
  let data = await cs.find({
    guildID: settings.guild.id || null,
  });
  if (!data)
    return {
      error: true,
      type: "no-users",
    };
  const oldData = data;

  data.forEach(async (user) => {
    if (settings.wheretoPutMoney === "bank") {
      if (settings.amount === "all" || settings.amount === "max") user.bank = 0;
      else
        user = amount(
          user,
          "remove",
          "bank",
          parseInt(settings.amount) || 0,
          arguments.callee
            .toString()
            .substring(15, arguments.callee.toString().indexOf("("))
        );
    } else {
      if (settings.amount === "all" || settings.amount === "max")
        user.wallet = 0;
      else
        user = amount(
          user,
          "remove",
          "wallet",
          parseInt(settings.amount) || 0,
          arguments.callee
            .toString()
            .substring(15, arguments.callee.toString().indexOf("("))
        );
    }
  });
  event.emit("usersUpdate", oldData, data);
  data.forEach((a) =>
    a.save(function (err, saved) {
      if (err) console.log(err);
    })
  );

  return {
    error: false,
    type: "success",
    rawData: data,
  };
}
// ===================================================================
async function removeMoney(settings) {
  let data = await findUser(
    settings,
    null,
    null,
    arguments.callee
      .toString()
      .substring(15, arguments.callee.toString().indexOf("("))
  );
  const oldData = data;
  if (String(settings.amount).includes("-"))
    return {
      error: true,
      type: "negative-money",
    };
  if (settings.wheretoPutMoney === "bank") {
    if (settings.amount === "all" || settings.amount === "max") data.bank = 0;
    else
      data = amount(
        data,
        "remove",
        "bank",
        parseInt(settings.amount) || 0,
        arguments.callee
          .toString()
          .substring(15, arguments.callee.toString().indexOf("("))
      );
  } else {
    if (settings.amount === "all" || settings.amount === "max") data.wallet = 0;
    else
      data = amount(
        data,
        "remove",
        "wallet",
        parseInt(settings.amount) || 0,
        arguments.callee
          .toString()
          .substring(15, arguments.callee.toString().indexOf("("))
      );
  }

  await saveUser(data);
  event.emit("userUpdate", oldData, data);

  return {
    error: false,
    type: "success",
    rawData: data,
  };
}
// ===================================================================
async function transferMoney(settings) {
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
  const oldData1 = user2;
  let money = parseInt(settings.amount);
  if (user1.wallet < money)
    return {
      error: true,
      type: "low-money",
    };
  user1 = amount(
    user1,
    "remove",
    "wallet",
    money,
    arguments.callee
      .toString()
      .substring(15, arguments.callee.toString().indexOf("("))
  );
  user2 = amount(
    user2,
    "add",
    "wallet",
    money,
    arguments.callee
      .toString()
      .substring(15, arguments.callee.toString().indexOf("("))
  );

  await saveUser(user1, user2);
  event.emit("userUpdate", oldData, user1, oldData1, user2);

  return {
    error: false,
    type: "success",
    money: money,
    user: settings.user,
    user2: settings.user2,
    rawData: user1,
    rawData1: user2,
  };
}
module.exports = {
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
};
