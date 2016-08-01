var jsdom = require('jsdom');

module.exports = function(robot) {

    getWeather = function(msg) {

        // url = 'https://www.google.com/#q=' + encodeURIComponent(msg.message.text);
        // console.log(url);

        var defaultUrl = "https://search.naver.com/search.naver?where=nexearch&query=" + encodeURIComponent(msg.message.text) + "&sm=top_hty&fbm=0&ie=utf8";

        jsdom.env(defaultUrl, function(err, window) {
            var $ = require('jquery')(window);
            var results ="";
            if(err) {
                console.log(err);
            } else {
                // results+= "*" + window.$("#wob_loc").text() + "*\n";
                // results+= window.$("#wob_dts").text() + "\n";
                // results+= window.$("#wob_dc").text() + "\n";
                // results+= window.$("#wob_tm").text() + "°C\n";
                // results+= "강수확률: " + window.$("#wob_pp").text() + " | ";
                // results+= "습도: " + window.$("#wob_hm").text() + " | ";
                // results+= "풍속: " + window.$("#wob_ws").text()

                results += window.$(".w_now2 ul li:first .fl h5").text();
                results += window.$(".w_now2 ul li:first .fl em").text();
                results += window.$(".w_now2 ul li:first .fl p").text();
                // console.log(window.$(".w_now2 ul li:first .fl h5").text());
                // console.log(window.$(".w_now2 ul li:first .fl em").text());
                // console.log(window.$(".w_now2 ul li:first .fl p").text());
            }

            msg.send(results);

        });
    }

    robot.hear(/.+ 날씨/i, getWeather);


}
