const Discord = require('discord.js');
 exports.run = function(client, message, args)
 { let user = message.mentions.users.first(); 
if (message.mentions.users.size < 1) 
return message.reply('**Kimi Tokatlayacam Reis Etiketlede Vurayım Ağzının Ortasına **').catch(console.error); 
  const DarkCode =new Discord.MessageEmbed() 
    .setColor('#fffa00')
.setDescription(message.author.username + ` ${user}` + '** adlı kişiyi, Tokatladı! :hand_splayed: **') 
.setImage('https://j.gifs.com/KdXVEQ.gif') .setFooter("Angel İyi Eğlenceler Diler...", client.user.avatarURL) 
return message.channel.send(DarkCode); }; 

exports.conf = { 
enabled: true,
guildOnly: true, 
aliases: ['tokat-at','tokatat'],
permLevel: 0 };

exports.help = {
name: 'tokat', 
description: 'Belirtilen kişiyi, Tokatlar!', 
usage: 'tokat' 
};