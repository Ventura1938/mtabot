const Discord = require("discord.js")
const ms = require("ms")
const db = require("croxydb")
var mysql = require('mysql')

exports.run = async(client, message, args) => {
  const connection = client.conn;
  if(!connection) return message.channel.send("Mysql bağlantısı kurulamadı.");
  connection.query('SELECT * FROM characters ORDER BY hoursplayed DESC', function (error, results, fields) {
    if (error && error.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
      throw new Error('tablo satırlarını saymak için çok uzun!');
    }     
    if(error) {
      throw error;
    }

    const embed = new Discord.MessageEmbed()
    .setAuthor("[TOP 10 Saat Listesi ]", message.guild.iconURL())
    .addField("\`[ Oyuncu İsmi ]\`", results.slice(0,10).map(({ charactername }) => `**${charactername}**`).join('\n'), true)
    .addField("\`[ Saat ]\`", results.slice(0,10).map(({ hoursplayed}) => `${hoursplayed == 0 ? "" : hoursplayed}`).join('\n'), true)
    message.channel.send(embed)
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'top10-saat',
  description: 'hatırlatma',
  usage: 'hatırlat 10m oyun oyna'
};
