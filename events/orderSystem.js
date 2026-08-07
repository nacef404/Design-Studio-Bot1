const {
ChannelType,
PermissionFlagsBits,
EmbedBuilder
} = require("discord.js");

const fs = require("fs");


const file = "./data/orders.json";


module.exports = {


name:"interactionCreate",



async execute(interaction){


if(!interaction.isButton()) return;



if(interaction.customId === "new_order"){


let orders = JSON.parse(
fs.readFileSync(file)
);



let order = {

id: Date.now(),

user: interaction.user.id,

status:"Pending"

};



orders.push(order);



fs.writeFileSync(

file,

JSON.stringify(orders,null,2)

);



const channel =
await interaction.guild.channels.create({

name:`order-${interaction.user.username}`,

type:ChannelType.GuildText,


permissionOverwrites:[

{

id:interaction.guild.id,

deny:[
PermissionFlagsBits.ViewChannel
]

},

{

id:interaction.user.id,

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

Status:
🟡 Pending
`

);



channel.send({

embeds:[embed]

});



interaction.reply({

content:`✅ Your order created ${channel}`,

ephemeral:true

});


}


}


};
