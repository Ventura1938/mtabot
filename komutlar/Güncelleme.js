const Discord = require('discord.js');
const db = require('croxydb');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {


if(!message.member.roles.cache.has(ayarlar.developer))
return message.channel.send(
    new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`Komutu Kullanabilmek İçin <@&${ayarlar.developer}> Yetkisine Sahip Olman Gerekmektedir!`)
    .setColor("BLUE")
)

const ceza = args[0]
if(!ceza)
return message.channel.send(
  new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription(`Güncelleme Başlığını Belirtiniz`)
  .setColor("BLUE")
)

const link = args[1]
if(!link)
return message.channel.send(
  new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription(`Güncelleme Resiminin Linkini Belirtiniz`)
  .setColor("BLUE")
)

const süre = args.slice(2).join(' ')
if(!süre)
return message.channel.send(
  new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription(`Güncelleme Açıklamasını Belirtiniz`)
  .setColor("BLUE")
)


const adminlog = new Discord.MessageEmbed()
    .setTitle(`${ceza}`)
    .setDescription(`${süre}`)
    .setImage(link)
    .setColor("BLUE")
    .setTimestamp()
    client.channels.cache.get(ayarlar.güncellemelogkanal).send(adminlog)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'güncelleme',
  description: '.',
  usage: '.'
};
