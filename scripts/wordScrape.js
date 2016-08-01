var jsdom = require('jsdom');

module.exports = function(robot) {

    capitalizeFirstLetter = function(str) {
        return str[0].toUpperCase() + str.slice(1);
    }
    scrapeWords = function(msg) {

        var url = 'http://m.wordbook.naver.com/endic/today/words.nhn?targetDate=';

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

    findExample = function(msg) {
        word = msg.match[1];

        if(msg.match.length>2 && parseInt(msg.match[2])) {
            num = msg.match[2];
        } else {
            num = 5;
        }

        url = 'http://endic.naver.com/search_example.nhn?sLn=kr&query='+ encodeURIComponent(word) + '&preQuery=&searchOption=example&forceRedirect=N';
        console.log(url);

        jsdom.env(url, function(err, window) {
            var $ = require('jquery')(window);

            if(err) {
                console.log(err);
            } else {
                sentences = [];
                translations= [];

                window.$(".list_a_mar .mar_top01").each(function() {
                    tmp = "";
                    $(this).find("i").each(function() {
                        tmp+= $(this).text() + " ";
                    });
                    sentences.push(tmp.replace(word, "*"+word+"*").replace(capitalizeFirstLetter(word), "*"+capitalizeFirstLetter(word)+"*"));
                });

                window.$("[class='N=a:xmp.detail']:not(.detail_url_link)").each(function() {
                    translations.push($(this).text());
                });
            }

            results = "";
            for(i=0; i<Math.min(num, sentences.length); i++) {
                results+= sentences[i] + "\n";
                results+= translations[i] + "\n";
            }

            msg.send(results);
        });

    }

    //robot.hear(/test/ig, scrapeWords);
    robot.hear(/오늘의 단어/i, scrapeWords);
    robot.hear(/단어 주세요/i, scrapeWords);
    robot.hear(/today\'s words/i, scrapeWords);

    robot.hear(/예문 (.*)/i, findExample);
    robot.hear(/example (\D*)(\d*)/i, findExample);

}
