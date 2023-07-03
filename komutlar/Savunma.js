const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('croxydb');

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
    .setDescription(`Savunma Komutunu Sadece **Şikayet** Kategorisinde Kullanabilirsiniz!`)
    .setColor("BLUE")
  )
  let savunma = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
  if(!savunma)
  return message.channel.send(
    new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`Savunma Yapmasını İstediğiniz Kullanıcıyı Etiketleyiniz!`)
    .setColor("BLUE")
  )
  const onay = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`Savunma Yapmasını İstediğiniz Kullanıcı ${savunma} Onaylıyorsanız 30 Saniye İçinde **Evet** Yazınız.`)
    .setColor("BLUE")
    message.channel.send(onay)

  message.channel.awaitMessages(response => response.content === 'evet', {
    max: 1,
    time: 30000,
    errors: ['time'],
  })
.then((collected) => {
  const onay2 = new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription(`Başarılı Bir Şekilde ${savunma} Adlı Kullanıcının Savunma Yapması İçin Kanalı Görüntüleme İzni Verildi!`)
  .setColor("BLUE")
  message.channel.send(onay2)
  //let semoadam2 = message.guild.members.cache(semoadams)
        message.channel.updateOverwrite(savunma, {
          'VIEW_CHANNEL': true ,
          'SEND_MESSAGES': true ,
          'READ_MESSAGE_HISTORY': true
      })
    })
  }
  exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    kategori: "Yetkili Komutları",
    permLevel: 0
  };
  exports.help = {
    name: "savunma",
    description: ".",
    usage: "."
  };