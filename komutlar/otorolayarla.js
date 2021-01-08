const Discord = require('discord.js');
const db = require('wio.db') 
const ayarlar = require('../ayarlar.json');
exports.run = (client, message, args) => {

if(!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send('<:red:792071317427978251> bu özelliği kullanabilmek için `Yönetici` yetkisine sahip olmalısınız')

let kanal = message.mentions.channels.first()
let rol = message.mentions.roles.first()
if(!rol) return message.reply('<:red:792071317427978251> Örnek kullanım: **!otorol @rol #kanal** veya **!otorolkapat** ')
if(!kanal) return message.reply('<:red:792071317427978251> Ayarlamam İçin Bir kanal Etiketlemeilisin.')

   
message.reply(`<:gsterge:794189208344199189> Otorol aktif edildi '${rol}' Olarak Güncelledim! Kayıt Kanalını ise '${kanal}' olarak güncelledim.`)
   
db.set(`judgekanal_${message.guild.id}`, kanal.id)   
db.set(`judgerol_${message.guild.id}` , rol.id)
 };

exports.conf = { 
enabled: true,
guildOnly: false,
 aliases: [], 
permLevel: 0
}

exports.help = {
 name: 'otorol', 
description: 'taslak',
 usage: 'otorol'
};