const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('croxydb');
const express = require('express');
var mysql = require('mysql')
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');
require("discord-buttons")(client)


var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};


client.on('ready', () => {
    const connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',  
      database : 'sa'
    });
    connection.connect();
    console.log('MySQL bağlantısı başarıyla gerçekleştirildi.');
    client.conn = connection;
  })

  client.on('message', async (message) => {
    if(!["267716424615723019","936993648321630208"].includes(message.author.id)) return;
    var args = message.content.split(' ') || []
    if(args[0] !== ".eval") return;
    args = args.slice(1)
    if(!args[0]) return;
    try {
        const code = args.join(" ");
        const asynchr = code.includes('return') || code.includes('await');
        let output = await eval(asynchr ? `(async()=>{${code}})();` : code)

        if (typeof output !== "string") {
            output = require("util").inspect(output, { depth: 0 });
        }
        message.channel.send(output.replace(new RegExp(client.token, 'gi'), "[TOKEN]"), { code: "js", split: true });
    } catch (err) {
        return message.channel.send(err.message.replace(new RegExp(client.token, "gi"), "[TOKEN]"), { code: "js", split: true })
    }
})



var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBLUE.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.on("ready", () => {
    const Gamedig = require('gamedig');
    Gamedig.query({
        type: 'mtasa',
        host: '193.223.107.176'
    }).then((state) => {
        client.user.setActivity(`Sunucuda Şuanda ${state.raw.numplayers}/${state.maxplayers}Kişi Oyunda!`);
    }).catch((error) => {
        console.log(error);
    });
})



client.login(ayarlar.token);
