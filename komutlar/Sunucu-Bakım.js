const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
exports.run = (client, message, args) => {

    if(!message.member.roles.cache.has(ayarlar.aktifbakım))
return message.channel.send(
    new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`Bakım Komutunu Kullanabilmek İçin <@&${ayarlar.aktifbakım}> Yetkisine Sahip Olman Gerekmektedir!`)
    .setColor("BLUE")
    .setTimestamp()
)
const bakım = args.slice(0).join(' ')
if(!bakım)
return message.channel.send(
  new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setDescription(`Sunucunuzun Bakım Sebebini Belirtiniz`)
  .setColor(`BLUE`)
)
    message.channel.send(`@everyone **&** @here`)
    const Reapers = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setTitle("x")
    .setDescription(`Sunucumuz Şuanda **${bakım}** Sebebiyle Bakıma Girmiştir.En Kısa Sürede Sunucumuz Bakımdan Çıktığında Sizlere Haber Verilecektir!
    
    Sunucu İP: **mtasa://217.195.197.142:22003**
    Discord:https://discord.gg/CVUaMjwUHs`)
    .setImage("https://cdn.discordapp.com/attachments/1043535292608561182/1043538901945565194/giphy.gif")
    .setThumbnail(ayarlar.resim)
    message.channel.send(Reapers)
}
module.exports.conf = {
    aliases: [],
    permLevel: 2,
    enabled: true,
    guildOnly: true,
    kategori: "moderasyon"
  };
  module.exports.help = {
    name: "bakım",
    description: ".",
    usage: "."
  };