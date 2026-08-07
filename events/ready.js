module.exports = {
    name: "ready",
    once: true,

    execute(client){

        console.log(`✅ ${client.user.tag} Online`);

        client.user.setActivity("🎨 Design Studio");
    }
};