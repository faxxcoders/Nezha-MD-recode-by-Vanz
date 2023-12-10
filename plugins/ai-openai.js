import fetch from 'node-fetch'

let handler = async(m, { conn, text }) => {
  if (!text) throw `Mau Nanya Apa?`
    let res = await fetch(`https://aemt.me/gpt4?text=${text}`)
    let vanz = await res.json()
   m.reply(vanz.result)
}
handler.help = ['openai']
handler.tags = ['ai']
handler.command = /^(ai|openai|gpt4)$/i
handler.limit = true
export default handler