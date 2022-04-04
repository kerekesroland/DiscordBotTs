"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var dotenv_1 = require("dotenv");
require("ts-replace-all");
var axios_1 = require("axios");
dotenv_1["default"].config();
var prefix = ".";
var client = new discord_js_1["default"].Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_VOICE_STATES,
        discord_js_1.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        discord_js_1.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        discord_js_1.Intents.FLAGS.DIRECT_MESSAGES,
        discord_js_1.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        discord_js_1.Intents.FLAGS.GUILD_INTEGRATIONS,
        discord_js_1.Intents.FLAGS.GUILD_PRESENCES,
        discord_js_1.Intents.FLAGS.GUILD_WEBHOOKS,
        discord_js_1.Intents.FLAGS.GUILD_MEMBERS,
        discord_js_1.Intents.FLAGS.GUILD_INVITES,
        discord_js_1.Intents.FLAGS.GUILD_BANS,
    ]
});
client.on("ready", function () { return console.log("Rolcabot is Online!"); });
//? Reminder command
client.on("messageCreate", function (message) {
    var kiir = function () {
        message.channel.send("".concat(messageArgs.toString().substring(26).replaceAll(",", " ")) +
            "\n" +
            "<@" +
            message.author +
            ">");
    };
    var currentTime = +new Date();
    var messageArgs = message.content.split(" ");
    var desiredTime = +new Date("".concat(messageArgs[1], "$/").concat(messageArgs[2], "/").concat(messageArgs[3], " ").concat(messageArgs[4], ":").concat(messageArgs[5]));
    var delay = desiredTime - currentTime;
    var timeout;
    if (message.author.bot) {
        return;
    }
    else if (messageArgs[0] === prefix + "remindme") {
        if (delay <= 2073600000) {
            timeout = setTimeout(kiir, delay);
            message.channel.send("Reminder set to: ".concat(messageArgs[1], "/").concat(messageArgs[2], "/").concat(messageArgs[3], " ").concat(messageArgs[4], ":").concat(messageArgs[5]));
        }
        else {
            message.channel.send("U can set a reminder of a maximum 24 day forward");
        }
    }
});
//? Reminder help
client.on("messageCreate", function (message) {
    var messageArgs = message.content.split(" ");
    var embed;
    if (messageArgs[0] === prefix + "reminderHelp") {
        embed = new discord_js_1["default"].MessageEmbed()
            .setTitle("Reminder command usage (Maximum: 24 days forward)")
            .setDescription("```css\n" + "Example: .remindme 2022 01 24 16 30" + "```")
            .setColor("BLUE")
            .setFooter("Author: Rolca")
            .setImage("https://cdn.discordapp.com/attachments/836985486836891698/935289057611743262/received_389504359616689.jpeg");
        message.channel.send({ embeds: [embed] });
    }
});
//? Congratulator to Kocsikri
client.on("messageCreate", function (message) {
    var counter = 0;
    var interval;
    function sendCongratsToKocsikri() {
        if (counter > 4) {
            clearInterval(interval);
        }
        else {
            message.channel.send("Congrats Kocsikri, u da beast 🎈✨🎉🎂🍰✨🌟🦅");
            counter++;
        }
    }
    function timer() {
        interval = setInterval(sendCongratsToKocsikri, 10000);
    }
    var messageArgs = message.content.split(" ");
    if (messageArgs[0] === prefix + "congrats") {
        timer();
    }
});
//? Timetable command
client.on("messageCreate", function (message) {
    var embed;
    var messageArgs = message.content.split(" ");
    if (messageArgs[0] === prefix + "orarend") {
        embed = new discord_js_1["default"].MessageEmbed()
            .setTitle("Your TimeTable")
            .setColor("BLUE")
            .setFooter("Author: Rolca")
            .setImage("https://cdn.discordapp.com/attachments/836985486836891698/937714145158103100/unknown.png");
        message.channel.send({ embeds: [embed] });
    }
});
//? .albi command (summon Kocsikri command)
client.on("messageCreate", function (message) {
    var messageArgs = message.content.split(" ");
    if (messageArgs[0] === prefix + "albi") {
        message.channel.send("<@!590212903928463386>");
        message.channel.send("<@!215076664349163520>");
        message.channel.send("Let's go find albi!!");
    }
});
//? Random cat picture
client.on("messageCreate", function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var messageArgs, embed, cica;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                messageArgs = message.content.split(" ");
                if (!(messageArgs[0] === prefix + "rcat")) return [3 /*break*/, 3];
                return [4 /*yield*/, axios_1["default"].get("https://api.thecatapi.com/v1/images/search")];
            case 1:
                cica = _a.sent();
                embed = new discord_js_1["default"].MessageEmbed()
                    .setTitle("Random cica")
                    .setColor("BLUE")
                    .setFooter({ text: "Author: Rolca" })
                    .setImage(cica.data[0].url);
                return [4 /*yield*/, message.channel.send({ embeds: [embed] })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
//? Bitcoin Tracker API
client.on("messageCreate", function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var today, messageArgs, embed, bCoin;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                today = new Date();
                messageArgs = message.content.split(" ");
                if (!(messageArgs[0] === prefix + "bitcoin")) return [3 /*break*/, 3];
                return [4 /*yield*/, axios_1["default"].get("https://api.coindesk.com/v1/bpi/currentprice.json/")];
            case 1:
                bCoin = _a.sent();
                embed = new discord_js_1["default"].MessageEmbed()
                    .setTitle("Bitcoin in USD, GDP, EUR at the moment")
                    .setColor("BLUE")
                    .setFooter({ text: today.toString() })
                    .addField("USD", "".concat(bCoin.data.bpi.USD.rate, " $"))
                    .addField("GBP", "".concat(bCoin.data.bpi.GBP.rate, " \u00A3"))
                    .addField("EUR", "".concat(bCoin.data.bpi.EUR.rate, " \u20AC"))
                    .setImage("https://imageio.forbes.com/specials-images/imageserve/5ee010bdfba0f20006929875/A-picture-of-bitcoin--a-cryptocurrency-/960x0.jpg?fit=bounds&format=jpg&width=960");
                return [4 /*yield*/, message.channel.send({ embeds: [embed] })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
//? Weather Checker City API
//Todo Forecast implementation
client.on("messageCreate", function (message) { return __awaiter(void 0, void 0, void 0, function () {
    function mergeMessageArgs() {
        var elem = "";
        for (var i = 1; i < messageArgs.length; i++) {
            elem += messageArgs[i];
            elem += " ";
        }
        return elem.trim();
    }
    var embed, baseUrl, messageArgs, today, weather, actualWeather_1, checkWeatherDescription;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                baseUrl = "http://api.weatherstack.com";
                messageArgs = message.content.split(" ");
                today = new Date();
                if (!(messageArgs[0] === prefix + "weather")) return [3 /*break*/, 3];
                return [4 /*yield*/, axios_1["default"].get("".concat(baseUrl, "/current?access_key=").concat(process.env.WEATHER_API_KEY, "&query=").concat(mergeMessageArgs()))];
            case 1:
                weather = _b.sent();
                actualWeather_1 = weather.data.current;
                checkWeatherDescription = function () {
                    var wDescription = "";
                    if (actualWeather_1.weather_descriptions.toString() === "Overcast") {
                        wDescription = "Overspread (more then 95% covered in clouds)";
                    }
                    else {
                        wDescription = actualWeather_1.weather_descriptions.toString();
                    }
                    return wDescription;
                };
                embed = new discord_js_1["default"].MessageEmbed()
                    .setTitle("Weather forecast to any city in the world")
                    .setColor("BLUE")
                    .setImage((_a = actualWeather_1.weather_icons[0]) === null || _a === void 0 ? void 0 : _a.toString())
                    .setFooter({ text: today.toString() })
                    .addField("Weather", checkWeatherDescription())
                    .addField("Temperature", "".concat(actualWeather_1.temperature.toString(), "\u00B0C"))
                    .addField("Wind Speed (Széllökések)", "".concat(actualWeather_1.wind_speed.toString(), " km/h"))
                    .addField("Humidity (Páratartalom)", "".concat(actualWeather_1.humidity.toString(), "%"))
                    .addField("Visibility", actualWeather_1.visibility.toString())
                    .addField("Country", weather.data.location.country.toString())
                    .addField("Region", weather.data.location.region.toString());
                return [4 /*yield*/, message.channel.send({ embeds: [embed] })];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
//? Random Chuck Norris terrible jokes API
client.on("messageCreate", function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var embed, messageArgs, joke;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                messageArgs = message.content.split(" ");
                if (!(messageArgs[0] === prefix + "rjoke")) return [3 /*break*/, 3];
                return [4 /*yield*/, axios_1["default"].get("https://api.chucknorris.io/jokes/random")];
            case 1:
                joke = _a.sent();
                embed = new discord_js_1["default"].MessageEmbed()
                    .setTitle("Random joke")
                    .setImage(joke.data.icon_url)
                    .setDescription(joke.data.value)
                    .setColor("BLUE")
                    .setFooter({ text: "Author: Rolca" });
                return [4 /*yield*/, message.channel.send({ embeds: [embed] })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
//? Currency Exchange from EUR to HUF API
client.on("messageCreate", function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var messageArgs, embed, arfolyam;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                messageArgs = message.content.split(" ");
                arfolyam = 0;
                if (!(messageArgs[0] === prefix + "euro")) return [3 /*break*/, 3];
                return [4 /*yield*/, axios_1["default"]
                        .get("https://cdn.moneyconvert.net/api/latest.json")
                        .then(function (response) {
                        arfolyam = response.data.rates.HUF / response.data.rates.EUR;
                    })];
            case 1:
                _a.sent();
                embed = new discord_js_1["default"].MessageEmbed()
                    .setTitle("1 EUR TO HUF ")
                    .setColor("BLUE")
                    .setDescription(arfolyam.toFixed(3).toString())
                    .setFooter({ text: "Author: Rolca" });
                return [4 /*yield*/, message.channel.send({ embeds: [embed] })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
//? Pest foods
client.on("messageCreate", function (message) {
    var embed;
    var messageArgs = message.content.split(" ");
    var menus = [
        {
            name: "Buddies Burger",
            image: "https://scontent-vie1-1.xx.fbcdn.net/v/t1.6435-9/124568957_2721949511388186_216917745366969433_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=730e14&_nc_ohc=Lp2Mop6VkzEAX8DOH0m&_nc_ht=scontent-vie1-1.xx&oh=00_AT9ccwSDGbxi0BT2Eemq-0kQeHSFDvGjxqnQtX89IJ-8ZQ&oe=624AD1BC"
        },
        {
            name: "Bamba marha Deák",
            image: "https://www.bambamarha.hu/wp-content/uploads/2021/05/Elvis-Burger-scaled.jpg"
        },
        {
            name: "WaffaLab",
            image: "https://media-cdn.tripadvisor.com/media/photo-o/12/d0/d2/8a/partial-menu.jpg"
        },
        {
            name: "WaffleDog",
            image: "https://media-cdn.tripadvisor.com/media/photo-o/11/e1/47/28/waffle-dog.jpg"
        },
        {
            name: "Go-Free-Bar",
            image: "https://media-cdn.tripadvisor.com/media/photo-w/19/c2/dd/ed/2019-1021-1027-ig.jpg"
        },
    ];
    if (messageArgs[0] === prefix + "pestikajak") {
        embed = new discord_js_1["default"].MessageEmbed()
            .setTitle("Pesti kaják")
            .setColor("BLUE")
            .setImage("https://media-cdn.tripadvisor.com/media/photo-w/19/c2/dd/ed/2019-1021-1027-ig.jpg")
            .setThumbnail("https://media-cdn.tripadvisor.com/media/photo-o/11/e1/47/28/waffle-dog.jpg")
            .addField(menus[0].name, menus[0].image)
            .addField(menus[1].name, menus[1].image)
            .addField(menus[2].name, menus[2].image)
            .addField(menus[3].name, menus[3].image)
            .addField(menus[4].name, menus[4].image);
        message.channel.send({ embeds: [embed] });
    }
});
client.login(process.env.TOKEN);
