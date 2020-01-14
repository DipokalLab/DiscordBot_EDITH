# DiscordBot_EDITH
EDITH is a discod bot.

# 소개
EDITH 는 MySQL 과 연동하여 보안 로그를 불러오는 역할을 수행합니다.  

# 핵심코드
```javascript

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
