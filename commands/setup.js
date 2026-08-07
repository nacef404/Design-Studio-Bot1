const {
SlashCommandBuilder,
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
}=require("discord.js");


module.exports={


name:"setup",


data:new SlashCommandBuilder()

.setName("setup")

.setDescription("Setup Design Studio Panel"),



async execute(interaction){


const embed=new EmbedBuilder()

.setColor("Purple")

.setTitle("?? Design Studio")

.setDescription(

`
Welcome to our Design Studio


?? Logo Design
?? Banner Design
?? Social Media Design
?? Discord Design


Click below to create your order.
`

);



const row=new ActionRowBuilder()

.addComponents(

new ButtonBuilder()

.setCustomId("create_order")

.setLabel("?? Create Order")

.setStyle(ButtonStyle.Primary)

);



await interaction.reply({

embeds:[embed],

components:[row]

});


}


}