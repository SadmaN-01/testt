const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('wio.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const ms = require("ms");
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const { GiveawaysManager } = require('discord-giveaways');
const ytdl = require('ytdl-core');

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "Angel Aktif");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

app.get("/foo", (req, res, next) => {
  const foo = JSON.parse(req.body.jsonString);
});
process.on("unhandledRejection", (reason, promise) => {
});

//---------------------------------KOMUTLAR---------------------------------\\

//-------------------------Değişen Oynuyor-------------------------\\

var oyun = [
`Destek sunucumuz saldırıya uğradı sunucumuza gelmek için !davet yazabilirsiniz`,
`Destek sunucumuz saldırıya uğradı sunucumuza gelmek için !davet yazabilirsiniz`,
`💪 7/24 Aktif!`,
`✨ Yardım almak için | !yardım`,
`🔔 Yenilenen Tasarımı İle`,
`⚡️ Botu eklemek için | !davet`,
`🎉 Çekiliş komutu eklendi | !çekiliş`,
`🌍 ${client.guilds.cache.size} Sunucuya Hizmet Veriyor`,
`👨 ${client.users.cache.size} Kullanıcı!`,
`#Bakım !`,
`!yardım 🔥 + !davet 🔥 + !otorol`,
]
client.on("ready", () => {
    setInterval(function() {
    
             var random = Math.floor(Math.random()*(oyun.length-0+1)+0);
             client.user.setActivity(oyun[random], {"type": "WATCHING"});
    
            }, 2 * 5000);
    })


//-------------------------Küfür Engel-------------------------\\

client.on('message', async message => {
  if(message.channel.type !== 'text') return;
  const küfür = await db.fetch(`küfür.${message.guild.id}`);
  if(!küfür) return;
  const blacklist = ["oç", "amk", "ananı sikiyim", "ananıskm", "piç", "amk", "amsk", "sikim", "sikiyim", "orospu çocuğu", "piç kurusu", "kahpe", "orospu", "sik", "yarrak", "amcık", "amık", "yarram", "sikimi ye", "mk", "mq", "aq", "amq"];
  const uyarılar = [
  '**<:red:792071317427978251> , Bu sunucuda küfür yasak!**'];
  let uyarımesaj = uyarılar[Math.floor(Math.random() * uyarılar.length)];
  let content = message.content.split(' ');
  
  content.forEach(kelime => {
  if(blacklist.some(küfür => küfür === kelime))  {
  if(message.member.permissions.has('BAN_MEMBERS')) return;
  message.delete();
  message.channel.send(new Discord.MessageEmbed().setTitle('').setDescription(`${message.author} ${uyarımesaj}`));
  }
  })
  
  });


//-------------------------Reklam Engel-------------------------\\

client.on('message', async message => {
    if(message.channel.type !== 'text') return;
  const reklam = await db.fetch(`reklam.${message.guild.id}`);
  if(!reklam) return;
  const blacklist = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg"];
  const uyarılar = [
  '**<:red:792071317427978251> , Bu sunucuda reklam yasak!**'];
  let uyarımesaj = uyarılar[Math.floor(Math.random() * uyarılar.length)];
  if(blacklist.some(a => message.content.includes(a)))  {
  if(message.member.permissions.has('BAN_MEMBERS')) return;
  message.delete();
  message.channel.send(new Discord.MessageEmbed().setTitle('').setDescription(`${message.author} ${uyarımesaj}`));
  }
  
  });


//-------------------------Etiket Prefix-------------------------\\

client.on('message', async msg => {
  let prefix = await db.fetch(`prefix.${msg.guild.id}`) || ayarlar.prefix 
  if(msg.content == `<@!787628753639571457>`) return msg.channel.send(`> **Angel | Prefix**\n\n> <:gsterge:794189208344199189> **Sanırım beni etiketlediniz.**\n > <:gsterge:794189208344199189> **Buyurun prefix(ön ek)im** \`${prefix}\``);
});


//-------------------------Güvenlik-------------------------\\


