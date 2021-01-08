const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
exports.run = (client, message, params) => {
    if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor("YELLOW")
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('**Eğlence Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
      const sunucubilgi = new Discord.MessageEmbed()
    .setAuthor(message.author.username + ' Artık Kral Oldun!!!')
    .setColor('#fffa00')
    .setTimestamp()
    .setDescription('')
    .setURL('https://discord.gg/7kY7EabUqM')
        .setImage(`https://media.tenor.com/images/9718e3f77ed658171e30d0c5aeadd97b/tenor.gif`)
    return message.channel.send(sunucubilgi);
    }
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'kralol',
  description: 'kralol',
  usage: 'kralol'
};