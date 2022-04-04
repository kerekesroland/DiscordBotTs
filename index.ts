import DiscordJS, { Intents, Message, MessageEmbed } from "discord.js";
import dotenv from "dotenv";
import "ts-replace-all";
import axios from "axios";

dotenv.config();
const prefix = ".";

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_BANS,
    ],
});

client.on("ready", () => console.log("Rolcabot is Online!"));

//? Reminder command
client.on("messageCreate", (message: DiscordJS.Message) => {
    const kiir = () => {
        message.channel.send(
            `${messageArgs.toString().substring(26).replaceAll(",", " ")}` +
                "\n" +
                "<@" +
                message.author +
                ">"
        );
    };
    let currentTime = +new Date();
    const messageArgs = message.content.split(" ");

    let desiredTime = +new Date(
        `${messageArgs[1]}$/${messageArgs[2]}/${messageArgs[3]} ${messageArgs[4]}:${messageArgs[5]}`
    );

    let delay = desiredTime - currentTime;
    let timeout;
    if (message.author.bot) {
        return;
    } else if (messageArgs[0] === prefix + "remindme") {
        if (delay <= 2073600000) {
            timeout = setTimeout(kiir, delay);
            message.channel.send(
                `Reminder set to: ${messageArgs[1]}/${messageArgs[2]}/${messageArgs[3]} ${messageArgs[4]}:${messageArgs[5]}`
            );
        } else {
            message.channel.send(
                "U can set a reminder of a maximum 24 day forward"
            );
        }
    }
});

//? Reminder help
client.on("messageCreate", (message: DiscordJS.Message) => {
    type messageArgsType = string[];
    const messageArgs: messageArgsType = message.content.split(" ");
    let embed: any;
    if (messageArgs[0] === prefix + "reminderHelp") {
        embed = new DiscordJS.MessageEmbed()
            .setTitle("Reminder command usage (Maximum: 24 days forward)")
            .setDescription(
                "```css\n" + "Example: .remindme 2022 01 24 16 30" + "```"
            )
            .setColor("BLUE")
            .setFooter("Author: Rolca")
            .setImage(
                "https://cdn.discordapp.com/attachments/836985486836891698/935289057611743262/received_389504359616689.jpeg"
            );
        message.channel.send({ embeds: [embed] });
    }
});

//? Congratulator to Kocsikri
client.on("messageCreate", (message: DiscordJS.Message) => {
    let counter = 0;
    let interval: any;
    function sendCongratsToKocsikri() {
        if (counter > 4) {
            clearInterval(interval);
        } else {
            message.channel.send(
                "Congrats Kocsikri, u da beast 🎈✨🎉🎂🍰✨🌟🦅"
            );
            counter++;
        }
    }

    function timer() {
        interval = setInterval(sendCongratsToKocsikri, 10000);
    }
    const messageArgs: any = message.content.split(" ");
    if (messageArgs[0] === prefix + "congrats") {
        timer();
    }
});

//? Timetable command
client.on("messageCreate", (message: DiscordJS.Message) => {
    let embed: any;
    const messageArgs: any = message.content.split(" ");
    if (messageArgs[0] === prefix + "orarend") {
        embed = new DiscordJS.MessageEmbed()
            .setTitle("Your TimeTable")
            .setColor("BLUE")
            .setFooter("Author: Rolca")
            .setImage(
                "https://cdn.discordapp.com/attachments/836985486836891698/937714145158103100/unknown.png"
            );
        message.channel.send({ embeds: [embed] });
    }
});

//? .albi command (summon Kocsikri command)
client.on("messageCreate", (message: DiscordJS.Message) => {
    const messageArgs = message.content.split(" ");
    if (messageArgs[0] === prefix + "albi") {
        message.channel.send("<@!590212903928463386>");
        message.channel.send("<@!215076664349163520>");
        message.channel.send("Let's go find albi!!");
    }
});

//? Random cat picture

client.on("messageCreate", async (message: DiscordJS.Message) => {
    const messageArgs = message.content.split(" ");
    let embed: any;
    if (messageArgs[0] === prefix + "rcat") {
        const cica = await axios.get(
            "https://api.thecatapi.com/v1/images/search"
        );
        embed = new DiscordJS.MessageEmbed()
            .setTitle("Random cica")
            .setColor("BLUE")
            .setFooter({ text: "Author: Rolca" })
            .setImage(cica.data[0].url);
        await message.channel.send({ embeds: [embed] });
    }
});

//? Bitcoin Tracker API
client.on("messageCreate", async (message: DiscordJS.Message) => {
    let today = new Date();
    const messageArgs = message.content.split(" ");
    let embed: any;
    if (messageArgs[0] === prefix + "bitcoin") {
        const bCoin = await axios.get(
            "https://api.coindesk.com/v1/bpi/currentprice.json/"
        );
        embed = new DiscordJS.MessageEmbed()
            .setTitle("Bitcoin in USD, GDP, EUR at the moment")
            .setColor("BLUE")
            .setFooter({ text: today.toString() })
            .addField("USD", `${bCoin.data.bpi.USD.rate} $`)
            .addField("GBP", `${bCoin.data.bpi.GBP.rate} £`)
            .addField("EUR", `${bCoin.data.bpi.EUR.rate} €`)
            .setImage(
                "https://imageio.forbes.com/specials-images/imageserve/5ee010bdfba0f20006929875/A-picture-of-bitcoin--a-cryptocurrency-/960x0.jpg?fit=bounds&format=jpg&width=960"
            );
        await message.channel.send({ embeds: [embed] });
    }
});

