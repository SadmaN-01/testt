const Discord = require('discord.js');
const database = require('wio.db');

exports.run = async (client, message, args) => {//SadmaNN#1279

if(!message.member.hasPermission('MANAGE_MESSAGES')) return;
if(!args[0]) return message.channel.send('Bir rol belirlemeniz gerekiyor.');

if(args[0] === 'create') {
  
message.guild.roles.create({ data: { name: args.slice(1).join(' ') || 'muted', color: '#f4424b' }}).then(role => {
role.setPermissions(0);
message.channel.send("Rol başarıyla oluşturuldu. Ayarları şimdi uyguluyorum. Bu bir kaç saniye alabilir. Bitirdiğimde bir mesaj alacaksınız.").then(() => {
let arrayed = message.guild.channels.cache.filter(a => a.type === 'text').array();

var okay = 0;

for(const key in arrayed) {
arrayed[key].overwritePermissions([{
id: role.id,
deny: ['SEND_MESSAGES', 'ADD_REACTIONS'],
}], 'Muteli Rolü Güncellemesi '+message.author.tag);
okay++;
};
database.set(`carl-mute-role.${message.guild.id}`, role.id);
return message.channel.send("Başarılı! ile Rol **"+role.name+"** oluşturuldu <:tik:792063150098612234>");

});
});
};

if(!args[0] === 'create') {
let role = message.guild.roles.cache.get(args[0]) || message.mentions.roles.first() || message.guild.roles.cache.find(a => a.name.toLowerCase().includes(args.slice(0).join(' ').toLowerCase()))
if(!role) return message.channel.send('Role "'+args.slice(0).join(' ')+'" Bulunamadı.');

database.set(`carl-mute-role.${message.guild.id}`, role.id);
return message.channel.send(`**${role.name}**'yi muterole olarak ayarlayın`);
};

}; 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
 
exports.help = {
  name: 'muterole'
};// sadmann ♥