client.on('guildMemberAdd', member => {
     let kanal = db.fetch(`güvenlik.${member.guild.id}`)
     if(!kanal) return;

       let aylar = {
               "01": "Ocak",
               "02": "Şubat",
               "03": "Mart",
               "04": "Nisan",
               "05": "Mayıs",
               "06": "Haziran",
               "07": "Temmuz",
               "08": "Ağustos",
               "09": "Eylül",
               "10": "Ekim",
               "11": "Kasım",
               "12": "Aralık"
    }

  let bitiş = member.user.createdAt
      let günü = moment(new Date(bitiş).toISOString()).format('DD')
      let ayı = moment(new Date(bitiş).toISOString()).format('MM').replace("01", "Ocak").replace("02","Şubat").replace("03","Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10","Ekim").replace("11","Kasım").replace("12","Aralık").replace("13","CodAre")//codare
     let yılı =  moment(new Date(bitiş).toISOString()).format('YYYY')
     let saati = moment(new Date(bitiş).toISOString()).format('HH:mm')

let günay = `${günü} ${ayı} ${yılı} ${saati}`  

      let süre = member.user.createdAt
      let gün = moment(new Date(süre).toISOString()).format('DD')
      let hafta = moment(new Date(süre).toISOString()).format('WW')
      let ay = moment(new Date(süre).toISOString()).format('MM')
      let ayy = moment(new Date(süre).toISOString()).format('MM')
      let yıl =  moment(new Date(süre).toISOString()).format('YYYY')
     let yıl2 = moment(new Date().toISOString()).format('YYYY')

     let netyıl = yıl2 - yıl

     let created = ` ${netyıl} yıl  ${ay} ay ${hafta} hafta ${gün} gün önce`

     let kontrol;
     if(süre < 1296000000) kontrol = 'Bu hesap şüpheli!'
     if(süre > 1296000000) kontrol = 'Bu hesap güvenli!'

     let codare = new Discord.MessageEmbed()
     .setColor('YELLOW')
     .setTitle(`${member.user.username} Katıldı`)
     .setDescription('<@'+member.id+'> Adlı Kullanıcının Bilgileri : \n\n  Hesap oluşturulma tarihi **[' + created + ']** (`' + günay + '`) \n\n Hesap durumu : **' + kontrol + '**')//codare
     .setTimestamp()
     client.channels.cache.get(kanal).send(codare)
})


//-------------------------Otorol-------------------------\\

client.on("guildMemberAdd", async member => {
  
 let kanal = db.fetch(`judgekanal_${member.guild.id}`)   
 let rol = db.fetch(`judgerol_${member.guild.id}`)
 let mesaj = db.fetch(`judgemesaj_${member.guild.id}`)
  
if(!kanal) return
member.roles.add(rol)
  client.channels.cache.get(kanal).send(':loudspeaker: :inbox_tray: Otomatik Rol Verildi Seninle Beraber **`'+member.guild.memberCount+'`** Kişiyiz! <:tik:792063150098612234> Hoşgeldin! **`'+member.user.username+'`**')

});


//-------------------------Sayaç-------------------------\\

client.on("guildMemberAdd", async member => {
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal = await db.fetch(`sayacK_${member.guild.id}`);
  if (!sayac) return;
  if (member.guild.memberCount >= sayac) {
    member.guild.channels.cache
      .get(skanal)
      .send(
        `:GiriGif: **${
          member.user.tag
        }** sunucuya **katıldı**! \`${db.fetch(
          `sayac_${member.guild.id}`
        )}\` kişi olduk! <a:hawli:792064229586370590> Sayaç sıfırlandı.`
);
   db.delete(`sayac_${member.guild.id}`);
    db.delete(`sayacK_${member.guild.id}`);
    return;
  } else {
    member.guild.channels.cache
      .get(skanal)
      .send(
        `<a:girdim:792064949663825930> **${
          member.user.tag
        }** sunucuya **katıldı**! \`${db.fetch(
          `sayac_${member.guild.id}`
        )}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) -
          member.guild.memberCount}\` üye kaldı! Sunucumuz şuanda \`${
          member.guild.memberCount
        }\` kişi!`
);
}
});


client.on("guildMemberRemove", async member => {
  let sayac = await db.fetch(`sayac_${member.guild.id}`);
  let skanal = await db.fetch(`sayacK_${member.guild.id}`);
  if (!sayac) return;
  member.guild.channels.cache
    .get(skanal)
    .send(
      `<a:ciktim:792064949064433665> **${
        member.user.tag
      }** sunucudan **ayrıldı**! \`${db.fetch(
        `sayac_${member.guild.id}`
      )}\` üye olmamıza son \`${db.fetch(`sayac_${member.guild.id}`) -
        member.guild.memberCount}\` üye kaldı! Sunucumuz şuanda \`${
        member.guild.memberCount
      }\` kişi!`
);
});


//-------------------------Kick Koruma Sistemi-------------------------\\