//? Weather Checker City API
//Todo Forecast implementation
client.on("messageCreate", async (message: DiscordJS.Message) => {
    let embed: MessageEmbed;
    const baseUrl = `http://api.weatherstack.com`;
    const messageArgs = message.content.split(" ");

    function mergeMessageArgs() {
        let elem = "";
        for (let i = 1; i < messageArgs.length; i++) {
            elem += messageArgs[i];
            elem += " ";
        }
        return elem.trim();
    }

    let today = new Date();
    if (messageArgs[0] === prefix + "weather") {
        const weather = await axios.get(
            `${baseUrl}/current?access_key=${
                process.env.WEATHER_API_KEY
            }&query=${mergeMessageArgs()}`
        );
        const actualWeather = weather.data.current;

        const checkWeatherDescription = () => {
            let wDescription = "";
            if (actualWeather.weather_descriptions.toString() === "Overcast") {
                wDescription = "Overspread (more then 95% covered in clouds)";
            } else {
                wDescription = actualWeather.weather_descriptions.toString();
            }
            return wDescription;
        };

        embed = new DiscordJS.MessageEmbed()
            .setTitle("Weather forecast to any city in the world")
            .setColor("BLUE")
            .setImage(actualWeather.weather_icons[0]?.toString())
            .setFooter({ text: today.toString() })
            .addField("Weather", checkWeatherDescription())
            .addField(
                "Temperature",
                `${actualWeather.temperature.toString()}°C`
            )
            .addField(
                "Wind Speed (Széllökések)",
                `${actualWeather.wind_speed.toString()} km/h`
            )
            .addField(
                "Humidity (Páratartalom)",
                `${actualWeather.humidity.toString()}%`
            )
            .addField("Visibility", actualWeather.visibility.toString())
            .addField("Country", weather.data.location.country.toString())
            .addField("Region", weather.data.location.region.toString());

        await message.channel.send({ embeds: [embed] });
    }
});

//? Random Chuck Norris terrible jokes API
client.on("messageCreate", async (message: DiscordJS.Message) => {
    let embed: MessageEmbed;
    const messageArgs = message.content.split(" ");
    if (messageArgs[0] === prefix + "rjoke") {
        const joke = await axios.get("https://api.chucknorris.io/jokes/random");
        embed = new DiscordJS.MessageEmbed()
            .setTitle("Random joke")
            .setImage(joke.data.icon_url)
            .setDescription(joke.data.value)
            .setColor("BLUE")
            .setFooter({ text: "Author: Rolca" });
        await message.channel.send({ embeds: [embed] });
    }
});

//? Currency Exchange from EUR to HUF API
client.on("messageCreate", async (message: DiscordJS.Message) => {
    const messageArgs = message.content.split(" ");
    let embed: MessageEmbed;
    let arfolyam: number = 0;
    if (messageArgs[0] === prefix + "euro") {
        await axios
            .get(`https://cdn.moneyconvert.net/api/latest.json`)
            .then((response) => {
                arfolyam = response.data.rates.HUF / response.data.rates.EUR;
            });
        embed = new DiscordJS.MessageEmbed()
            .setTitle("1 EUR TO HUF ")
            .setColor("BLUE")
            .setDescription(arfolyam.toFixed(3).toString())
            .setFooter({ text: "Author: Rolca" });

        await message.channel.send({ embeds: [embed] });
    }
});

//? Pest foods
client.on("messageCreate", (message: DiscordJS.Message) => {
    let embed: MessageEmbed;
    interface MenuType {
        name: string;
        image: string;
    }
    const messageArgs = message.content.split(" ");

    let menus: Array<MenuType> = [
        {
            name: "Buddies Burger",
            image: "https://scontent-vie1-1.xx.fbcdn.net/v/t1.6435-9/124568957_2721949511388186_216917745366969433_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=730e14&_nc_ohc=Lp2Mop6VkzEAX8DOH0m&_nc_ht=scontent-vie1-1.xx&oh=00_AT9ccwSDGbxi0BT2Eemq-0kQeHSFDvGjxqnQtX89IJ-8ZQ&oe=624AD1BC",
        },
        {
            name: "Bamba marha Deák",
            image: "https://www.bambamarha.hu/wp-content/uploads/2021/05/Elvis-Burger-scaled.jpg",
        },
        {
            name: "WaffaLab",
            image: "https://media-cdn.tripadvisor.com/media/photo-o/12/d0/d2/8a/partial-menu.jpg",
        },
        {
            name: "WaffleDog",
            image: "https://media-cdn.tripadvisor.com/media/photo-o/11/e1/47/28/waffle-dog.jpg",
        },
        {
            name: "Go-Free-Bar",
            image: "https://media-cdn.tripadvisor.com/media/photo-w/19/c2/dd/ed/2019-1021-1027-ig.jpg",
        },
    ];
    if (messageArgs[0] === prefix + "pestikajak") {
        embed = new DiscordJS.MessageEmbed()
            .setTitle("Pesti kaják")
            .setColor("BLUE")
            .setImage(
                "https://media-cdn.tripadvisor.com/media/photo-w/19/c2/dd/ed/2019-1021-1027-ig.jpg"
            )
            .setThumbnail(
                "https://media-cdn.tripadvisor.com/media/photo-o/11/e1/47/28/waffle-dog.jpg"
            )
            .addField(menus[0].name, menus[0].image)
            .addField(menus[1].name, menus[1].image)
            .addField(menus[2].name, menus[2].image)
            .addField(menus[3].name, menus[3].image)
            .addField(menus[4].name, menus[4].image);

        message.channel.send({ embeds: [embed] });
    }
});

client.login(process.env.TOKEN);
