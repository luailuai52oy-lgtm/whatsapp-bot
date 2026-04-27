const TelegramBot = require("node-telegram-bot-api");
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");

const TOKEN = process.env.TOKEN;

const bot = new TelegramBot(TOKEN, { polling: true });

let sock;

async function startWA() {
  const { state, saveCreds } = await useMultiFileAuthState("auth");

  sock = makeWASocket({
    auth: state,
    printQRInTerminal: true
  });

  sock.ev.on("creds.update", saveCreds);

  console.log("WhatsApp Connected");
}

startWA();

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "شغال 🔥");
});
