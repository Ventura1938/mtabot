const Discord = require('discord.js');
const db = require('croxydb');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {


if(!message.member.roles.cache.has(ayarlar.şikayetyetki))
return message.channel.send(
    new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`Komutu Kullanabilmek İçin <@&${ayarlar.şikayetyetki}> Yetkisine Sahip Olman Gerekmektedir!`)
    .setColor("BLUE")
)
if(message.channel.parent.id !== ayarlar.şikayetkategori)
return message.channel.send(
  new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription(`Admin-Log Komutunu Kullanabilmek İçin Sadece **Şikayet** Kategorisinde Kullanabilirsiniz!`)
  .setColor("BLUE")
)

const ceza = args[0]
if(!ceza)
return message.channel.send(
  new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription(`Cezalandırılacak Oyuncunun İsim Ve Soyismini Belirtiniz
  Örnek:**Ahmet_Yılmaz**`)
  .setColor("BLUE")
)
const süre = args[1]
if(!süre)
return message.channel.send(
  new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription(`Cezalandırılacak Olan Oyuncunun **Ceza Süresini** Belirtiniz.`)
  .setColor("BLUE")
)
const sebep = args[2]
if(!sebep)
return message.channel.send(
  new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription(`Cezalandırılacak Oyuncunun **Ceza Sebebini** Belirtiniz.`)
  .setColor("BLUE")
)
const link = args[3]
if(!link)
return message.channel.send(
  new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription(`Ceza Kanıtını Belirtiniz.**(Link Halinde)**`)
  .setColor("BLUE")
)
const onay = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`Başarıyla Admin Log Gönderildi.Şikayeti Onaylamak İçin **.şikayetonayla** Yazmanız Yeterli Olucaktır.`)
    .setColor("BLUE")
    message.channel.send(onay)

const adminlog = new Discord.MessageEmbed()
    .setTitle(`${message.guild.name} Admin-Log`)
    .setDescription(`
    **Cezalandıran Yetkili:** ${message.author}
    **Cezalandırılan Oyuncu:** ${ceza}
    **Ceza Süresi:** ${süre}
    **Ceza Sebebi:** ${sebep}`)
    .setImage(link)
    .setColor("BLUE")
    .setTimestamp()
    message.delete({timeout: 2500})
client.channels.cache.get(ayarlar.adminlogkanal).send(adminlog)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'adminlog',
  description: '.',
  usage: '.'
};
