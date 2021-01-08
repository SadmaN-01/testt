const Discord = require ("discord.js");
const db = require('wio.db');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;

exports.run = (client, message) => {
  let prefix = db.fetch(`prefix.${message.guild.id}`) || ayarlar.prefix
    if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor('#fffa00')
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
const EmbedCrewCode = new Discord.MessageEmbed()

.setColor('#fffa00')
.setTitle("**•Davet**")
.setThumbnail("")
.setDescription(`
• Alttaki linklerden bot ile ilgili linklere **ulaşabilirsiniz.** Herhangi bir **bug/hata** bulursanız [sunucumuza gelip](https://discord.gg/PQ7JTR5bs9) bizle iletişime geçebilirsiniz.

• Sunucuma nasıl eklerim?
Sunucuna eklemek istiyorsan [buraya tıklayarak](https://discord.com/oauth2/authorize?client_id=787628753639571457&scope=bot&permissions=8) ekleyebilirsin.

• Destek Sunucumuz
[Destek Sunucusuna](https://discord.gg/PQ7JTR5bs9) katılarak sizde güzel sohbetlere katılabilirsiniz!

© 2020 Angel | Tüm hakları saklıdır.
`)
 

return message.channel.send(EmbedCrewCode)
.then; 

};
exports.conf = {
    enabled: true, 
    guildOnly: false, 
    aliases: [], 
    permLevel: 0 
};
  
  exports.help = {
    name: 'davet', 
    description: 'davet!',
    usage: 'davet'
};