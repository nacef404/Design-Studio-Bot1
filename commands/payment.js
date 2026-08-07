const {
SlashCommandBuilder,
EmbedBuilder,
PermissionFlagsBits
}=require("discord.js");

const fs=require("fs");

const file="./data/payments.json";



module.exports={


name:"payment",



data:new SlashCommandBuilder()

.setName("payment")

.setDescription("Payment System")


.addStringOption(opt=>

opt
.setName("client")
.setDescription("Client name")
.setRequired(true)

)


.addStringOption(opt=>

opt
.setName("price")
.setDescription("Price")
.setRequired(true)

)


.addStringOption(opt=>

opt
.setName("service")
.setDescription("Service")
.setRequired(true)

),




async execute(interaction){



if(!interaction.member.permissions.has(
PermissionFlagsBits.Administrator
))
return interaction.reply({

content:"? No Permission",

ephemeral:true

});



let payments =
JSON.parse(
fs.readFileSync(file)
);



let payment={


id:
Date.now(),


client:
interaction.options.getString("client"),


price:
interaction.options.getString("price"),


service:
interaction.options.getString("service"),


status:"? Paid"

};



payments.push(payment);



fs.writeFileSync(

file,

JSON.stringify(
payments,
null,
2
)

);



const embed=new EmbedBuilder()

.setTitle("?? Payment Added")

.setColor("Green")

.setDescription(

`
Client:
${payment.client}


Service:
${payment.service}


Price:
${payment.price}


Status:
${payment.status}
`

);



interaction.reply({

embeds:[embed]

});


}



}