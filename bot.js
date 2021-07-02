const Twit = require("twit");
const config = require("./config.js");

let twitter = new Twit(config);
let georgieTwitterId = "1410387622183194624";
let possumTwitterId = "1022089486849765376";

function getLatestPossum() {
  let lastGeorgie = {
    count: 1,
    user_id: georgieTwitterId,
  };

  let aCoupleOfPossums = {
    count: 5,
    user_id: possumTwitterId,
  };

  let latestGeorgieId = 0;

  twitter.get(
    "statuses/user_timeline",
    lastGeorgie,
    function (err, data, respond) {
      if (data) {
        latestGeorgieId = data[0].in_reply_to_status_id_str;
      }
    }
  );

  let possumPicPattern = new RegExp("^(https://t.co/[A-Za-z0-9]{10})$");
  twitter.get(
    "statuses/user_timeline",
    aCoupleOfPossums,
    function (err, data, respond) {
      if (data) {
        for (tweet of data) {
          if (tweet.id_str === latestGeorgieId) {
            console.log("Already named this one Georgie!");
            break;
          } else {
            if (!possumPicPattern.test(tweet.text)) {
              console.log("Alert! Not a possum pic!!!");
            } else {
              nameGeorgie(tweet);
              break;
            }
          }
        }
      }
    }
  );
}

function nameGeorgie(possum) {
  if (!possum) console.log("No new possums today...");
  let nameTemplates = [
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
    "please look at this georgie",
    "LOOK at this GEORGIE!!!!!!!",
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
    "gosh i sure hope my friends see this incredible georgie!",
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
    " :)c",
  ];

  let templateIndex = getRandomIndex(nameTemplates.length);
  let template = nameTemplates[templateIndex];
  let extra =
    getRandomIndex(100) > 95 ? emoticons[getRandomIndex(emoticons.length)] : "";
  template = template + extra;

  let tweet = {
    in_reply_to_status_id: possum.id_str,
    status: `@${possum.user.screen_name} ${template}`,
  };

  twitter.post("statuses/update", tweet, tweeted);

  function tweeted(err, data, response) {
    if (err) {
      console.log("Wuhoh... we missed!");
      console.log(err);
      console.log();
    } else {
      console.log("Another possum named Georgie!");
    }
  }
}

function randomPossumFact() {
  let possumFacts = [
    "American possums can have up to 20 babies! That's... a lot more than OUR Georgie...",
    "Australian possums can only have 1 or 2 babies, just like our Georgie.",
    "Possums don't hibernate... they're so active and alert... but they will try and escape the cold. Georgie has never known cold.",
    "Possums are nocturnal! Georgie is not!",
    "Possums are diurnal in winter! Georgie is, too!",
    "Can possums get rabies? VERY unlikely, but yes. Same with Georgie.",
    "Possums cannot hang onto tree branches with their tails. :( But neither can Georgie, so that tracks.",
    "Georgie: does not live in trees most of the time.\nPossums: do live in trees most of the time.",
    "POSSUMS are NOT rodents!!! They are marsupials. Imagine, for a moment, Georgie as a marsupial.",
    "Marsupials carry their babies in pouches. Please imagine Marvin in a pouch.",
    "Imagine Marvin trying to hold himself to a branch by his tail but he just flies off because possums' tails are too weak to hold them like that. Bye Marvin...",
    "Possums are not blind! They just can't see in the dark. Georgie is much the same.",
    "Possums are nocturnal..... but they can't see good in the dark.... Interesting.... Georgie would be just like this if she was nocturnal.",
    "Hissing and growling are some of the few sounds that possums make. Georgie can make many, many sounds.",
    "Australian possums can make up to 18 sounds. Georgie can probably make more, though.",
    "Australian ringtail possums AND Georgies, when highly active, produce a high-pitched chirruping twitter. Think about that.",
    "Possums can eat like ANYTHING, which is great if Georgie is around because she is such a picky eater.",
    "Possums are immune to snake venom. Maybe Georgie should try that sometime.",
    "Possums can eat little fruits... just like Georgies...",
    "Possums don't 'eat ticks' so much as they 'clean themselves and eat the ticks'. Georgie would think that's kinda gross.",
    "Saying it again for the people in the back: Geor! gie! and! poss! ums! are! not! ro! dents!",
    "American possums are solitary... Georgie could never.",
    "Possums spend their time eating and stuff in the trees and then they waggle down to the ground to sleep... Georgie does similarly.",
    "Pygmy possums can sleep in birds' nests... that must scare those birds... Imagine Georgie, if you will, sleeping in a little bird's nest.",
    "2-4 years is the average lifespan of a possum. :( Georgie can live much longer. Many possums might come and go while Georgie lives.",
    "In America, birds will eat possums. Not true in Austrlia. Georgie would not eat a possum, regardless of which country she is in.",
    "There are 70 species of possum. Only 1 Georgie. But all possums are named Georgie... interesting...",
    "The English word 'possum' comes from the Powhatan word 'aposoum,' which means 'white animal.' Georgie could also be said to be a white animal.",
    "Baby possums will make sneezing sounds or soft “choo choo”s to let mama know where they are, who will respond with clicking noises. Imagine Marvin and Georgie.",
    "Possums don't 'play dead' so much as 'have a weird faint thing they do when terrified.' Georgie is similar.",
    "Sometimes, possums get fleas. Georgie, hopefully, does not. Maybe once.",
    "FactRetriever says Captain John Smith is responsible for naming the possum... then it goes on to say that the word comes from Powhatan... Let's think about that... Georgie would not be so frivolous in her research.",
    "When possums play dead, they secrete a bad smell and foam at the mouth. If Georgie ever did that, there would be great concern.",
    "Possums can play dead for up to four whole human hours. Georgie might call that 'sleping'.",
    "Girl possums are 'jills' and boy possums are 'jacks' and baby possums are 'joeys'. Georgie is 'Georgie.'",
    "Joeys are the size of a honeybee when they're first born... Imagine Marvin... Teresa would have such an easy time.",
    "Once a joey reaches mama's pouch, they'll hang onto her nipple for 70 days. Georgie might have thoughts about that.",
    "Georgie, like possums, is not usually violent.",
    "Male possums have forked... you know. Georgie? Well...",
    "Possums gestate for two whole human weeks before they give birth. Teresa, with her nine months, might be just a little jealous.",
    "Possums move about 15 miles in a two-week period. That's Georgie running around the gardens.",
    "Possums have 50 teeth, the most of any North American mammal. Georgie has 32 because I bet she didn't get her wisdom teeth yanked out.",
    "Possums weigh between 4 and 12 pounds. Georgie weighs more than that.",
  ];

  if (getRandomIndex(5) === 5) {
    let possumFact = possumFacts[getRandomIndex(possumFacts.length)];
    let tweet = {
      status: `${possumFact}`,
    };
    twitter.post("statuses/update", tweet, tweeted);

    function tweeted(err, data, response) {
      if (err) {
        console.log("Wuhoh... people missed out on a possum fact!");
        console.log(err);
      } else {
        console.log("Possum fact: tweeted!");
      }
    }
  }
}

function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

getLatestPossum();
randomPossumFact();
