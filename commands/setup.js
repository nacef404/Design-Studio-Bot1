const {
SlashCommandBuilder,
EmbedBuilder
} = require("discord.js");


module.exports = {

name:"setup",


data:new SlashCommandBuilder()

.setName("setup")

.setDescription("Create custom setup embed")

.addStringOption(option =>
option
.setName("title")
.setDescription("Embed title")
.setRequired(true)
)

.addStringOption(option =>
option
.setName("description")
.setDescription("Embed description")
.setRequired(true)
),


async execute(interaction){


const title =
interaction.options.getString("title");


const description =
interaction.options.getString("description");



const embed = new EmbedBuilder()

.setTitle(title)

.setDescription(description)

.setColor("Blue")

.setTimestamp();



await interaction.channel.send({

embeds:[embed]

});



interaction.reply({

content:"✅ Setup message created",

ephemeral:true

});


}

};
