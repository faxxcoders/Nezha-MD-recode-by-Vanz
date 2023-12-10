import jimp from "jimp"; 
  
 const resize = async (image, width, height) => { 
     const read = await jimp.read(image); 
     const data = await read.resize(width, height).getBufferAsync(jimp.MIME_JPEG); 
     return data; 
 }; 
  
 import { 
     emoji_role, 
     sesi, 
     playerOnGame, 
     playerOnRoom, 
     playerExit, 
     dataPlayer, 
     dataPlayerById, 
     getPlayerById, 
     getPlayerById2, 
     killWerewolf, 
     killww, 
     dreamySeer, 
     sorcerer, 
     protectGuardian, 
     roleShuffle, 
     roleChanger, 
     roleAmount, 
     roleGenerator, 
     addTimer, 
     startGame, 
     playerHidup, 
     playerMati, 
     vote, 
     voteResult, 
     clearAllVote, 
     getWinner, 
     win, 
     pagi, 
     malam, 
     skill, 
     voteStart, 
     voteDone, 
     voting, 
     run, 
     run_vote, 
     run_malam, 
     run_pagi 
 } from '../lib/werewolf.js'; 
  
 // [ Thumbnail ] 
 let thumb = 
     "https://user-images.githubusercontent.com/72728486/235316834-f9f84ba0-8df3-4444-81d8-db5270995e6d.jpg"; 
  
 const handler = async (m, { 
     conn, 
     command, 
     usedPrefix, 
     args 
 }) => { 
     const { 
         sender, 
         chat 
     } = m; 
     conn.werewolf = conn.werewolf ? conn.werewolf : {}; 
     const ww = conn.werewolf ? conn.werewolf : {}; 
     const data = ww[chat]; 
     const value = args[0]; 
     const target = args[1]; 
  
     // [ Membuat Room ] 
     if (value === "create") { 
         if (chat in ww) return m.reply("Group masih dalam sesi permainan"); 
         if (playerOnGame(sender, ww) === true) 
             return m.reply("Kamu masih dalam sesi game"); 
         ww[chat] = { 
             room: chat, 
             owner: sender, 
             status: false, 
             iswin: null, 
             cooldown: null, 
             day: 0, 
             time: "malem", 
             player: [], 
             dead: [], 
             voting: false, 
             seer: false, 
             guardian: [], 
         }; 
         await m.reply("Room berhasil dibuat, ketik *.ww join* untuk bergabung"); 
  
         // [ Join sesi permainan ] 
     } else if (value === "join") { 
         if (!ww[chat]) return m.reply("Belum ada sesi permainan"); 
         if (ww[chat].status === true) 
             return m.reply("Sesi permainan sudah dimulai"); 
         if (ww[chat].player.length > 16) 
             return m.reply("Maaf jumlah player telah penuh"); 
         if (playerOnRoom(sender, chat, ww) === true) 
             return m.reply("Kamu sudah join dalam room ini"); 
         if (playerOnGame(sender, ww) === true) 
             return m.reply("Kamu masih dalam sesi game"); 
         let data = { 
             id: sender, 
             number: ww[chat].player.length + 1, 
             sesi: chat, 
             status: false, 
             role: false, 
             effect: [], 
             vote: 0, 
             isdead: false, 
             isvote: false, 
         }; 
         ww[chat].player.push(data); 
         let player = []; 
         let text = `\n*Werewolf - Pemain*\n\n`; 
         for (let i = 0; i < ww[chat].player.length; i++) { 
             text += `${ww[chat].player[i].number}) @${ww[chat].player[i].id.replace( 
           "@s.whatsapp.net", 
           "" 
         )}\n`; 
             player.push(ww[chat].player[i].id); 
         } 
         text += "\nJumlah Pemain Minimal Adalah 5 Dan Maximal 15"; 
         conn.sendMessage( 
             m.chat, { 
                 text: text.trim(), 
                 contextInfo: { 
                     externalAdReply: { 
                         title: "Werewolf", 
                         mediaType: 1, 
                         renderLargerThumbnail: true, 
                         thumbnail: await resize(thumb, 300, 175), 
                         sourceUrl: "", 
                         mediaUrl: thumb, 
                     }, 
                     mentionedJid: player, 
                 }, 
             }, { 
                 quoted: m 
             } 
         ); 
  
         // [ Game Play ] 
     } else if (value === "start") { 
         if (!ww[chat]) return m.reply("Belum Ada Sesi Permainan"); 
         if (ww[chat].player.length === 0) 
             return m.reply("Room Belum Memiliki Pemain"); 
         if (ww[chat].player.length < 5) 
             return m.reply("Maaf Jumlah Pemain Belum Memenuhi Syarat"); 
         if (playerOnRoom(sender, chat, ww) === false) 
             return m.reply("Kamu Belum Join Dalam Room Ini"); 
         if (ww[chat].cooldown > 0) { 
             if (ww[chat].time === "voting") { 
                 clearAllVote(chat, ww); 
                 addTimer(chat, ww); 
                 return await run_vote(conn, chat, ww); 
             } else if (ww[chat].time === "malem") { 
                 clearAllVote(chat, ww); 
                 addTimer(chat, ww); 
                 return await run_malam(conn, chat, ww); 
             } else if (ww[chat].time === "pagi") { 
                 clearAllVote(chat, ww); 
                 addTimer(chat, ww); 
                 return await run_pagi(conn, chat, ww); 
             } 
         } 
         if (ww[chat].status === true) 
             return m.reply("Sesi Permainan Telah Dimulai"); 
         if (ww[chat].owner !== sender) 
             return m.reply( 
                 `Hanya @${ww[chat].owner.split("@")[0]} Yang Dapat Memulai Permainan`, { 
                     withTag: true 
                 } 
             ); 
         let list1 = ""; 
         let list2 = ""; 
         let player = []; 
         roleGenerator(chat, ww); 
         addTimer(chat, ww); 
         startGame(chat, ww); 
         for (let i = 0; i < ww[chat].player.length; i++) { 
             list1 += `(${ww[chat].player[i].number}) @${ww[chat].player[ 
           i 
         ].id.replace("@s.whatsapp.net", "")}\n`; 
             player.push(ww[chat].player[i].id); 
         } 
         for (let i = 0; i < ww[chat].player.length; i++) { 
             list2 += `(${ww[chat].player[i].number}) @${ww[chat].player[ 
           i 
         ].id.replace("@s.whatsapp.net", "")} ${ 
           ww[chat].player[i].role === "werewolf" || 
           ww[chat].player[i].role === "sorcerer" 
             ? `[${ww[chat].player[i].role}]` 
             : "" 
         }\n`; 
             player.push(ww[chat].player[i].id); 
         } 
         for (let i = 0; i < ww[chat].player.length; i++) { 
             // [ Werewolf ] 
             if (ww[chat].player[i].role === "werewolf") { 
                 if (ww[chat].player[i].isdead != true) { 
                     var text = `Hai ${conn.getName( 
               ww[chat].player[i].id 
             )}, Kamu Telah Dipilih Untuk Memerankan *Werewolf* ${emoji_role( 
               "werewolf" 
             )} Pada Permainan Kali Ini, Silahkan Pilih Salah Satu Player Yang Ingin Kamu Makan Pada Malam Hari Ini\n*List Pemain*:\n${list2}\n\nKetik *.wwpc kill nomor* Untuk Memakan Player`; 
                     await conn.sendMessage(ww[chat].player[i].id, { 
                         text: text, 
                         mentions: player, 
                     }); 
                 } 
  
                 // [ villager ] 
             } else if (ww[chat].player[i].role === "warga") { 
                 if (ww[chat].player[i].isdead != true) { 
                     let text = `*Werewolf - Game*\n\nHai ${conn.getName( 
               ww[chat].player[i].id 
             )} Peran Kamu Adalah *Warga Desa* ${emoji_role( 
               "warga" 
             )}, Tetap Waspada, Mungkin *Werewolf* Akan Memakanmu Malam Uni, Silakan Masuk Kerumah Masing Masing.\n*List Pemain*:\n${list1}`; 
                     await conn.sendMessage(ww[chat].player[i].id, { 
                         text: text, 
                         mentions: player, 
                     }); 
                 } 
  
                 // [ Penerawangan ] 
             } else if (ww[chat].player[i].role === "seer") { 
                 if (ww[chat].player[i].isdead != true) { 
                     let text = `Hai ${conn.getName( 
               ww[chat].player[i].id 
             )} Kamu Telah Terpilih Untuk Menjadi *Penerawang* ${emoji_role( 
               "seer" 
             )}. Dengan Sihir Yang Kamu Punya, Kamu Bisa Mengetahui Peran Pemain Yang Kamu Pilih.\n*List Pemain*:\n${list1}\n\nKetik *.wwpc dreamy nomor* Untuk Melihat Peran Pemain`; 

                     await conn.sendMessage(ww[chat].player[i].id, { 
                         text: text, 
                         mentions: player, 
                     }); 
                 } 
  
                 // [ Guardian ] 
             } else if (ww[chat].player[i].role === "guardian") { 
                 if (ww[chat].player[i].isdead != true) { 
                     let text = `Hai ${conn.getName( 
               ww[chat].player[i].id 
             )} Kamu Terpilih Untuk Memerankan *Malaikat Pelindung* ${emoji_role( 
               "guardian" 
             )}, Dengan Kekuatan Yang Kamu Miliki, Kamu Bisa Melindungi Para Warga, Silahkan Pilih Salah 1 Player Yang Ingin Kamu Lindungi\n*List Pemain*:\n${list1}\n\nKetik *.wwpc deff nomor* Untuk Melindungi Pemain`; 
                     await conn.sendMessage(ww[chat].player[i].id, { 
                         text: text, 
                         mentions: player, 
                     }); 
                 } 
  
                 // [ Sorcerer ] 
             } else if (ww[chat].player[i].role === "sorcerer") { 
                 if (ww[chat].player[i].isdead != true) { 
                     let text = `Hai ${conn.getName( 
               ww[chat].player[i].id 
             )} Kamu Terpilih Sebagai Penyihir ${emoji_role( 
               "sorcerer" 
             )}, Dengan Kekuasaan Yang Kamu Punya, Kamu Bisa Membuka Identitas Para Pemain, Silakan Pilih 1 Pemain Yang Ingin Kamu Buka Identitasnya\n*List Pemain*:\n${list2}\n\nKetik *.wwpc sorcerer nomor* Untuk Melihat Peran Pemain`; 
                     await conn.sendMessage(ww[chat].player[i].id, { 
                         text: text, 
                         mentions: player, 
                     }); 
                 } 
             } 
         } 
         await conn.sendMessage(m.chat, { 
             text: "*Werewolf - Game*\n\nGame Telah Dimulai, Para Pemain Akan Memerankan Perannya Masing Masing, Silahkan Cek Chat Pribadi Untuk Melihat Peran Kalian. Berhati-Hatilah Para Sarga, Mungkin Malam Ini Kamu Akan Di Ewe Brutal", 
             contextInfo: { 
                 externalAdReply: { 
                     title: "Werewolf", 
                     mediaType: 1, 
                     renderLargerThumbnail: true, 
                     thumbnail: await resize(thumb, 300, 175), 
                     sourceUrl: "", 
                     mediaUrl: thumb, 
                 }, 
                 mentionedJid: player, 
             }, 
         }); 
         await run(conn, chat, ww); 
     } else if (value === "vote") { 
         if (!ww[chat]) return m.reply("Belum Ada Sesi Permainan"); 
         if (ww[chat].status === false) 
             return m.reply("Sesi Permainan Belum Dimulai"); 
         if (ww[chat].time !== "voting") 
             return m.reply("Sesi Voting Belum Dimulai"); 
         if (playerOnRoom(sender, chat, ww) === false) 
             return m.reply("Kamu Bukan Pemain"); 
         if (dataPlayer(sender, ww).isdead === true) 
             return m.reply("Kamu Sudah Mati"); 
         if (!target || target.length < 1) 
             return m.reply("Masukan Nomor Pemain"); 
         if (isNaN(target)) return m.reply("Gunakan Hanya Nomor"); 
         if (dataPlayer(sender, ww).isvote === true) 
             return m.reply("Kamu Sudah Melakukan Voting"); 
        let b = getPlayerById(chat, sender, parseInt(target), ww); 
         if (b.db.isdead === true) 
             return m.reply(`Pemain ${target} Sudah Mati.`); 
         if (ww[chat].player.length < parseInt(target)) 
             return m.reply("Invalid"); 
         if (getPlayerById(chat, sender, parseInt(target), ww) === false) 
             return m.reply("Pemain Tidak Terdaftar!"); 
         vote(chat, parseInt(target), sender, ww); 
         return m.reply("Pemain Berhasil Di Vote!"); 
     } else if (value == "left") { 
         if (!ww[chat]) return m.reply("Tidak Ada Sesi Permainan"); 
         if (playerOnRoom(sender, chat, ww) === false) 
             return m.reply("Kamu Tidak Dalam Sesi Permainan"); 
         if (ww[chat].status === true) 
             return m.reply("Permainan Sudah Dimulai, Kamu Tidak Bisa Keluar"); 
         m.reply(`@${sender.split("@")[0]} Keluar Dari Permainan`, { 
             withTag: true, 
         }); 
         playerExit(chat, sender, ww); 
     } else if (value === "delete") { 
         if (!ww[chat]) return m.reply("Tidak Ada Sesi Permainan"); 
         if (ww[chat].owner !== sender) 
             return m.reply( 
                 `Hanya @${ 
             ww[chat].owner.split("@")[0] 
           } Yang Dapat Menghapus Sesi Permainan Ini` 
             ); 
         m.reply("Sesi Permainan Berhasil Dihapus").then(() => { 
             delete ww[chat]; 
         }); 
     } else if (value === "player") { 
         if (!ww[chat]) return m.reply("Tidak Ada Sesi Permainan"); 
         if (playerOnRoom(sender, chat, ww) === false) 
             return m.reply("Kamu Tidak Dalam Sesi Permainan"); 
         if (ww[chat].player.length === 0) 
             return m.reply("Sesi Permainan Belum Memiliki Pemain"); 
         let player = []; 
         let text = "\n*Werewolf - Game*\n\nList Pemain:\n"; 
         for (let i = 0; i < ww[chat].player.length; i++) { 
             text += `(${ww[chat].player[i].number}) @${ww[chat].player[i].id.replace( 
           "@s.whatsapp.net", 
           "" 
         )} ${ 
           ww[chat].player[i].isdead === true 
             ? `☠️ ${ww[chat].player[i].role}` 
             : "" 
         }\n`; 
             player.push(ww[chat].player[i].id); 
         } 
         conn.sendMessage( 
             m.chat, { 
                 text: text, 
                 contextInfo: { 
                     externalAdReply: { 
                         title: "Werewolf", 
                         mediaType: 1, 
                         renderLargerThumbnail: true, 
                         thumbnail: await resize(thumb, 300, 175), 
                         sourceUrl: "", 
                         mediaUrl: thumb, 
                     }, 
                     mentionedJid: player, 
                 }, 
             }, { 
                 quoted: m 
             } 
         ); 
     } else if (value === "guide") {  
     let text = `\n*Werewolf - Game*\n\nPermainan Sosial Yang Berlangsung Dalam Beberapa Putaran/Ronde. Para Pemain Dituntut Untuk Mencari Seorang Penjahat Yang Ada Dipermainan. Para Pemain Diberi Waktu, Peran, Serta Kemampuannya Masing-masing Untuk Bermain Permainan Ini\n\n✧━━━━━━━━━━━━━[ *PERAN* ]━━━━━━━━━━━━━✧\n\n\`\`\`WARGA\`\`\`\nWarga biasa. Peran yang tidak mengetahui siapa lawan, siapa teman. Tugasmu adalah mencari tahu siapa Werewolf yang asli. Hanya dapat mengikuti voting\n\n\`\`\`WEREWOLF\`\`\`\nSerigala lapar yang setiap malam harus makan orang. Mengetahui siapa saja komplotan serigalanya (jika peran Werewolf lebih dari 1). Dapat memakan 1 warga desa setiap malam.
Saran, sebaiknya peran werewolf ini dibagikan ke minimal 2 orang dalam permainan..\n\n\`\`\`GUARDIAN\`\`\`\nMalaikat Pelindung. Dapat melindungi satu warga desa dari serangan serigala pada malam hari.\n\n\`\`\`SEER\`\`\`\nPenerawang. Setiap malam, kamu bisa menerawang satu warga desa untuk dibuka identitas aslinya. \n\n\`\`\`SORCERER\`\`\`\nPenyihir jahat yang dapat menerawang antara Serigala dan Seer saja. Dia berkomplot dengan Werewolf untuk mencari tahu siapa Seer yang asli\n\n\n\n✧━━━━━━━[ *SIMULASI GAME WW* ]━━━━━━━━✧\n\nDi sini saya akan beri contoh pada permainan yang dimainkan 8 orang dengan 1 moderator, 2 werewolf, 1 guardian angel, 1 seer, dan 3 villager.\n\nCara membagikan role pemain ini adalah dengan membagikan kartu dengan cara terbalik. Pemain tidak boleh memperlihatkan kartu mereka kepada pemain lain. Hanya dia dan moderator saja yang boleh tau.\n\nKetika semua kartu sudah terbagi, moderator menyuruh semua pemain menutup matanya dan secara bergilir membuka mata untuk laporan peran apa yang dia dapat. Setelah laporan selesai permainan pun dimulai.\n\nPermainan dimulai pada malam hari. Moderator meminta semua pemain untuk menutup mata, kemudian menyuruh werewolf untuk memilih siapa yang ingin dibunuh.\n\n\`\`\`Malam telah tiba, semua warga tertidur.\n\nWerewolf silahkan buka mata, pilih siapa yang ingin dibunuh.\`\`\`\n\nSetelah rembukan para werewolf selesai dan sudah terpilih siapa yang ingin dibunuh, moderator akan menyuruh werewolf untuk tutup mata lagi.\n\nLalu menyuruh para pemeran penting lain untuk memainkan perannya seperti seer dan guardian angel.\n\n\`\`\`Seer buka mata, pilih siapa yang ingin diterawang.\`\`\`\n\n(Kemudian beri kode jari membentuk ‘W’ untuk werewolf dan isyarat tidak untuk bukan werewolf.)\n\n\`\`\`Tutup mata kembali.\`\`\`\n\n\`\`\`Guardian buka mata, pilih siapa yang ingin dilindungi.\`\`\`\n\n(Ini yang akan terlindung, jika werewolf membunuhnya dia tidak akan mati malam itu.)\n\n\`\`\`Guardian silahkan tutup mata kembali.\n\nSetelah semua role yang memiliki kemampuan pada malam hari sudah menggunakan kekuatannya, bergantilah hari menjadi siang untuk berdiskusi siapa werewolfnya.\n\n\`\`\`Matahari telah terbit, semua terbangun dari tidurnya.\`\`\`\n\nJika guardian tidak berhasil melindungi pemain yang dipilih werewolf pada malam hari untuk dibunuh, maka siangnya dia mati dan keluar dari permainan dengan memperlihatkan kartunya pada pemain lain.\n\n\`\`\`Tadi malam guardian tidak berhasil melindungi warga, dan (nama pemain yang dibunuh) telah mati dibunuh oleh werewolf\`\`\`\n\nNamun, jika guardian berhasil menjaga pemain yang ingin dibunuh maka pada siang hari desa tetap damai tanpa ada yang mati.\n\n\`\`\`Hari yang damai, tidak ada yang terbunuh tadi malam.\`\`\`\n\nSetelah itu, waktunya untuk semua pemain berembuk siapa yang akan digantung hari itu. Namun pada hari pertama jika belum ada yang bisa dicurigai sebagai werewolf, hukuman gantung bisa digugurkan. Ini hanya berlaku pada malam pertama.\n\nModerator akan memberikan waktu untuk berdiskusi. Jika sudah, mulailah vote yang ingin digantung dengan masing-masing pemain menunjuk 1 pemain lain yang ingin dia gantung.\n\nPemain yang mendapat vote paling banyak maka dia akan digantung dan keluar dari permainan, kemudian menunjukkan peran apa yang dia dapat.\n\nJika ada lebih dari 1 pemain dengan vote terbanyak maka selanjutnya mereka akan melakukan pembelaan. Setelah pembelaan selesai vote akan diulang, tapi pemain yang mendapat vote terbanyak tadi tidak boleh ikut vote lagi.\n\nSetelah selesai dan didapat 1 orang yang digantung kemudian hari kembali menjadi malam. Alurnya sama seperti diawal, werewolf, seer, dan guardian beraksi dengan tugasnya masing-masing.\n\nDiakhir permainan jika semua werewolf telah tergantung maka tim baik (seer, guardian, warga) menang. Namun jika jumlah werewolf sudah lebih banyak atau setara dengan tim baik, maka tim jahat menang.\n\nNah, untuk lebih jelasnya bisa lihat tutorial di video berikut ini.\n\nBegitulah cara main werewolf real yang mengasyikkan. Pada dasarnya berapapun role yang dipakai cara yang diterapkan tetap sama, perhatikan saja apa fungsi dari masing-masing role, Kalian juga dapat menerapkan di game virtual.\n\n\nSelamat bermain!`; 
         conn.sendMessage( 
             m.chat, { 
                 text: text,
                 contextInfo: { 
                     externalAdReply: { 
                         title: "Werewolf", 
                         mediaType: 1, 
                         renderLargerThumbnail: true, 
                         thumbnail: await resize(thumb, 300, 175), 
                         sourceUrl: "", 
                         mediaUrl: thumb, 
                     }, 
                 }, 
             }, { 
                 quoted: m 
             } 
         );
     } else { 
         let text = `\n*Werewolf - Game*\n\nPermainan Sosial Yang Berlangsung Dalam Beberapa Putaran/Ronde. Para Pemain Dituntut Untuk Mencari Seorang Penjahat Yang Ada Dipermainan. Para Pemain Diberi Waktu, Peran, Serta Kemampuannya Masing-masing Untuk Bermain Permainan Ini\n\n*List Perintah*\n`; 
         text += ` _*• ww guide* (Panduan Bermain Werewolf)_\n`; 
         text += ` _*• ww create* (Membuat Sesi Game)_\n`; 
         text += ` _*• ww join* (Untuk Mengikuti Game)_\n`; 
         text += ` _*• ww start* (Memulai Game)_\n`; 
         text += ` _*• ww left* (Keluar Dari Game)_\n`; 
         text += ` _*• ww delete* (Menghapus Game)_\n`; 
         text += ` _*• ww player* (Meihat Pemain)_\n`; 
         text += `\nPermainan Ini Dapat Dimainkan Dari 5 Sampai 15 Orang.`; 
         conn.sendMessage( 
             m.chat, { 
                 text: text.trim(), 
                 contextInfo: { 
                     externalAdReply: { 
                         title: "Werewolf", 
                         mediaType: 1, 
                         renderLargerThumbnail: true, 
                         thumbnail: await resize(thumb, 300, 175), 
                         sourceUrl: "", 
                         mediaUrl: thumb, 
                     }, 
                 }, 
             }, { 
                 quoted: m 
             } 
         ); 
     } 
 } 
 handler.help = ['ww']; 
 handler.tags = ['game']; 
 handler.command = ['ww']; 
 export default handler;