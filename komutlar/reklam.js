const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;
const data = require('wio.db');

exports.run = async (client, message, args) => {
  const nn = new Discord.MessageEmbed().setThumbnail();
  if(!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send(nn.setImage('https://media.giphy.com/media/Y41ynggo39awUmeg70/giphy.gif').setTitle(`Bir hata oldu!`).setThumbnail(message.author.avatarURL({dynamic: true})).setDescription(`**•** \`${ayarlar.prefix}reklam kısıt / kapat\` **kullanmak için,** \`Yönetici\` **yetkisine sahip olman gerekiyor.**`)).then(a => a.delete({timeout: 10000}));

if(!args[0]) return message.channel.send(nn.setColor('#fffa00').setTitle('Bir hata oldu!').setDescription(`Reklam kısıtmak istersen **${ayarlar.prefix}reklam kısıt** yazmalısın.`))
if(args[0] === 'kısıt') {
data.set(`reklam.${message.guild.id}`, true);
return message.channel.send(nn.setTitle(`İşte bu kadar!`).setColor('#fffa00').setDescription('Reklam kısıtlaması başarıyla açıldı.')).then(a => a.delete({timeout: 10000}));
} else if(args[0] === 'kapat') {
data.delete(`reklam.${message.guild.id}`);
return message.channel.send(nn.setTitle('İşte bu kadar!').setColor('#fffa00').setDescription('Reklam kısıtlaması başarıyla kapatıldı.')).then(a => a.delete({timeout: 10000}));
}
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'reklam'
};