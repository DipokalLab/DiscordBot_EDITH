const Discord = require('discord.js');
const config = require('./config.json');


// create a new Discord client
const client = new Discord.Client();

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  port:3306,
  user:'root',
  password:'pass',
  database:'per'
})
connection.connect();

let prefix="$";

connection.on('error', function() {});


client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();



  if (msg.content === `${prefix}안녕`) {
    msg.reply('안녕하세요 EDITH 입니다.');
    msg.reply('DeVent Systems 의 관리, 제어 봇 입니다.');
  }

  if (msg.content === `${prefix}log 5`) {
    msg.reply('상위 5개의 로그를 불러옵니다.');
    connection.query('SELECT * FROM attlog order by idx desc limit 5', function (error, results, fields) {
      if (error) throw error;
      for (var i = 0; i < results.length; i++) {
        console.log('The solution is: ', results[i].idx);
        msg.reply(`IDX: ${results[i].idx},  IP: ${results[i].ip},  NAME: ${results[i].idname},  TIME: ${results[i].dat},  FID: ${results[i].fid}`);
      }

    });
  }

  if (msg.content === `${prefix}log 10`) {
    msg.reply('상위 10개의 로그를 불러옵니다.');
    connection.query('SELECT * FROM attlog order by idx desc limit 10', function (error, results, fields) {
      if (error) throw error;
      for (var i = 0; i < results.length; i++) {
        console.log('The solution is: ', results[i].idx);
        msg.reply(`IDX: ${results[i].idx},  IP: ${results[i].ip},  NAME: ${results[i].idname},  TIME: ${results[i].dat},  FID: ${results[i].fid}`);
      }

    });
  }

  if (msg.content === `${prefix}소개 부탁해`) {
    msg.channel.send(`안녕하세요 DeVent Website Security Program 중 메인 프로그램인 EDITH 입니다.
EDITH 는 스파이더맨 파 프롬 홈의 E.D.I.T.H 에서 영감을 받아 개발되었습니다.
EDITH 는 현재 DeVent Database 에 접근할 수 있는 권한이 있습니다.`);

  }

  if (command === `f`) {
  	if (!args.length) {
  		return msg.channel.send(`f 명령어 입니다. f 명령으로 사용자를 제어하세요 ${msg.author}!`);
  	}
    else if (args[0] === 'userck') {
      if (!args[1]) {
        msg.channel.send('f userck [ID] 로 사용자를 확인하세요');
      } else {
        connection.query(`SELECT * FROM mem WHERE Id = '${args[1]}'`, function (error, results, fields) {
          if (error) throw error;
          for (var i = 0; i < results.length; i++) {
            console.log('Id: ', results[i].Id);
            msg.reply(`ID: ${results[i].Id},  EMAIL: ${results[i].Email}`);
          }
        });
      }
  	}

  }


});

client.login('토큰');
