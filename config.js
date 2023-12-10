import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

// Owner
global.owner = [
['6283857092641, 'vanz', true]
] 
global.mods = []
global.prems = []
// Info
global.nomorwa = '6283857092641'
global.packname = 'Nezha-MD'
global.author = '© Recode By Vanz?'
global.namebot = 'Nezha-MD'
global.wm = '© Recode By Vanz?'
global.stickpack = 'Nezha-MD'
global.stickauth = '© Recode By Vanz?'
// Link Sosmed
global.sig = 'https://instagram/izuka'
global.sgh = 'https://github.com/takashiizuka'
global.sgc = 'https://chat.whatsapp.com/Em1bK6aCg8P7tcT88ALmey'
// Donasi
global.psaweria = 'saweria.co/Izukaa'
global.ptrakterr = 'https://trakteer.id/izukaa/tip'
global.pdana = '0831-6296-4447'
// Info Wait
global.wait = '_Sedang Di Proses, Mohon Tunggu_....'
global.eror = 'Terjadi Kesalahan Coba Lagi Nanti!'
global.multiplier = 69 
// Apikey
global.xyro = '7xv3bAZodG'
global.caliph = 'VSlyd5WE'
// Catatan : Jika Mau Work Fiturnya
// Masukan Apikeymu
// Gapunya Apikey? Ya Daftar
// Website: https://api.xyroinee.xyz
// Daftar Ke Website Tersebut Untuk
// Mendapatkan Apikey Kamu
global.APIs = {
    xyro: "https://api.xyroinee.xyz",
}

/*Apikey*/
global.APIKeys = {
    "https://api.xyroinee.xyz": "7xv3bAZodG",
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})