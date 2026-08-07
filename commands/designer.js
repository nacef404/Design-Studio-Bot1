const {
SlashCommandBuilder,
EmbedBuilder,
PermissionFlagsBits
}=require("discord.js");

const fs = require("fs");

const file="./data/designers.json";


module.exports={

name:"designer",


data:new SlashCommandBuilder()

.setName("designer")

.setDescription("Designer Management")

.addSubcommand(sub =>
sub
.setName("add")
.setDescription("Add Designer")
.addUserOption(opt =>
opt
.setName("user")
.setDescription("Designer")
.setRequired(true)
)
)


.addSubcommand(sub =>
sub
.setName("remove")
.setDescription("Remove Designer")
.addUserOption(opt =>
opt
.setName("user")
.setDescription("Designer")
.setRequired(true)
)
)


.addSubcommand(sub =>
sub
.setName("stats")
.setDescription("Designer Stats")
.addUserOption(opt =>
opt
.setName("user")
.setDescription("Designer")
.setRequired(true)
)
),



async execute(interaction){


if(!interaction.member.permissions.has(
PermissionFlagsBits.Administrator
))
return interaction.reply({
content:"? No Permission",
ephemeral:true
});



let designers=JSON.parse(
fs.readFileSync(file)
);



let user =
interaction.options.getUser("user");



let action =
interaction.options.getSubcommand();



// ADD


if(action==="add"){


designers.push({

id:user.id,

name:user.username,

orders:0,

earnings:"0$"

});


fs.writeFileSync(
file,
JSON.stringify(designers,null,2)
);



return interaction.reply(
`? ${user} added as Designer`
);


}



// REMOVE


if(action==="remove"){


designers =
designers.filter(
d=>d.id!==user.id
);



fs.writeFileSync(
file,
JSON.stringify(designers,null,2)
);



return interaction.reply(
`? ${user} removed`
);


}



// STATS


if(action==="stats"){


let designer =
designers.find(
d=>d.id===user.id
);



if(!designer)
return interaction.reply(
"? Designer not found"
);



const embed=new EmbedBuilder()

.setTitle("?? Designer Statistics")

.setDescription(
`
Designer:
${user}

Completed Orders:
${designer.orders}

Earnings:
${designer.earnings}
`
)

.setColor("Purple");



interaction.reply({
embeds:[embed]
});


}


}


}