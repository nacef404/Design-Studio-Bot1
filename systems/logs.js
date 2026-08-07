const { EmbedBuilder } = require("discord.js");
const config = require("../config.json");


async function sendLog(client,title,description){

const channel =
client.channels.cache.get(
config.channels.logs
);


if(!channel) return;


const embed = new EmbedBuilder()

.setTitle(title)

.setDescription(description)

.setColor("Blue")

.setTimestamp();



channel.send({
embeds:[embed]
});


}


module.exports = sendLog;