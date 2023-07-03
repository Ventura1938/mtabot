const Discord = require("discord.js")
const ms = require("ms")
const db = require("croxydb")
var mysql = require('mysql')

exports.run = async(client, message, args) => {
  const connection = client.conn;
  if(!connection) return message.channel.send("Mysql bağlantısı kurulamadı.");
  /*if(message.channel.id !== ayarlar.doğrulama)
  return message.channel.send(
      new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setDescription(`Discord Doğrulamayı Sadece <#${ayarlar.karaktersildirmekanal}> Adlı Kanalda Kullanabilirsin!`)
  )*/
  let kod = args[0];
  if(!kod) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL()).setDescription(`Oyun İçi Verilen Kodu Giriniz`).setColor("#3498db"))
  connection.query('SELECT * FROM characters', function (error, results, fields) {
    if (error && error.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
      throw new Error('tablo satırlarını saymak için çok uzun!');
    }     
    if(error) {
      throw error;
    }
    if(!results) return;
    if(!results.some(({ discordid }) => discordid == kod)) return message.channel.send("bu kod doğrulama sisteminde yer almıyor.")

    let rol = "1043540920227872828";
    let rol2 = "1043540881287950446";
    const result = results.find(({ discordid }) => discordid == kod);
    if(result.discordonay == 1) return message.channel.send(new Discord.MessageEmbed().setAuthor(message.author.username, message.author.displayAvatarURL()).setDescription(`Daha Önce Bu Doğrulama Kodu Kullanılmış`).setColor("#3498db"))
    var sql = `UPDATE characters SET discordonay='1' WHERE id='${result.id}'`;
    connection.query(sql, function (err, asd) {
      if (err) throw err;
      message.member.setNickname(result.charactername,`Başarılı Bir Şekilde Eşleştirildi. ${result.charactername} İsimli Karakteri İle Kayıt Oldunuz!`)
      message.member.roles.add(rol);
      message.member.roles.remove(rol2);
    });
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'doğrula',
  description: 'hatırlatma',
  usage: 'hatırlat 10m oyun oyna'
};