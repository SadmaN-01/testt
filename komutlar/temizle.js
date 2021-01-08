const Discord = require('discord.js');
exports.run = function(client, message, args) {
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Bu Komutu Kullanmak İçin İzniniz Yok!").then(m => m.delete(8000))
if(!args[0]) return message.channel.send("<:red:792071317427978251> Lütfen Silinicek Mesaj Miktarını Yazın.!").then(m => m.delete(8000))
message.channel.bulkDelete(args[0]).then(() => {
  const embed = new Discord.MessageEmbed()
       .setDescription(`Mesajlar Başarılı Bir Şekilde Yok Edildi.`)
        .setImage(`https://media1.tenor.com/images/a5200ff8939402e4e2bbda3a8107d2b1/tenor.gif?itemid=7559840`)
        .setFooter(`${message.author.username} Tarafından istendi.`)
        .setColor("YELLOW")
        .setTimestamp()
message.channel.send({ embed }).then(m => m.delete(8000))
})
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['temizle','sil'],
  aliases: ['patlat','sil'],
  permLevel: 2
};

exports.help = {
  name: 'temizle',
  time: '10 saniye',
  description: 'Belirlenen miktarda mesajı siler.',
  usage: 'temizle '
};
