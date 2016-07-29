var Scraper = require('node-scraper')

module.exports = function(robot) {

    scrapeWords = function(msg) {
        //console.log(msg);

        var scraper = new Scraper('http://m.wordbook.naver.com/endic/today/words.nhn?targetDate=', {
            selectors: ['.words', '.txt_ct2']
          });

          scraper.scrape().on('done', function(err, statusCode, content){
            if (err){
              console.error(err);
            }
            else {
              //console.log(statusCode, content);
              msg.reply(content[0].content[0].html);
              msg.reply(content[1].content[0].html);

              msg.reply(content[0].content[1].html);
              msg.reply(content[1].content[1].html);

              msg.reply(content[0].content[2].html);
              msg.reply(content[1].content[2].html);

              msg.reply(content[0].content[3].html);
              msg.reply(content[1].content[3].html);

              msg.reply(content[0].content[4].html);
              msg.reply(content[1].content[4].html);


            }
          });
    }

      robot.hear(/Today\'s Words/ig, scrapeWords);
}
