var jsdom = require('jsdom');
var url = 'http://m.wordbook.naver.com/endic/today/words.nhn?targetDate=';
var selectors = ['.words', '.txt_ct2'];

module.exports = function(robot) {

    scrapeWords = function(msg) {

        jsdom.env(url, function(err, window) {
            var $ = require('jquery')(window);

            if(err) {
                console.log(err);
            } else {
                words = [];
                phonetics = []
                meanings = [];

                window.$(".words").each(function() {
                    words.push($(this).text());
                });
                window.$(".phonetic").each(function() {
                    phonetics.push($(this).text());
                })
                window.$(".txt_ct2").each(function() {
                    meanings.push($(this).text());
                });

                results = "";
                for(i=0; i<words.length; i++) {
                    results+= words[i] + " " + phonetics[i] + "\n";
                    results+= meanings[i] + "\n";
                }
            }
            msg.send(results);

        });
    }

    //robot.hear(/test/ig, scrapeWords);
    robot.hear(/오늘의 단어/ig, scrapeWords);
    robot.hear(/단어 주세요/ig, scrapeWords);
    robot.hear(/today\'s words/ig, scrapeWords);

}
