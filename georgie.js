const Twit = require("twit");
const config = require("./configs/config.js");
const twitConfig = require("./configs/twitConfig.js");

let twitter = new Twit(config);
let georgieTwitterId = twitConfig.georgieTwitterId;
let possumTwitterId = twitConfig.possumTwitterId;

function getLatestPossum() {
  let lastGeorgie = {
    count: 2,
    user_id: georgieTwitterId,
  };

  let aCoupleOfPossums = {
    count: 1,
    user_id: possumTwitterId,
    expansions: "attachments.media_keys",
    media_fields: "url",
  };

  let latestGeorgieId = 0;

  let possumPicPattern = new RegExp("^(https://t.co/[A-Za-z0-9]{10})$");
  function getPossumHourTweets(latestGeorgieId) {
    twitter.get(
      "statuses/user_timeline/",
      aCoupleOfPossums,
      function (err, data, respond) {
        if (data) {
          let tweet = data[0];
          if (tweet.id_str === latestGeorgieId) {
            console.log("Already named this one Georgie!");
          } else {
            if (!possumPicPattern.test(tweet.text)) {
              console.log(tweet);
              console.log("Alert! Not a possum pic!!!");
            } else {
              console.log("Let's name this Georgie!");
              nameGeorgie(tweet);
            }
          }
        } else {
          console.log(err);
        }
      }
    );
  }

  twitter.get(
    "statuses/user_timeline",
    lastGeorgie,
    function (err, data, respond) {
      if (data) {
        for (tweet of data) {
          if (!tweet.is_quote_status) continue;
          getPossumHourTweets(tweet.quoted_status_id_str);
          break;
        }
      } else {
        console.log(err);
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
    "100% grade A georgie",
    "definitely certifiably a georgie!",
    "the report is in: it's georgie!!",
    "this possum = this georgie",
    "you better believe it's georgie!!",
    "this creature is one of those 'georgies'",
    "get a little extra georgie",
    "you want more georgie? bam",
    "oh darling georgie",
    "georgie the sweetheart",
    "georgie the stupendous",
    "georgie the wise",
    "georgie the beautiful",
    "the legends are true: it's georgie!!",
    "what a cute face this georgie has!",
    "eat your heart out, it's georgie!!",
    "this georgie knows how to have a good time",
    "don't think twice! it's georgie",
    "here's a riddle for you: what is this creature's name?\n\nduh, it's georgie!",
    "did you miss her? it's georgie",
    "yes, this is one of those georgies you've heard so much about",
    "this is a georgie you can take home to mama!",
    "rotate this georgie in your mind",
    "georgie is such a good girl",
    "georgie is an angel",
    "this georgie is one of god's gifts",
    "here's a georgie",
    "there's a georgie",
    "georgie's back at it again!",
    "here's a georgie for the road",
    "have a good day thinking about this georgie",
    "thank you, sweet georgie, one of many",
    "cute widdle georgie",
    "get a load of this georgie!",
    "georgie porgie possum and pie",
    "a kiss from this georgie to you",
    "have a good day with this georgie",
    "watch out! it's georgie",
    "clear the way! it's georgie",
    "what a heart throb this georgie is!",
    "you want her, you got her..... it's georgie",
    "it's georgie, baby!",
    "wake up! georgie's here",
    "georgie has arrived",
    "georgie has entered the chat",
    "georgies are always the life of the party",
    "live it up, georgie",
    "every hour, there's another georgie for the world. this hour, it's this one",
    "best georgie of the day",
    "#1 georgie and #2 #3 #4... ",
    "georgie, etc.",
    "georgie is typing",
    "georgie alert!",
    "attention everyone: look at georgie",
    "@ everyone look at this possum named georgie",
    "shoutout for this georgie!",
    "well, if it isn't another georgie",
    "happy day! georgie is here",
    "i am in love with this georgie",
    "i wish i could marry this georgie",
    "-kisses this georgie-",
    "lol guys it's georgie",
    "georgie!",
    "georgie time",
    "real georgie hours",
    "possum (georgie)",
    "Didelphimorphia Georgie",
    "wooohooo!! this is georgie",
    "celebrate this georgie",
    "you got this, georgie!!",
    "this is one of the best georgies",
    "this georgie is a good one",
    "this georgie is fun at parties",
    "georgie-creature",
    "o-georgie",
    "model georgie",
    "little creature... georgie....",
    "a kiss for this georgie: mwah!",
    "the world belongs to georgie",
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
    "!!!!!!",
    " :33",
    " :33 !!",
    " asfjdklds",
    " gjlafdk",
    " :DD",
    " :V (possum face)",
    " :V :V",
    " ;w;",
    " :}",
    " 8)",
    " B)",
    " B-)",
    " 8-)",
    " owo",
    " uwu",
    " ???:???D",
    " <3",
    " <3<3",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ??????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
    " ???",
    " ????",
    " ????",
    " ????",
    " ????",
    " ????",
  ];

  let kaomoji = [
    " (????????`)???",
    " ????????????)??????",
    " (??????????????)???",
    " -??(?????????????)???",
    " ??????(??????????????`?????????)??????",
    " ???(o???o)/",
    " (??? ?????????????)",
    " ??????????????(????? ?? )",
    " ( ??? ??????)????????????.*???",
    " ???????????????????????? ?????????????????????????????????",
  ];

  let templateIndex = getRandomIndex(nameTemplates.length);
  let template = nameTemplates[templateIndex];
  let luckScore = getRandomIndex(100);
  let extra =
    luckScore > 95
      ? kaomoji[getRandomIndex(kaomoji.length)]
      : luckScore > 80
      ? emoticons[getRandomIndex(emoticons.length)]
      : "";
  let tweetBody = template + extra;

  let expandedUrl = possum.extended_entities.media[0].expanded_url;
  let attachmentUrl = expandedUrl.substring(0, expandedUrl.indexOf("/photo/1"));

  let tweet = {
    attachment_url: attachmentUrl,
    status: tweetBody,
    tweet_mode: "extended",
    simple_quoted_tweet: "true",
  };

  twitter.post("statuses/update", tweet, tweeted);

  function tweeted(err, data, response) {
    if (err) {
      console.log("Wuhoh... we missed!");
      console.log(err);
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
    "In America, birds will eat possums. Not true in Australia. Georgie would not eat a possum, regardless of which country she is in.",
    "There are 70 species of possum. Only 1 Georgie. But all possums are named Georgie... interesting...",
    "The English word 'possum' comes from the Powhatan word 'aposoum,' which means 'white animal.' Georgie could also be said to be a white animal.",
    "Baby possums will make sneezing sounds or soft ???choo choo???s to let mama know where they are, who will respond with clicking noises. Imagine Marvin and Georgie.",
    "Possums don't 'play dead' so much as 'have a weird faint thing they do when terrified.' Georgie is similar.",
    "Sometimes, possums get fleas. Georgie, hopefully, does not. Maybe once.",
    "FactRetriever says Captain John Smith is responsible for naming the possum... then it goes on to say that the word comes from Powhatan... Let's think about that... Georgie would not be so frivolous in her display of research.",
    "Captain John Smith came up with the scientific name for possums. Like, okay. Whatever. Georgie doesn't care either.",
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
    "Fact: possums are not pests. Georgie is not either.",
    "Someone described possums playing dead as 'they can stay zoned out for hours' and y'know what? Georgie.",
    "As far as we know, no possum is autistic. Georgie is. That's a fact.",
    "Possums have such a low blood temperature that rabies doesn't like them. Georgie COULD get rabies, but she doesn't because she is a good girl.",
    "4000 ticks a week?? That's what possums kill. Georgie WISHES.",
    "Lyme disease? On THOSE possums? Oh no thank you. And Georgie says no thank you either.",
    "Possums will NOT destroy your property. Georgie probably won't either.",
    "The animal family that possums are a part of is 70 million years old. Is Astral's soul that old? He might say yes.",
    "Possums eat carrion. Georgie does not. Let's hope.",
    "Possums are the only marsupials in North America... except for... no, is Teresa... who knows.",
    "Possums are smarter than rabbits, dogs, and cats... if we're talking about finding out where food was. Georgie relates.",
    "Possums and opossums are different. But Georgie is both.",
    "Playing dead is NOT a choice that possums or Georgie make.",
    "Possums will remember the smell of poisons for up to a year after they've encountered them. Georgie probably can't tell what Tess keeps in that bottle, though.",
    "Possums are not immune to the coral snake. Georgie is also not. Possums are immune to other poisons, though, and that would be nice for Georgie, wouldn't it?",
    "Possums clean themselves like cats do, like with their tongues. Funky. Georgie just takes a bath.",
    "Sweating is something only Georgies do. Not possums. They can't.",
    "Possums have all-black eyes... except they don't! Just HUGE pupils. Georgie just has big ol' eyes.",
    "Jills (girl possums) have two vaginal tracts and two uteruses... and the jacks (boy possums)... have appendages that.... well.... Respect that.......... Georgie doesn't even have ANY so like...",
    "When European colonizers first encountered possums, they thought that male possums might impregnate females via their nose. Georgie... as no relation to this fact. That's just funny.",
    "American possums do not have hair on their ears. Georgie would be horrified if she was different.",
    "Possums can be carriers for a protozoan known as Sarcocystis neurona, which can cause neurological disease.......... in Horses. Possums are dangerous to Horses. Georgie is ALSO dangerous to horses.",
    "Possums can carry leptospirosis, tuberculosis, coccidiosis, spotted fever, tularemia, and other diseases Georgie can't even pronounce.",
    "It is illegal to kill both possums and Georgie. For different reasons, but both illegal.",
    "Possums have gray hair. Georgie does not. Astral does, but he is absolutely not possum-like.",
    "Opossums can be bright beautiful gold. Georgie would love them.",
    "Naked tails. Possums have them. Georgie doesn't. That'd be weird.",
    "Possums are plantigrade. Georgie is, too.",
    "Possums are 'opportunistic omnivores'. As is Georgie.",
    "Possums don't have very good vision. In universes where Georgie wears/needs glasses, that is true of her as well.",
    "New Zealand got oppossums in 1837, to try and set up a fur trade. With no natural predators, they proliferated. Georgie proliferates, too, or something, maybe.",
    "New Zealand had to make the National Possum Control Agencies in the 1990s to control their possums. Very silly. Simply call them by name (Georgie) and take them to a nice place.",
    "The common ringtail possum in Australia's scientific name means 'false hand pilgrim'. Georgie's scientific name could also mean that.",
    "A group of possums is called a passel. A group of Georgies is called a fun time.",
    "The common bushtail possum in Australia has a scientific name that means 'furry tailed little fox'. Straight to the point. That's something Georgie would come up with.",
    "One website called Mountain Bushtails 'devastating invaders of roof spaces'. That's Georgie when she goes up to Astral's room uninvited.",
    "To defend territory, often possums will just stare at each other, ears erect. That'd be Georgie if she met her doppelganger.",
    "Possums (Virginia) come from the Two Womb animal family. Georgies love wombs.",
    "William Strachey (some guy) said possums have 'the bigness of a pig.' LOL what kinda pigs is that guy looking at? Georgies have the bigness of a cat.",
    "People call possums 'living fossils' sometimes. Weird! Georgie's a living.",
    "The dental formula is: 5.1.3.4/4.1.3.4????????2 = 50 teeth. Don't you forget it. That's a lot of teeth and math, and Georgie's not gonna look at it anymore.",
    "Males make a clicking 'smack' noise out of the side of their mouths as they wander in search of a mate. Or I guess just like stimming. Georgies do a lot of stimming.",
    "Possums need a TON of calcium and they get it from eating bones. Yeah, you read that right. Georgie could make some good bone marrow soup.",
    "Possum grease is high in essential fatty acids. Delicious grease. Rub it on your chest. Georgie will not help.",
    "The opossum is typically a nonaggressive animal. Georgie can make no such promises.",
    "The common opossum can mate for the majority of the calendar year. Interpret that as you will. Georgies can mate, too.",
    "Possums don't mate for life. Georgie does, though.",
    "Possums can give birth to up to 24 babies. 24 hours in a day... it's fate. Georgie time 24x a day.",
    "The back foot of a possum has an opposable little thumb. Georgie's got like. At least two opposable thumbs.",
    "No other mammal in North America has more than 6 upper incisors, but the Virginia opossum has 10. Georgie's got all of 'em.",
    "Possums walk like left side, right side, left side, right side... Step step step, like Georgie stepping into your heart.",
    "Heidi was a cross-eyed possum living in a German zoo. Or, so they thought. The possum's real name? Georgie. And she had cross eyeds.",
    "Cross-eyed-ness is common for possums if they get fat when the fat literally pushes on their eyes. Amazing. They function fine. Georgie is not cross-eyed at the moment.",
    "FDR and the teddy bear? Step aside! Some folks tried to make a popular possum character ('Billy') with Howard Taft. It didn't go well. They should've named him Georgie.",
    "On the Perelman Building, the possum represents 'protection.' Georgie will attack... but she will always protect.",
    "Being talked to or pet can be distressing for wild possums. Just like a Georgie.",
    "Possum pie is a lil dessert. No meat. Why would you think there was meat in it? No meat, no Georgie meat... just... sweet confection.",
    "Possums is a 1998 sports comedy film directed by Max Burnett. Kinda confusing to watch... everyone's named Georgie. But Georgie? Never. Sports? Feh.",
    "Top speed of a possum is 15mph. Georgie can definitely run at least that fast. Will she? Depends.",
    "Hibernation is not on the calendar for any possum out there. Possums, and Georgie, are an all year event.",
  ];

  if (getRandomIndex(5) === 4) {
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
