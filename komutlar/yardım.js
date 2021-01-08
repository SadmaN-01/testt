const Discord = require('discord.js');
const db = require('wio.db');
const ayarlar = require('../ayarlar.json');
exports.run = (client, message, args) => {
let prefix = db.fetch(`prefix.${message.guild.id}`) || ayarlar.prefix
const embedyardim = new Discord.MessageEmbed()
    .setColor('YELLOW')
    .setAuthor(`${client.user.username} `, client.user.avatarURL()) 
      .setDescription('**!Yardım** ile yardım alabilirsiniz.\n Örnek komut kullanımı: **!küfüraç**.\nBotu davet etmek için **!davet**')
      .addField('** !Komutlar (8)**', `Herkesin kullanabileceği standart komutlar. \n` +  '`botbilgi` `davet` `gold` `sunucupp` `profil` `ping` `yılbaşı` `avatar`')
      .addField('** !Eğlence (8)**',   `Herkes için kullanılabilecek eğlence komutları. \n` + '`kralol` `düello` `türk` `aşk` `tokat` `espiri` `efkarölç` `öp`')
      .addField('** !Moderasyon (12)**',`Yetkililer için moderasyon komutları bölüm . \n` +  '`küfür` `reklam` `çekiliş-sistemi` `kick` `güvenlik` `otorol` `sayaç` `sağ-tık-kick-koruması` `sa-as` `mute` `koruma-üye` `tempban`')
      .addField('** !Moderasyon2 (12)**',`Yetkililer için moderasyon komutları bölüm . \n` + '`sil`,`reklam-taraması`,`resimli hg-bb`,`sunucutanıt`,`oto bot silici`,`ultra sohbet temizleyici`,`slowmode`,`tag Sistemi`,`rol-sistemi`,`geçici-oda`,`kayıt sistemi`,`!erkek kayıt`,`emojiler`')
    .setFooter(`© ${client.user.username} ` , client.user.avatarURL())
    .setTimestamp()
    message.channel.send(embedyardim).catch()
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["h", "halp", "help", 'y', 'yadrım'],
    permLevel: 0
};

exports.help = {
    name: 'yardım',
      category: 'Yardım',
      description: 'Yardım kategorilerini gösteir.',
};