// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { channelID, token } = require('../config/config.json');
const ib = require('./image_builder')

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
client.login(token);

const invoke = async(body) => {
    const channel = await client.channels.fetch(channelID);

    const buffer = await ib.draw(body)

    // Send an embed with a local image inside
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
            description: 'A description of the file'
        }]
    })
        .catch(console.error);
}

module.exports.invoke = invoke
