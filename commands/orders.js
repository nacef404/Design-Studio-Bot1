const {
SlashCommandBuilder,
EmbedBuilder
}=require("discord.js");

const fs=require("fs");


module.exports={


name:"orders",



data:new SlashCommandBuilder()

.setName("orders")

.setDescription("Show orders"),



async execute(interaction){


let orders =
JSON.parse(
fs.readFileSync(
"./data/orders.json"
)
);



if(!orders.length)

return interaction.reply(
"📭 No Orders"
);



let text="";



orders.forEach(order=>{


text +=

`
🛒 Order #${order.id}

Client:
<@${order.client}>

Status:
${order.status}

Designer:
${order.designer}


`;

});



const embed=new EmbedBuilder()

.setTitle("📋 Orders List")

.setDescription(text)

.setColor("Purple");



interaction.reply({

embeds:[embed]

});


}


}