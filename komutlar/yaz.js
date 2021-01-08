const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')
exports.run = (client, message, args) => {

  let yazıİçeriği = args.slice().join(' ')
  const Mesaj = new MessageEmbed()
    .setColor('RANDOM')
    .setDescription(yazıİçeriği)

message.channel.send(Mesaj)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['emed', 'embedyazı'],
  permLevel: 4
}

exports.help = {
  name: 'embedyaz'
}