const Discord = require("discord.js");
const db = require('wio.db');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;

exports.run = (client, message) => {
let prefix = db.fetch(`prefix.${message.guild.id}`) || ayarlar.prefix


let motion = new Discord.MessageEmbed()
  
    .setThumbnail(message.author.displayAvatarURL(({dynamic: true})))
    .setAuthor(client.user.username, client.user.avatarURL)
    .addField(
      "Veriler", 
      `> Toplam sunucu: **${
        client.guilds.cache.size
      }** \n> Toplam kullanıcı: **${client.guilds.cache
        .reduce((a, b) => a + b.memberCount, 0)
        .toLocaleString()}** \n> Toplam kanal: **${
        client.channels.cache.size
      }**`
    ) 
    .addField(
      "Bot Geliştiricisi",
      `> Bot geliştiricisi ➡ <@787225094321078283> `
    ) 
    .addField(
      "Sürümler",
      `> Discord.js sürümü: **v${Discord.version}** \n> Node.js sürümü: **${process.version}**`
    ) 
    .addField(
      "Gecikmeler",
      `> Bot pingi: **${
        client.ws.ping
      }** \n> Mesaj gecikmesi: **${new Date().getTime() -
        message.createdTimestamp}**`
    )

    
    .setTimestamp()
    .setColor('#fffa00');
  message.channel.send(motion);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  permLevel: 0,
  aliases: ["botbilgi", "i", "stats"]
};

exports.help = {
  name: "istatistik",
  description: "Türkiyenin Saatini Gösterir ",
  usage: "botbilgi"
};