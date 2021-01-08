const Discord = require('discord.js');
const database = require('wio.db');

exports.run = async (client, message, args) => {

if(!message.member.hasPermission('MANAGE_MESSAGES')) return;

const muteRoleFetch = await database.fetch(`carl-mute-role.${message.guild.id}`);
if(!muteRoleFetch) return message.channel.send('**Bu sunucunun Mute rolü yok, rolü ayarlamak için ``!muterole`` veyada oluşturmak için ``!muterole create rolisim`` kullanın.**');

if(!args[0]) return message.channel.send(`\`\`\`${message.content.split('unmute')[0]}unmute  ``kişi```);

let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.guild.members.cache.find(a => message.guild.members.cache.get(a.user.id).nickname && a.nickname.toLowerCase().includes(args[0].toLowerCase())) || message.guild.members.cache.find(a => a.user.username.toLowerCase().includes(args[0].toLowerCase()))
if(!member) return message.channel.send(`Kullanıcı "${args[0]}" Bulunamadı`);
member.roles.remove(muteRoleFetch).then(() => {
return message.channel.send('Başarı ile **'+member.user.tag+'** mutesi kaldırıldı.');
})
}; 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
 
exports.help = {
  name: 'unmute'
};