const mongoose = require('mongoose');
var connection;
mongoose.set('useFindAndModify', false);
const economy = require('./models/economy');
const dailycd = 8.64e+7;
module.exports = {
    /**
     * @param {string} uri - Mongo Connection URI
     */
    async connect(uri){
        if(!uri) throw new TypeError("Please provide a Mongoose URI");
        connection = uri;
        return mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    },
    /**
     * @param {string} userID - ID of the User
     * @param {string} guildID - ID of the Guild
     */
    async balance(userID, guildID){
        if(!userID) throw new TypeError("Please Provide a User ID");
        if(!guildID) throw new TypeError("Please Provide a Guild ID");
        const user = await economy.findOne({userID: userID, guildID: guildID});
        if(!user){
            const newU = new economy({ guildID: guildID,userID: userID });
            const {wallet, bankCapacity, bank} = newU;
            await newU.save().catch(error => console.log(error));
            return {wallet, bankCapacity, bank}
        }else{
        const wallet = user.wallet;
        const bankCapacity = user.bankCapacity;
        const bank = user.bank;
        return {wallet, bankCapacity, bank};
        }
     },
     /**
      * @param {string} userID - ID of the User
      * @param {string} guildID - ID of the Guild
      * @param {number} amount - Amount of Coins
      */
     async give(userID, guildID, amount){
        if(!userID) throw new TypeError("Please Provide a User ID");
        if(!guildID) throw new TypeError("Please Provide a Guild ID");
        if(!amount) throw new TypeError("Please Provide an Amount");
        if(isNaN(amount)) return new TypeError("The amount should be an integer");
        if(amount < 0 ) throw new TypeError("Amount can't be less than zero");
        const user = await economy.findOne({userID: userID, guildID: guildID});
        if(!user){
            const newU = new economy({ guildID: guildID,userID: userID });
            await newU.save().catch(error => console.log(error));
            return {amount};
        }
        user.wallet += parseInt(amount);
        await user.save().catch(error => console.log(error));
        return {amount};
     },
     /**
      * @param {string} userID - ID of the User
      * @param {string} guildID - ID of the Guild
      * @param {string} amount - Amount of Coins
      */
     async deduct(userID, guildID, amount){
        if(!userID) throw new TypeError("Please Provide a User ID");
        if(!guildID) throw new TypeError("Please Provide a Guild ID");
        if(!amount) throw new TypeError("Please Provide an Amount");
        if(isNaN(amount)) return new TypeError("The amount should be an integer");
        if(amount < 0 ) throw new TypeError("Amount can't be less than zero");
        const user = await economy.findOne({userID: userID, guildID: guildID});
        if(!user){
            const newU = new economy({ guildID: guildID, userID: userID });
            await newU.save().catch(error => console.log(error));
            const amount = 0;
            return {amount};
        }if(amount > user.wallet){
            user.wallet -= user.wallet;
            const amount = user.wallet;
            await user.save().catch(error => console.log(error));
            return {amount};
        }
        user.wallet -= parseInt(amount);
        await user.save().catch(error => console.log(error));
        return {amount};
     },
     /**
      * @param {string} userID - ID of the User
      * @param {string} guildID - ID of the Guild
      * @param {string} capacity - Give new
      */
     async giveCapacity(userID, guildID, capacity){
        if(!userID) throw new TypeError("Please Provide a User ID");
        if(!guildID) throw new TypeError("Please Provide a Guild ID");
        if(!capacity) throw new TypeError("Please Provide an Amount");
        if(isNaN(capacity)) return new TypeError("The amount should be an integer");
        if(capacity < 0 ) throw new TypeError("Can't give bank space less than zero");
        const user = await economy.findOne({userID: userID, guildID: guildID});
        if(!user){
            const newU = new economy({
                guildID: guildID,
                userID: userID,
                wallet: 0,
                bank: 0,
                bankCapacity: 2500 + parseInt(capacity)
            });
            await newU.save().catch(error => console.log(error));
            return {capacity};
        }
        user.bankCapacity += parseInt(capacity);
        await user.save().catch(error => console.log(error));
        return {capacity};
     },
     /**
      * @param {string} userID - ID of the User
      * @param {string} guildID - ID of the Guild
      */
     async create(userID, guildID){
        if(!userID) throw new TypeError("Please Provide a User ID");
        if(!guildID) throw new TypeError("Please Provide a Guild ID");
        let user = await economy.findOne({userID: userID, guildID: guildID});
        if(user) return {exists: true};
        const newU = new economy({
            guildID: guildID,
            userID: userID,
            wallet: 0,
            bank: 0,
            bankCapacity: 2500
        });
        await newU.save().catch(error => console.log(error));
        return {exists: false}
     },
     /**
      * @param {string} userID - ID of the User
      * @param {string} guildID - ID of the Guild
      */
     async delete(userID, guildID){
        if(!userID) throw new TypeError("Please Provide a User ID");
        if(!guildID) throw new TypeError("Please Provide a Guild ID");
        let user = await economy.findOne({userID: userID, guildID: guildID});
        if(user) return {exists: true};
        if(!user) return {exists: false};
        user.remove().catch(error => console.log(error));
     },
     /**
      * @param {string} guildID - ID of the Guild
      * @param {number} count - Amount Of Users
      */
     async lb(guildID, count, type){
        if(!guildID) throw new TypeError("Please Provide a Guild ID");
        if(!count) throw new TypeError("You didn't Provide the amount of users");
        if(isNaN(count)) throw new TypeError("The Amount of Users must be a number");
        let user = await economy.find({guildID: guildID}).sort([['wallet', 'descending']]).exec();
        return user.slice(0, count);
     },
     /**
      * @param {string} userID - ID of the User
      * @param {string} guildID - ID of the Guild
      * @param {number} amount - Amount of Daily
      */
     async daily(userID, guildID, amount){
        if(!userID) throw new TypeError("Please Provide a User ID");
        if(!guildID) throw new TypeError("Please Provide a Guild ID");
        if(!amount) throw new TypeError("Please Provide an amount");
        var cdL;
        const user = await economy.findOne({userID: userID, guildID: guildID});
        if(!user){
        const newU = new economy({userID: userID, guildID: guildID});
        await newU.save().catch(error => console.log(error));
        }
        const user1 = await economy.findOne({userID: userID, guildID: guildID})
        if(dailycd -(Date.now()-await user1.daily) > 0){
            var millisec = parseInt(dailycd-(Date.now()-await user1.daily));
            var seconds = (millisec / 1000).toFixed(0);
    var minutes = Math.floor(Number(seconds) / 60).toString();
    let hours;
    if (Number(minutes) > 59) {
      hours = Math.floor(Number(minutes) / 60);
      hours = (hours >= 10) ? hours : "0" + hours;
      minutes = (Number(minutes) - (hours * 60)).toString();
      minutes = (Number(minutes) >= 10) ? minutes : "0" + minutes;
    }

    seconds = Math.floor(Number(seconds) % 60).toString();
    seconds = (Number(seconds) >= 10) ? seconds : "0" + seconds;
    if(hours){
        cdL = `${hours} Hour(s), ${minutes} Minute(s), ${seconds} Seconds.`
    }
    if (!hours) {
      cdL = `${minutes} Minute(s), ${seconds} Seconds.`
    }
    if (!minutes) {
        cdL = `${seconds} Seconds.`
    }
    if (!seconds) {
        cdL = `0 Seconds.`
    }
            return {cd: true, cdL, seconds, minutes, hours}
        }else{
            user1.daily = Date.now();
            user1.wallet += parseInt(amount);
            user1.save().catch(error => console.log(error));;
            return {amount};
        }
        
    },
    /**
     * @param {string} userID - ID of the User
     * @param {string} guildID - ID of the Guild  
     * @param {string} amount - Deposit Amount
     */
    async deposit(userID, guildID, amount){
        if(!userID) throw new TypeError("Please Provide a User ID");
        if(!guildID) throw new TypeError("Please Provide a Guild ID");
        if(!amount) throw new TypeError("Please Provide an amount");
        if(amount < 0) throw new TypeError("Deposit Can't be less Than Zero");
        const user = await economy.findOne({userID: userID, guildID: guildID});
        const bankc = user.bankCapacity;
        if(parseInt(amount) > user.wallet) return {noten: true};
        if(parseInt(amount) + bankc > bankc || amount === "all"){
            const add = bankc - user.bank;
            if(add > user.wallet){
                const amount = user.wallet;
                user.bank += user.wallet;
                user.wallet -= user.wallet;
                user.save().catch(error => console.log(error));;
                return {noten: false, amount};
            }else{
            const amount = add;
            user.bank += add;
            user.wallet -= add;
            user.save().catch(error => console.log(error));;
            return {noten: false, amount}
            }
        }
    },
    /**
     * @param {string} userID - ID of the User
     * @param {string} guildID - ID of the Guild  
     * @param {string} wAmount - Withdraw Amount
     */
    async withdraw(userID, guildID, wAmount){
        if(!userID) throw new TypeError("Please Provide a User ID");
        if(!guildID) throw new TypeError("Please Provide a Guild ID");
        if(!wAmount) throw new TypeError("Please Provide an amount");
        if(wAmount < 0) throw new TypeError("Withdraw Can't be less Than Zero");
        if(wAmount !== "all" && isNaN(wAmount)) return {invalid: true};
        const user = await economy.findOne({userID: userID, guildID: guildID});
        if(wAmount > user.bank) return {noten: true};
        if(wAmount === "all"){
            const all = user.bank;
            user.wallet += all;
            user.bank -= all;
            const amount = all;
            user.save().catch(error => console.log(error));;
            return {amount}
        }else{
            user.bal += parseInt(wAmount);
            user.bank -= parseInt(wAmount);
            user.save().catch(error => console.log(error));;
            const amount = wAmount;
            return {amount};
        }
    }
}
