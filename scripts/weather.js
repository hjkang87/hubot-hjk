var jsdom = require('jsdom');

module.exports = function(robot) {

    getWeather = function(msg) {

        var defaultUrl = "https://search.naver.com/search.naver?where=nexearch&query=" + encodeURIComponent(msg.message.text) + "&sm=top_hty&fbm=0&ie=utf8";

        console.log(defaultUrl);

        console.log(msg.message.text);
        jsdom.env(defaultUrl, function(err, window) {
            var $ = require('jquery')(window);
            var results ="";
            if(err) {
                console.log(err);
            } else {
                results += window.$(".w_now2 ul li:first .fl h5").text();
                results += window.$(".w_now2 ul li:first .fl em").text();
                results += window.$(".w_now2 ul li:first .fl p").text();
                console.log(window.$(".w_now2 ul li:first .fl h5").text());
                console.log(window.$(".w_now2 ul li:first .fl em").text());
                console.log(window.$(".w_now2 ul li:first .fl p").text());
            }

            msg.send(results);

        });
    }

    robot.hear(/.+ 날씨/gi, getWeather);


}
