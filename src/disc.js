// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const ib = require('./image_builder');
const fetch = require('cross-fetch');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('error', error => {
    console.log(error);
});

// Login to Discord with your client's token
client.login(process.env.TOKEN);

const invoke = async(body) => {

    console.log("invoked...")

    // get channelIds for the incoming guild event
    fetch(process.env.GRAPHQL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: `query Query($where: RegisteredGuildWhere) {
                registeredGuilds(where: $where) {
                    guildId
                    guildName
                    discordChannels {
                        channelId
                    }
                }
            }`,
            variables: `{
                "where": {
                    "guildId": "${body.InitiatingGuildId}"
                }
            }`
        })
      })
        .then(r => r.json())
        .then(d => sendToChannels(body, d.data.registeredGuilds[0].discordChannels))
        .catch(err => {
            console.error(err);
          });
}

const sendToChannels = async(body, channels) => {

    const buffer = await ib.drawSmall(body)

    // Send an embed with a local image inside
    channels.forEach(ch => {
        client.channels.fetch(ch["channelId"]).then(channel => {
            channel.send({
                embeds: [
                    {
                        title: `${body?.Killer?.Name} killed ${body?.Victim?.Name}`,
                        url: `https://albiononline.com/en/killboard/kill/${body?.EventId}`,
                        image: {
                            url: 'attachment://image.png'
                        }
                    }
                ],
                files: [{
                    attachment: buffer,
                    name: 'image.png',
                    description: 'killboard image'
                }]
            })
                .catch(console.error);
        })
    });
}

module.exports.invoke = invoke
