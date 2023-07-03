const Discord = require("discord.js")
const ms = require("ms")
const db = require("croxydb")
var mysql = require('mysql')

exports.run = async(client, message, args) => {
  const connection = client.conn;
  if(!connection) return message.channel.send("Mysql bağlantısı kurulamadı.");
  connection.query('SELECT * FROM factions ORDER BY level DESC', function (error, results, fields) {
    if (error && error.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
      throw new Error('tablo satırlarını saymak için çok uzun!');
    }     
    if(error) {
      throw error;
    }
    const embed = new Discord.MessageEmbed()
    .addField("\`[ Faction Name ]\`", results.map(({ name }) => `${name}`).join('\n'), true)
    .addField("\`[ Level ]\`", results.map(({ level}) => `${level == 0 ? "" : level}`).join('\n'), true)
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
  name: 'factions',
  description: 'hatırlatma',
  usage: 'hatırlat 10m oyun oyna'
};