client.on('guildMemberRemove', async (member) => {
const data = require('wio.db')

const da = await data.fetch(`sağ.tık.kick.${member.guild.id}`)
if(!da) return;
const kanal_id = await data.fetch(`sağ.tık.kick.kanal.${member.guild.id}`)
let kanal = client.channels.cache.get(kanal_id)

let logs = await member.guild.fetchAuditLogs({type: 'MEMBER_KICK'});
if(logs.entries.first().executor.bot) return;
let kişi = member.guild.members.cache.get(logs.entries.first().executor.id)
kişi.roles.cache.forEach(r => {
kişi.roles.remove(r.id) })

const emb = new Discord.MessageEmbed()
.setAuthor(kişi.user.username, kişi.user.avatarURL())
.setFooter(`${client.user.username}`)
.setTimestamp()

kanal.send(emb.setDescription(`${kişi.user.tag} isimli kişi birisini atmaya çalıştı, attı ama ben yetkilerini aldım.`))
member.guild.owner.send(emb.setDescription(`${kişi.user.tag} isimli kişi birisini atmaya çalıştı, attı ama ben yetkilerini aldım.`))
console.log('Koruma Sistemi Açık')
})


//-------------------------Sa-As Sistemi-------------------------\\

client.on("message", async msg => {


  const i = await db.fetch(`ssaass_${msg.guild.id}`);
    if (i == 'acik') {
      if (msg.content.toLowerCase() == 'sa' || msg.content.toLowerCase() == 's.a' || msg.content.toLowerCase() == 'selam' || msg.content.toLowerCase() == 'selamun aleyküm') {
          try {

                  return msg.reply('**Aleyküm Selam, Hoşgeldin :)** ')
          } catch(err) {
            console.log(err);
          }
      }
    }
    else if (i == 'kapali') {
    
    }
    if (!i) return;

    });


//-------------------------Gelişmiş Mute Sistemi-------------------------\\

client.on('roleDelete', async role => {
const data = await require('wio.db').fetch(`carl-mute-role.${role.guild.id}`);
if(data && data === role.id) require('wio.db').delete(`carl-mute-role.${role.guild.id}`); 
});


//-------------------------Fake Üye Sistemi-------------------------\\

client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`kanal_${member.guild.id}`)
  let rol = await db.fetch(`rol_${member.guild.id}`)
  let security = await db.fetch(`koruma_${member.guild.id}`)
  let user = client.users.cache.get(member.id);

  if (security == 'kapali') return;
  if (security == 'acik') {

  const zaman =  new Date().getTime() - user.createdAt.getTime()
  
  if (zaman < 259200000) { 
  
  client.channels.cache.get(kanal).send(`${member} isimli kullanıcı fake şüphesi ile karantinaya alındı!`)
  member.send("Fake üye olduğun için seni karantinaya aldım!").catch(() => console.log(`DM Kapalı.`))
  member.roles.add(rol)
  
  }
}
})


//-------------------------Çekiliş Sistemi-------------------------\\

//https://angelsadmanncekilis.glitch.me/


//-------------------------CapsLock Sistemi-------------------------\\

function percentage(partialValue, totalValue) {
   return (100 * partialValue) / totalValue;
} 

client.on('message', async(message) => {
if (!message.guild) return
let acikmi = await db.fetch(`${message.guild.id}.capsengel`)
if (!acikmi) return
if (message.author.bot) return
if (message.member.hasPermission("MANAGE_MESSAGES")) return
let matched = message.content.replace(/[^A-Z]/g, "").length
let yuzde = percentage(matched, message.content.length)
if (Math.round(yuzde) > acikmi.yuzde) {
  message.delete()
  message.author.send(new Discord.MessageEmbed().setColor("RED").setTimestamp().setFooter(`${message.guild.name}`,message.guild.iconURL({dynamic:true})).setAuthor("CapsLock Engelleme Sistemi").setDescription("**Uyarı! "+message.guild.name+" sunucusunda büyük harfle yazma engeli bulunmaktadır!**\nBu sebepten göndermiş olduğunuz mesaj silindi."))
  message.channel.send(new Discord.MessageEmbed().setColor("RED").setTimestamp().setFooter(`${message.guild.name}`,message.guild.iconURL({dynamic:true})).setAuthor("CapsLock Engelleme Sistemi",message.author.displayAvatarURL({dynamic:true})).setDescription(message.author.username+" - "+(message.member.nickname ? `${message.member.nickname} - ${message.author.id}` : message.author.id)+"\n**Uyarı!  Bu sunucuda büyük harfle yazma engeli bulunmaktadır!**\nBu sebepten göndermiş olduğunuz mesaj silindi.")).then(msg=>msg.delete({timeout:3000}))
}else{return}
})





client.login(process.env.token);