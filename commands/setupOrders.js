const {
SlashCommandBuilder,
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
} = require("discord.js");


module.exports = {

data: new SlashCommandBuilder()

.setName("setuporders")

.setDescription("Create orders panel"),



async execute(interaction){


const embed = new EmbedBuilder()

.setColor("Purple")

.setTitle("🎨 Design Studio")

.setDescription(
`
Welcome to our Design Studio

🖌 Logo Design
🖼 Banner Design
💻 Discord Design
📱 Social Media Design


Click the button below to create your order.
`
);



const row = new ActionRowBuilder()

.addComponents(

new ButtonBuilder()

.setCustomId("new_order")

.setLabel("🛒 Create Order")

.setStyle(ButtonStyle.Primary)

);



await interaction.channel.send({

embeds:[embed],

components:[row]

});



await interaction.reply({

content:"✅ Orders panel created",

ephemeral:true

});


}

};
