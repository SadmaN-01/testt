const Discord = require('discord.js');
const database = require('wio.db');
const ms = require('ms');

exports.run = async (client, message, args) => {// SadmaNN#1279
if(!message.member.hasPermission('MANAGE_MESSAGES')) return;

const muteRoleFetch = await database.fetch(`carl-mute-role.${message.guild.id}`);
if(!muteRoleFetch) return message.channel.send('**Bu sunucunun Mute rolü yok, rolü ayarlamak için ``!muterole`` veyada oluşturmak için ``!muterole create rolisim`` kullanın.**');

if(!args[0]) return message.channel.send(`${message.content.split('mute')[0]}mute  ``kişi`` ``süresi```);

let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first() || message.guild.members.cache.find(a => message.guild.members.cache.get(a.user.id).nickname && a.nickname.toLowerCase().includes(args[0].toLowerCase())) || message.guild.members.cache.find(a => a.user.username.toLowerCase().includes(args[0].toLowerCase()))
if(!member) return message.channel.send(`Kullanıcı "${args[0]}" Bulunamadı`);

let infinity = false;
if(args[1]) {
infinity = args.find(a => a.endsWith('m') || a.endsWith('h') || a.endsWith('s') || a.endsWith('d') || a.endsWith('w') || a.endsWith('y'));
};

var sayı = 0;
let zaman;
let gercek;
args.forEach(s => {
sayı++
if(s === infinity) {
gercek = sayı;
zaman = args[sayı-1];
};
});
args[gercek-1] = '';
args = args.filter(a => a !== '');

let reason;
if(!args[1]) reason = '**Sebep: Hiçbir Sebep Yok**';
if(args[1]) reason = '**Sebep:** '+args.slice(1).join(' ');

if(!zaman) {
member.roles.add(muteRoleFetch).then(() => {
return message.channel.send(`**${member.user.tag}** Başarı ile Susturuldu Süresiz Susturuldu {reason}`);
});
} else {

let zamann = zaman.replace('w', ' week').replace('d', ' Gün').replace('s', ' Saniye').replace('m', ' Dakika').replace('h', ' Saat');
if(zamann.includes('second') && zamann.split(' ')[0] == 1) zamann = 'now'
if(zamann.includes('second') && zamann.split(' ')[0] > 1) zamann = zamann.split(' ')[0]+' seconds';
if(zamann.includes('minute') && zamann.split(' ')[0] > 1) zamann = zamann.split(' ')[0]+' minutes';
if(zamann.includes('hour') && zamann.split(' ')[0] > 1) zamann = zamann.split(' ')[0]+' hours';
if(zamann.includes('day') && zamann.split(' ')[0] > 1) zamann = zamann.split(' ')[0]+' days';
if(zamann.includes('week') && zamann.split(' ')[0] > 1) zamann = zamann.split(' ')[0]+' weeks';
if(ms(zaman) >= 2147483647) return message.channel.send('24 günden fazla birini muteleyemezsin. <:red:792071317427978251>');// ellemeyin arkadaslar.

member.roles.add(muteRoleFetch).then(() => {
message.channel.send(`**${member.user.tag}** Başarı ile Susturuldu ${zamann} için. ${reason}`);
setTimeout(() => {
if(member.roles.has(muteRoleFetch)) {
member.roles.remove(muteRoleFetch);
};
}, require('ms')(zaman))
return;
});
}

}; 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
 
exports.help = {
  name: 'mute'
};// sadmann ♥