import moment from 'moment'
import fs from 'fs'
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let handler  = async (m, { conn}) => {
let mundur = timeConvertA(1722685300000)
let waktu = ` ${mundur.day} Hᴀʀɪ ${mundur.hour} Jᴀᴍ ${mundur.minute} Mᴇɴɪᴛ`
let ppnya = await conn.profilePictureUrl(m.sender, "image").catch(() => 'https://telegra.ph/file/6880771a42bad09dd6087.jpg')
let text = `Hᴀʟᴏ Sᴀʏᴀ Nᴇᴢʜᴀ-Bᴏᴛ\nDibuat Oleh TᴀᴋᴀsʜɪIᴢᴜᴋᴀ ditulis ulang oleh Vanz\n\n*Bailey*:\nOld: @adiwajshing/baileys\nNow: @whiskeysockets/baileys\nVer: 6.5.0\n\nUʟᴛᴀʜ *Vanz:*\n\n*M E N U*\n• .ʟɪsᴛᴍᴇɴᴜ`

let fload = { key : { remoteJid: 'status@broadcast', participant : '0@s.whatsapp.net' }, message: { orderMessage: { itemCount : 999, status: 404, surface : 404, message: `by Vanz?`, orderTitle: ``, thumbnailUrl: ppnya, sellerJid: '0@s.whatsapp.net' }}}

let loadd = [
 '██▒▒▒▒▒▒▒▒▒▒▒ 10%',
 '████▒▒▒▒▒▒▒▒▒ 30%',
 '███████▒▒▒▒▒▒ 50%',
 '██████████▒▒▒ 70%',
 '█████████████ 100%',
 '𝙻𝙾𝙰𝙳𝙸𝙽𝙶 𝙲𝙾𝙼𝙿𝙻𝙴𝚃𝙴𝙳...'
 ]
 
 for (let i = 0; i < loadd.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 300));
    await conn.sendMessage(m.chat, {
      react: {
        text: '🗿',
        key: m.key
      }
    });
  }

  const lll = await conn.sendMessage(m.chat, { text: 'wait...' }, { quoted: m });
  
  for (let i = 0; i < loadd.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 100));
    await conn.relayMessage(m.chat, {
      protocolMessage: {
        key: lll,
        type: 14,
        editedMessage: {
          conversation: loadd[i]
        },
        contextInfo: { 
          mentionedJid: [m.sender]
        }
      }
    }, { quoted: m });
  }

  conn.sendMessage(m.chat, {
                        video: fs.readFileSync('./src/limvanz.mp4'),
                        caption: men,
                        gifPlayback: true
                    }, {
                        quoted: fload
                    })
  }
  
  handler.command = /^(menu)$/i
  handler.tags = ['main']
  handler.help = ['menu', 'help', '?']
  
  export default handler

function timeConvertA(input) {
    var now = new Date().getTime();
    var timeleft = input - now;

    var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    return {day: days, hour: hours, minute: minutes, second: seconds}
}