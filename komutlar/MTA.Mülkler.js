const Discord = require("discord.js")
const ms = require("ms")
const db = require("croxydb")
var mysql = require('mysql')

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',  
    database : 'sa'
  });

  connection.connect();

exports.run = async(client, message, args) => {

    connection.query({sql: 'SELECT COUNT(*) AS count FROM characters', timeout: 60000}, function (error, results, fields) {
        if (error && error.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
          throw new Error('tablo satırlarını saymak için çok uzun!');
        }
       
        if (error) {
          throw error;
        }
        db.set(`karakterler`, results[0].count)
    });

    connection.query({sql: 'SELECT COUNT(*) AS count FROM accounts', timeout: 60000}, function (error, results, fields) {
        if (error && error.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
          throw new Error('tablo satırlarını saymak için çok uzun!');
        }
       
        if (error) {
          throw error;
        }
        db.set(`hesaplar`, results[0].count)
    });

    connection.query({sql: 'SELECT COUNT(*) AS count FROM vehicles', timeout: 60000}, function (error, results, fields) {
        if (error && error.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
          throw new Error('tablo satırlarını saymak için çok uzun!');
        }
       
        if (error) {
          throw error;
        }
        db.set(`araçlar`, results[0].count)
    });

    connection.query({sql: 'SELECT COUNT(*) AS count FROM interiors', timeout: 60000}, function (error, results, fields) {
        if (error && error.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
          throw new Error('tablo satırlarını saymak için çok uzun!');
        }
       
        if (error) {
          throw error;
        }
        db.set(`mülkler`, results[0].count)
    });
      let k = db.fetch(`karakterler`)
      let a = db.fetch(`araçlar`)
      let m = db.fetch(`mülkler`)
      let h = db.fetch(`hesaplar`)

      const bilgiler = new Discord.MessageEmbed()
      .addField("Sunucudaki Toplam Kullanıcı Sayısı", ` \`\`\`${h}\`\`\` `, true)
      .addField("Sunucudaki Toplam Karakter Sayısı", ` \`\`\`${k}\`\`\` `, true)
      .addField("Sunucudaki Toplam Araç Sayısı", ` \`\`\`${a}\`\`\` `, true)
      .addField("Sunucudaki Toplam Mülk Sayısı", ` \`\`\`${m}\`\`\` `, true)
      message.channel.send(bilgiler)

    };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'istatistik',
  description: 'hatırlatma',
  usage: 'hatırlat 10m oyun oyna'
};
