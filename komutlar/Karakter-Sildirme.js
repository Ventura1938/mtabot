const Discord = require ('discord.js');
const db = require ('croxydb');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
    if(message.channel.id !== ayarlar.karaktersildirmekanal)
    return message.channel.send(
        new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription(`Karakter Sildirmek İçin <#${ayarlar.karaktersildirmekanal}> Adlı Kanalda Kullanabilirsin!`)
    )

    const isim = args[0]
    if(!isim)
    return message.channel.send(
        new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription(`İc İsim Ve Soyisminizi Belirtiniz.
        Örnek: **Ahmet_Yılmaz**`)
        .setColor("BLUE")
    )
    const serial = args[1]
    if(!serial)
    return message.channel.send(
        new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription(`Sildirecek Olduğunuz Karakter Serialinizi Belirtiniz!
        Örnek: **Ahmet Yılmaz 67234893992982**`)
        .setColor("BLUE")
    )
    const sildirme = new Discord.MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription(`${message.author} Başarılı Bir Şekilde Karakter Sildirme Başvurusu Atıldı!`)
    .setColor("BLUE")
    message.channel.send(sildirme).then(m => m.delete({timeout:10000}))

    const karakter = new Discord.MessageEmbed()
    .setTitle(`Yeni Bir Karakter Sildirme Başvurusu Atıldı!`)
    .setDescription(`
    **Karakter Başvurusu Yapan Kullanıcının İsim Ve Soyismi**
    \`\`\`${isim}\`\`\`
    **Karakter Sildirme Seriali**
    \`\`\`${serial}\`\`\`
    **Karakter Başvurusu Yapan Kullanıcı:** ${message.author}`)
    .setColor("BLUE")
    message.delete({timeout:2500})
    client.channels.cache.get(ayarlar.karaktersildirmelog).send(karakter)
}

exports.conf = {
    enabled: true, 
    guildOnly: false,
    aliases: [], 
    permLevel: 0 
    };
    
    exports.help = {
    name: 'karaktersildir',
    description: '.',
    usage: '.'
    }