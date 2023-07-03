const Discord = require('discord.js');
const db = require('croxydb');
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {

  if(message.channel.id !== ayarlar.şikayetkanal)
  return message.channel.send(
      new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setDescription(`Şikayet Açmak İçin <#${ayarlar.şikayetkanal}> Adlı Kanalda Kullanabilirsin!`)
  )

  if (message.guild.channels.cache.find((c) => c.name === `şikayet-${message.author.id}`)) return message.channel.send(
    new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setColor("BLUE")
    .setDescription(`Şuanda Açık Bir Şikayet Talebiniz Bulunmaktadır.`));
    message.delete({timeout: 2000})
      message.guild.channels.create(`şikayet-${message.author.id}`, {type: 'text'}).then(c => {
      c.setParent(ayarlar.şikayetaaçılacakkategori)

      let role2 = message.guild.roles.cache.find(r => r.name === "@everyone");
      
      c.createOverwrite(role2, {
          SEND_MESSAGES: false,
          READ_MESSAGES: false,
      VIEW_CHANNEL: false
      });
    c.createOverwrite(message.author, {
        SEND_MESSAGES: true,
        READ_MESSAGES: true,
      VIEW_CHANNEL: true
    });
    c.send( new Discord.MessageEmbed()
    .setAuthor(`Şablona Göre Doldurunuz Doldurmadığınız Taktirde Şikayetiniz Reddedilecektir!`)
    .setThumbnail(ayarlar.resim)
    .setDescription(`
    Oyun İçi Karakter Adınız:
    Şikayet Ettiğiniz Kullanıcının Oyun İçi Karakter Adı:
    İhlal Ettiği Madde:
    Olay Tarihi:
    Olayı Kısaca Anlatınız:
    Kanıtlarınız:`))
    c.send(`${message.author}, <@&${ayarlar.şikayetyetki}> Şikayetiniz İle İlgilenecektir.`)
  })
};
exports.conf = {
enabled: true, 
guildOnly: false,
aliases: [], 
permLevel: 0 
};

exports.help = {
name: 'şikayet-aç',
description: '.',
usage: '.'
}