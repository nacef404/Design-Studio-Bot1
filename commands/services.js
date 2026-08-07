const {
SlashCommandBuilder,
EmbedBuilder
}=require("discord.js");

const services=require("../data/services.json");


module.exports={


name:"services",


data:new SlashCommandBuilder()

.setName("services")

.setDescription("Show design services"),



async execute(interaction){


let text="";


services.forEach(service=>{

text += 
`
?? ${service.name}
?? Price: ${service.price}

`;

});


const embed=new EmbedBuilder()

.setTitle("?? Our Services")

.setDescription(text)

.setColor("Blue");



interaction.reply({

embeds:[embed]

});


}


}