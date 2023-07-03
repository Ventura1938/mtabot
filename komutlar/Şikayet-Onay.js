const Discord = require('discord.js');
const db = require('croxydb');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {

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
    .setDescription(`Şikayet Reddetmek İçin Sadece Şikayet Kategorisinde Kullanabilirsiniz!`)
    .setColor("BLUE")
  )

let id = message.mentions.users.first()
if(!args[0])
return message.channel.send(
  new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription("Şikayeti Onaylanacak Kişiyi Belirtiniz!")
  .setFooter(`${message.author.tag} Tarafından Kullanıldı.`, message.author.avatarURL())
  .setColor("BLUE")
)


message.guild.channels.cache.get(ayarlar.şikayetlog).send(`${id}`)
client.channels.cache.get(message.channel.id).delete()
return message.guild.channels.cache.get(ayarlar.şikayetlog).send(new Discord.MessageEmbed().setColor("ORANGE").setAuthor(`
  
Şikayetiniz ${message.author.username} Tarafından Onaylanmıştır!
`))
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'şikayetonayla',
  description: '.',
  usage: '.'
};
