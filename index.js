const {
    Client,
    GatewayIntentBits,
    Collection
} = require("discord.js");

const fs = require("fs");
require("dotenv").config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});


client.commands = new Collection();


// Load Commands
const commandFiles = fs.readdirSync("./commands");

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


// Load Events
const eventFiles = fs.readdirSync("./events");

for (const file of eventFiles) {

    const event = require(`./events/${file}`);

    if(event.once){
        client.once(event.name, (...args)=>{
            event.execute(...args, client);
        });
    }
    else{
        client.on(event.name, (...args)=>{
            event.execute(...args, client);
        });
    }
}


// Slash command interaction

client.on("interactionCreate", async interaction => {

    if(!interaction.isChatInputCommand()) return;


    const command = client.commands.get(
        interaction.commandName
    );


    if(!command) return;


    try{

        await command.execute(interaction);

    }
    catch(error){

        console.log(error);

        interaction.reply({
            content:"❌ Error",
            ephemeral:true
        });

    }

});



client.login(process.env.TOKEN);