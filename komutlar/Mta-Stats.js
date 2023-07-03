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

/*if(!args[0])
return message.channel.send(
    new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription("as")
)*/

    /*connection.query({sql: 'SELECT COUNT(*) AS count FROM characters', timeout: 60000}, function (error, results, fields) {
        if (error && error.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
          throw new Error('tablo satırlarını saymak için çok uzun!');
        }
       
        if (error) {
          throw error;
        }
        db.set(`karakterler`, results[0].count)
    });*/

       let karakter = args[0];
      if(!karakter) return message.channel.send(
        new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription(`İstediğiniz Oyuncunun Stats'ını Görüntüleyebilmek İçin 
        Örnek:**Reapers_Beta** Olarak Yazmanız Gerekmektedir!`)
        .setColor("#3498db")
      )

      connection.query({sql: 'SELECT * FROM characters', timeout: 60000}, function (error, results, fields) {
        if (error && error.code === 'PROTOCOL_SEQUENCE_TIMEOUT') {
          throw new Error('tablo satırlarını saymak için çok uzun!');
        }
       
        if (error) {
          throw error;
        }

        const a = results.find(({charactername}) => charactername === `${karakter}`)
        if (a ) {
          message.channel.send(
            new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setColor("#3498db")
            .addField("Karakter Adı:", ` \`\`\`${karakter} \`\`\``, true)
            .addField("Cüzdan Para:", ` \`\`\`${a.money} \`\`\``, true)
            .addField("Banka Para:", ` \`\`\`${a.bankmoney} \`\`\``, true)
            .addField("Karakter Level:", ` \`\`\`${a.level} \`\`\``, true)
            .addField("Oynama Saati:", ` \`\`\`${a.hoursplayed} \`\`\``, true)
            .addField("Yaş:", ` \`\`\`${a.age} \`\`\``, true)
            .addField("Sağlık:", ` \`\`\`${a.health} \`\`\``, true)
            .addField("Açlık:", ` \`\`\`${a.hunger} \`\`\``, true)
            .addField("Susuzluk:", ` \`\`\`${a.thirst} \`\`\``, true)
            .addField("Karakter Kuruluş Tarihi:", ` \`\`\`${a.creationdate} \`\`\``, true)
          )
      }
     });
    };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: 'stats',
  description: 'hatırlatma',
  usage: 'hatırlat 10m oyun oyna'
};