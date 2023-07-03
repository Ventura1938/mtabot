const Discord = require('discord.js');
const db = require('croxydb');
const ayarlar = require('../ayarlar.json');

exports.run = async(client, message, args) => {

  if(message.channel.id !== ayarlar.destekkanal)
  return message.channel.send(
      new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setDescription(`Destek Açmak İçin <#${ayarlar.destekkanal}> Adlı Kanalda Kullanabilirsin!`)
  )
  if (message.guild.channels.cache.find((c) => c.name === `destek-${message.author.id}`)) return message.channel.send(
    new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setColor("BLUE")
    .setDescription(`Şuanda Açık Bir Destek Talebiniz Bulunmaktadır.`));
message.delete({timeout:1000})
      message.guild.channels.create(`destek-${message.author.id}`, {type: 'text'}).then(c => {
      c.setParent(ayarlar.destekaaçılacakkategori)

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
    .setThumbnail(ayarlar.resim)
    .setDescription(`Merhaba ${message.author.username.toLowerCase()} Sorunlarınızı Açıklayıcı Bir Şekilde Belirtiniz.!`))
    c.send(`${message.author}, <@&${ayarlar.destekyetki}> Şikayetiniz İle İlgilenecektir.`)
  })
};
exports.conf = {
enabled: true, 
guildOnly: false,
aliases: [], 
permLevel: 0 
};

exports.help = {
name: 'destek-aç',
description: '.',
usage: '.'
}