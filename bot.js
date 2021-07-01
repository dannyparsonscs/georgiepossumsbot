const Twit = require("twit");
const config = require("./config.js");
const dateformat = require('dateformat');

let twitter = new Twit(config);

function findAndNamePossum() {
    let yesterday = new Date().setDate(new Date().getDate() - 1);
    let yesterdaysPossums = dateformat(new Date(yesterday), "yyyy-mm-dd");
    let queryString = 'from:PossumEveryHour since:' + yesterdaysPossums;
    twitter.get('search/tweets', { q: queryString }, function (err, data, response) {
        let rightNow = new Date();
        let lastHour = rightNow.setHours(rightNow.getHours() - 1);
        let newPossums = [];
        let tweetDateTime;
        for (tweet of data.statuses) {
            tweetDateTime = new Date(tweet.created_at);
            tweetDateTime = tweetDateTime.setHours(tweetDateTime.getHours());
            console.log(tweetDateTime - lastHour);
            if (tweetDateTime > lastHour) {
                newPossums.push(tweet);
            }
        }
        nameGeorgie(newPossums[0]);
    });
}

function nameGeorgie(possum) {
    let messageTemplates = [
        "georgie!",
        "woah! this possum's name is... georgie!",
        "this possum... her name is georgie",
        "another hour, another georgie",
        "creature: possum\nname: georgie",
        "if you were to name this possum... i mean, i know i'd name it georgie",
        "gotta be georgie!",
        "georgie the possum",
        "pictured above: georgie",
        "i can't believe this is georgie",
        "i really really can't believe all possums, like this one, are named georgie",
        "georgie irl",
        "georgie!!!",
        "i'm naming this possum georgie",
        "i'm naming THIS possum georgie",
        "i love georgie",
        "all possums should have the same name as this one, which is georgie",
        "i have an oc named georgie and she looks just like this possum, so this possum is named georgie, too",
        "gotta name this possum georgie!",
        "love you, georgie!",
        "gettem, georgie!",
        "yess... just like a good georgie",
        "lol georgie",
        "@siptopia look it's georgie",
        "look at georgie!!!",
        "georgie the possum!",
        "love this georgie...",
        "best possum named georgie so far",
        "good possum! good georgie",
        "georgie",
        "a fitting name would be... georgie",
        "this possum's got it all! and is named georgie!",
        "this is really georgie asgfjkfadls",
        "georgieee jgfakfjlsKJ",
        "unbelievable..... it's georgie....",
        "i can't believe all possums are georgie",
        "georgie!!",
        "Georgie....",
        "gorgeous georgie!",
        "funny georgie!",
        "silly georgie!",
        "sweet georgie!",
        "beautiful georgie!",
        "funny widdle georgie...",
        "best georgie!",
        "good georgie!",
        "i love georgie",
        "we love georgie",
        "god, everyone loves georgie",
        "bestest georgie",
        "good girl georgie",
        "possum time........ georgie time......",
        "love this georgie!",
        "can't get enough of georgie!",
        "possums every hour? more like georgies every hour",
        "it's Amazing...... every possum is georgie",
        "cuuute georgie!",
        "perfect georgie",
        "classic georgie",
        "LOL!! georgie!!",
        "suuuch a good georgie",
        "@siptopia please look at this georgie",
        "@siptopia LOOK at this GEORGIE!!!!!!!",
        "georgie, beloved...",
        "dang this is one good georgie",
        "sweet perfect georgie",
        "georgie for real!!!!",
        "such a georgie omg",
        "omg georgie",
        "omfgggg it's georgie",
        "LOVE this georgie!!!",
        "LOVE this georgie!!!!!",
        "soooooo cute.... sooooo georgie....",
        "ahh!!! what a good georgie!!!",
        "possum name: georgie",
        "this possum is georgie",
        "this possum is named georgie",
        "there can be no other name but georgie for THIS possum",
        "georgie.... is................ this possum.......",
        "georgie.... is here......",
        "asjlfadkjs;ljk GEORGIE",
        "best georgie!!!!!!!!!!!!!",
        "delightful widdle georgie",
    ];

    let emoticons = [
        " :3",
        " :3c",
        " :)",
        " :-)",
        " :3c",
        " :D",
        "!",
        "!!",
        "!!!",
        "!!!!",
        " ajklakl",
        " jksljkafs;lfkjl",
        " faljkd",
        " ahhhh!!",
        " AHHHH!!",
        " :3333",
        " :3cccc",
        " :))))",
        " :-))))",
        " :)c"
    ]

    function getRandomIndex(max) {
        return Math.floor(Math.random() * max);
    }

    let templateIndex = getRandomIndex(messageTemplates.length)
    let template = messageTemplates[templateIndex];
    let extra = getRandomIndex(100) > 95 ? emoticons[getRandomIndex(emoticons.length)] : "";
    template = template + extra;

    let tweet = {
        in_reply_to_status_id: possum.id_str,
        status: `@${possum.user.screen_name} ${template}`
    }

    twitter.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response) {
        if (err) {
            console.log("Wuhoh... we missed!");
            console.log(err);
            console.log();
        } else {
            console.log("Another possum named...");
        }
    };
}

findAndNamePossum();