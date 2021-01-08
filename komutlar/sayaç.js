const Discord = require('discord.js')
const db = require('wio.db')
const ayarlar = require('../ayarlar.json')
 
exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("<:red:792071317427978251> Bu komutu kullanabilmek için **Yönetici** yetkisine sahip olmalısın.")
  
  const sayacsayi = await db.fetch(`sayac_${message.guild.id}`);
  const sayackanal = message.mentions.channels.first()

      
  if(args[0] !== "ayarla" && args[0] !== "sıfırla") return message.channel.send("<:red:792071317427978251> Yanlış Kullanım Lütfen ``ayarla`` veya ``sıfırla`` yaz. **Örnek: !sayaç ayarla** ``sayı`` ``#kanal``")
    if(args[0] === "sıfırla") {
    if(!sayacsayi) {
      message.channel.send(`<:red:792071317427978251> | **Ayarlanmayan şeyi sıfırlayamazsın.**`)
return
    }
    
    db.delete(`sayac_${message.guild.id}`)
    db.delete(`sayacK_${message.guild.id}`)
    message.channel.send(` <:tik:792063150098612234> | **Sayaç başarıyla sıfırlandı.**`)
    return
  }
  
  if(args[0] === "ayarla") {
  if(isNaN(args[1])) {
    message.channel.send(`<:red:792071317427978251> | **Yanlış Kullanım Lütfen** ``ayarla`` veya ``sıfırla`` **yaz.** **Örnek: !sayaç ayarla** ``sayı`` ``#kanal```)
    return
  }
  
  if(!sayackanal) {
   await message.channel.send(`<:red:792071317427978251> | **Sayaç kanalını etiketlemelisin.**`)
  return
  }
  
  

  

 
        if(args[1] <= message.guild.memberCount) {
                message.channel.send(`<:carpi:778284231590936576> | **Sunucudaki kullanıcı sayısından** (${message.guild.memberCount}) **daha yüksek bir değer girmelisin.**`)
                return
        }
  
  db.set(`sayac_${message.guild.id}`, args[1])
  db.set(`sayacK_${message.guild.id}`, sayackanal.id)
  
  message.channel.send(`<:tik:792063150098612234> | **Sayaç** \`${args[1]}\`, **sayaç kanalı** ${sayackanal} **olarak ayarlandı.**`)
}
}
 
exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ['sayac'],
        permLevel: 0
}
 
exports.help = {
        name: 'sayaç',
        description: 'Sayacı ayarlar.',
        usage: 'sayaç <sayı> <#kanal> / sıfırla'
}