var jsdom = require('jsdom');

module.exports = function(robot) {

    //helper methods
    capitalizeFirstLetter = function(str) {
        return str[0].toUpperCase() + str.slice(1);
    }

    dateToText = function(date) {
        return "".concat(date.getFullYear(),".",date.getMonth()+1,".",date.getDate());
    }

    findNumEmoji = function(n) {
        a = n.toString().split("");
        h = {
            1: ":one:",
            2: ":two:",
            3: ":three:",
            4: ":four:",
            5: ":five:",
            6: ":six:",
            7: ":seven:",
            8: ":eight:",
            9: ":nine:",
            0: ":zero:"
        }
        result = "";
        for(var i=0; i<a.length; i++) {
            result+= h[a[i]];
        }
        return result;
    }

    scrapeWords = function(msg) {
        var url = 'http://m.wordbook.naver.com/endic/today/words.nhn?targetDate=';
        message = msg.match[0];

        console.log(message);

        t = new Date();
        if(message.match(/(어제|yesterday)/)) {
            t.setDate(t.getDate()-1);
            url+= dateToText(t);
        } else if(message.match(/(그저께|그제)/)) {
            t.setDate(t.getDate()-2);
            url+= dateToText(t);
        }

        if(msg.match.length>2 && msg.match[2].length>0 && msg.match[2].match(/[\d]+-[\d]+-[\d]+/)) {
            t = new Date(msg.match[2]);
            url+= dateToText(t);
        }


        jsdom.env(url, function(err, window) {
            var $ = require('jquery')(window);
            console.log(url);

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
                    if(!msg.match[0].match(/단어만/)) {
                        results+= meanings[i] + "\n";
                    }
                }
            }
            msg.send(results);

        });
    }

    findExample = function(msg) {
        word = msg.match[2].trim();
        results = "";
        sentences = [];
        translations= [];
        num = 5;

        if(word.length==0) {
            msg.send("단어를 제대로 입력하지 않은 것 같아요..");
            return;
        }

        if(msg.match.length>3 && parseInt(msg.match[3])) {
            num = msg.match[3];
        }

        url = 'http://endic.naver.com/search_example.nhn?sLn=kr&query='+ encodeURIComponent(word) + '&preQuery=&searchOption=example&forceRedirect=N';

        console.log("url: ", url);
        console.log("num: ", num);

        jsdom.env(url, function(err, window) {
            var $ = require('jquery')(window);

            if(err) {
                console.log(err);
            } else {
                window.$(".utb").each(function(i){
                    //console.log(i);
                    sen = $(this).find("input[name!='assist']").prop('value');
                    tran = $(this).find("[class='N=a:xmp.detail']:not(.detail_url_link)").text() || "";
                    //console.log(sen, tran);

                    sentences.push(sen.replace(word, "*"+word+"*"));
                    translations.push(tran);
                });
            }

            for(i=0; i<Math.min(num, sentences.length); i++) {
                results+= findNumEmoji(i+1) + " ";
                results+= sentences[i] + "\n";
                results+= "        " + (translations[i] ? translations[i] : "") + "\n\n";
            }
            if (results.length>0) {
                msg.send(results);
            } else {
                msg.send("예문이 없거나 명령어를 잘못 입력한 것 같네요..", url);
            }

        });

    }

    findUrbanDictionary = function(msg) {
        word = msg.match[2].trim();
        url = 'http://www.urbandictionary.com/define.php?term=' + encodeURIComponent(word);

        if(word.length==0) {
            msg.send("단어를 제대로 입력하지 않은 것 같아요..");
            return;
        }

        console.log("url: ", url);

        jsdom.env(url, function(err, window) {
            var $ = require('jquery')(window);

            if(err) {
                console.log(err);
            } else {
                if(window.$(".no-results").length>0) {
                    msg.send("예문이 없거나 명령어를 잘못 입력한 것 같네요..", url);
                } else {
                    msg.send("*"+window.$(".def-header:first").text()+"*");
                    msg.send(window.$(".meaning:first").text());
                    msg.send("```"+window.$(".example:first").text()+"```");
                }
            }
        });

    }

    //robot.hear(/test/ig, scrapeWords);
    robot.hear(/(오늘|어제|그제|그저께|today|yesterday).*(단어|word).*/i, scrapeWords);
    robot.hear(/^단어.*(주세요|나와라)/i, scrapeWords);
    robot.hear(/(단어|word)\D*([\d]+-[\d]+-[\d]+)/i, scrapeWords);

    robot.hear(/(예문|example) (\D*)(\d*)/i, findExample);

    robot.hear(/^(ud) (\D*)/i, findUrbanDictionary);

    robot.hear(/단어봇 사용법/i, function(msg) {
        response ="```\n(오늘|어제|그제|그저께) 단어: 단어 + 뜻\n(오늘|어제|그제|그저께) 단어만: 단어만\n단어 (주세요|나와라): 오늘의 단어\n단어 yyyy-mm-dd: 해당일자의 단어\n단어만 yyyy-mm-dd: 해당일자의 단어만\n\n(예문|example) 단어 (optional)N: 단어 예문 (N개. default 5개)\n```";
        msg.reply(response);
    })
}

//#TODO
// bold..
