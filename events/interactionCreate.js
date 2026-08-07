const {
    ChannelType,
    PermissionFlagsBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const fs = require("fs");

const ordersFile = "./data/orders.json";


module.exports = {

name: "interactionCreate",

async execute(interaction, client) {


if (!interaction.isButton()) return;



// Create Order

if (interaction.customId === "create_order") {


let orders = JSON.parse(
fs.readFileSync(ordersFile)
);



let order = {

id: Date.now(),

client: interaction.user.id,

service: "Not Selected",

designer: "Not Assigned",

status: "Pending"

};



orders.push(order);



fs.writeFileSync(
ordersFile,
JSON.stringify(orders,null,2)
);



const channel = await interaction.guild.channels.create({

name:`order-${interaction.user.username}`,

type:ChannelType.GuildText,


permissionOverwrites:[

{
id: interaction.guild.id,

deny:[
PermissionFlagsBits.ViewChannel
]

},


{
id: interaction.user.id,

allow:[
PermissionFlagsBits.ViewChannel,
PermissionFlagsBits.SendMessages
]

}

]

});



const embed = new EmbedBuilder()

.setColor("Blue")

.setTitle(`🛒 Order #${order.id}`)

.setDescription(
`
Client:
${interaction.user}


Service:
${order.service}


Status:
🟡 Pending
`
);



const buttons = new ActionRowBuilder()

.addComponents(

new ButtonBuilder()

.setCustomId("complete_order")

.setLabel("✅ Complete")

.setStyle(ButtonStyle.Success),


new ButtonBuilder()

.setCustomId("cancel_order")

.setLabel("❌ Cancel")

.setStyle(ButtonStyle.Danger)

);



channel.send({

embeds:[embed],

components:[buttons]

});



interaction.reply({

content:`✅ Order Created: ${channel}`,

ephemeral:true

});


}




// Complete Order

if(interaction.customId === "complete_order"){


interaction.reply({

content:"🟢 Order Completed",

ephemeral:true

});


}



// Cancel Order

if(interaction.customId === "cancel_order"){


interaction.reply({

content:"🔴 Order Cancelled",

ephemeral:true

});


}



}

};
