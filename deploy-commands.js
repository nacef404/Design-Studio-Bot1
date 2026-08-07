const { REST, Routes } = require("discord.js");
const fs = require("fs");
require("dotenv").config();

const commands = [];

const commandFiles = fs.readdirSync("./commands")
.filter(file => file.endsWith(".js"));


for (const file of commandFiles) {

const command = require(`./commands/${file}`);

commands.push(command.data.toJSON());

}


const rest = new REST({version:"10"})
.setToken(process.env.TOKEN);



(async()=>{

try{


console.log("🔄 Updating Commands...");


await rest.put(

Routes.applicationCommands(
"1491984533317222420"
),

{
body:commands
}

);


console.log("✅ Commands Registered");


}catch(error){

console.error(error);

}


})();