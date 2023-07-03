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
  .setDescription("Şikayeti Reddedilecek Kişiyi Belirtiniz!")
  .setFooter(`${message.author.tag} Tarafından Kullanıldı.`, message.author.avatarURL())
  .setColor("BLUE")
)

const red = args.slice(1).join(' ')
if(!red)
return message.channel.send(
  new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription("Şikayet Reddedilme Sebebini Belirtiniz!")
  .setFooter(`${message.author.tag} Tarafından Kullanıldı.`, message.author.avatarURL())
  .setColor("BLUE")
)


const şikayet = new Discord.MessageEmbed()
    .setTitle(`${message.guild.name} Şikayet Log`)
    .setDescription(`
    **Şikayeti Reddeten Yetkili:** <@${message.author.id}>
    
    **Reddedilme Sebebi:** ${red}`)
    .setColor("BLUE")
    client.users.cache.get(id.id).send(şikayet)
    client.channels.cache.get(message.channel.id).delete()
message.guild.channels.cache.get(ayarlar.şikayetlog).send(`${id}`)
return message.guild.channels.cache.get(ayarlar.şikayetlog).send(new Discord.MessageEmbed().setColor("ORANGE").setAuthor(`
  
Şikayetiniz ${message.author.tag} Tarafından Reddedilmiştir!
Reddedilme Sebebi Özel Mesaj Şeklinde Bildirilmiştir.`))


};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'şikayetreddet',
  description: '.',
  usage: '.'
};
