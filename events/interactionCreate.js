const {
    ChannelType,
    PermissionFlagsBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const fs = require("fs");

module.exports = {

name:"interactionCreate",

async execute(interaction,client){


if(!interaction.isButton()) return;



// CREATE ORDER

const fs=require("fs");

const ordersFile="./data/orders.json";


// ???? create_order


let orders =
JSON.parse(
fs.readFileSync(ordersFile)
);


let order={

id:Date.now(),

client:interaction.user.id,

service:"Not Selected",

designer:"Not Assigned",

status:"Pending"

};



orders.push(order);



fs.writeFileSync(

ordersFile,

JSON.stringify(
orders,
null,
2
)

);