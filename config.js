const fs = require("fs");
const chalk = require("chalk");
require("dotenv").config();

// Default values for global variables
global.available = process.env.AVAILABLE || true;
global.autoReadAll = process.env.AUTO_READ_ALL || false;
global.antitags = process.env.ANTITAGS || true;

// Auto functioner
global.autoTyping = process.env.AUTO_TYPING || false;
global.autoRecord = process.env.AUTO_RECORD || false;
global.groupevent = process.env.GROUPEVENT || false;
global.statusseen = process.env.STATUSSEEN || true;
global.autoreadgc = process.env.AUTOREADGC || true;


// Auth information
global.pairNumber = "5551992769995";                         // Add your paining number with country code example "916297175943"; 
global.port = process.env.PORT || "10000";
global.auth = process.env.AUTH || "Pairing";                // Auth mode OR/Pairing.
global.sessionFile = process.env.SESSION_FILE || "A17-SESSION";
global.mongodb = process.env.MONGODB || "mongodb+srv://profilme1001:NDFIdbnqedNyUzSp@cluster0.6b4tynk.mongodb.net/";                 // Mongodb url.
global.website = "https://www.exenoz.tech"; 
global.github = "https://github.com/Kai0071";


// Default prefix
global.prefa = process.env.PREFIX ? process.env.PREFIX.split(",") : ["."];


// Owner information
global.Owner = process.env.OWNER ? process.env.OWNER.split(",") : ["5551992769995", "5551998031108"];
global.OwnerNumber = process.env.OWNER_NUMBER ? process.env.OWNER_NUMBER.split(",") : ["5551992769995", "5551998031108"];
global.ownertag = process.env.OWNER_TAG ? process.env.OWNER_TAG.split(",") : ["5551992769995"];
global.OwnerName = process.env.OWNER_NAME || "Mello";
global.BotName = process.env.BOT_NAME || "Ayumi";
global.packname = process.env.PACK_NAME || "A17";
global.author = "By Kai";
global.BotSourceCode = "https://github.com/Kai0071/A17";
global.SupportGroupLink = "https://chat.whatsapp.com/GhRGdwfaMVDCoeAdzILfl";


//
global.openAiAPI = process.env.OPENAI_API || "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";
global.location = process.env.LOCATION || "West Bengal, India";
global.reactmoji = process.env.REACT_MOJI || "❤️";
global.themeemoji = process.env.THEME_EMOJI || "💖";
global.vidmenu = { url: process.env.VID_MENU_URL || 'https://media.tenor.com/Jdu0Ov8X2sIAAAAC/A17-Bot.mp4' };


//
global.BotLogo = fs.readFileSync("./Assets/pic1.jpg");
global.Thumb = fs.readFileSync("./Assets/pic9.jpg");
global.Thumb1 = fs.readFileSync("./Assets/pic5.jpg");
global.ErrorPic = fs.readFileSync("./Assets/pic7.jpg");
global.them = "https://r4.wallpaperflare.com/wallpaper/1003/376/845/makoto-shinkai-kimi-no-na-wa-wallpaper-0816ade8b0301c58302c014e48d2441a.jpg";


//
global.ntilinkytvid = []
global.ntilinkytch = []
global.ntilinkig = []
global.ntilinkfb = []
global.ntilinktg = []
global.ntilinktt = []
global.ntilinktwt = []
global.ntilinkall = []
global.nticall = []
global.ntwame = []
global.nttoxic = []
global.ntnsfw = []
global.ntvirtex = []
global.rkyt = []
global.wlcm = []
global.gcrevoke = []
global.autorep = []
global.ntilink = []


// Messages
global.mess = {
  jobdone: 'Rapidinho está pronto !!',
  useradmin: 'Upss, somente *Administradores de Grupo* podem usar este comando!',
  botadmin: 'Desculpe, não posso executar este comando sem ser um *Admin* deste grupo.',
  botowner: 'Opss somente o Whisper pode usar este comando',
  grouponly: 'Opsss este comando é feito apenas para *Grupos*',
  privateonly: 'Opsss este comando é feito apenas para *Chat Privado*!',
  botonly: 'Somente Ayumi pode usar este comando!',
  waiting: 'Espere um momento...',
  nolink: 'Afeee!! Por favor, me forneça um *link*!',
  error: 'Opss! Ocorreu um erro!',
  banned: 'Pisou na bola! Tú tá *banido* de usar comandos!',
  bangc: 'Pisou na bola! Tú tá *banido* de usar comandos!',
  nonsfw: 'Não seja otário!'

}
