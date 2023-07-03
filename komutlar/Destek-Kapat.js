const Discord = require('discord.js');
const db = require('croxydb');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  if(!message.member.roles.cache.has(ayarlar.destekyetki))
  return message.channel.send(
      new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setDescription(`Komutu Kullanabilmek İçin <@&${ayarlar.destekyetki}> Yetkisine Sahip Olman Gerekmektedir!`)
      .setColor("BLUE")
  )
  if(message.channel.parent.id !== ayarlar.destekkategori)
  return message.channel.send(
    new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`Desteği Kapatmak İçin Sadece **Destek** Kategorisinde Kullanabilirsiniz!`)
    .setColor("BLUE")
  )

let id = message.mentions.users.first()
if(!args[0])
return message.channel.send(
  new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription("Desteği'ni Kapatmak İstediğiniz Kullanıcıyı Belirtiniz!")
  .setColor("BLUE")
)


client.channels.cache.get(message.channel.id).delete()
message.guild.channels.cache.get(ayarlar.desteklogkanal).send(`${id}`)
    return message.guild.channels.cache.get(ayarlar.desteklogkanal).send(new Discord.MessageEmbed().setColor("BLUE").setAuthor(`
    Desteğiniz ${message.author.tag} Tarafından İlgilenilmiştir!`))


};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'destek-kapat',
  description: '.',
  usage: '.'
};
