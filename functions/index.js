const functions = require('firebase-functions');
const request = require('request');

exports.pingpong = functions.https.onRequest((req, res) => {
    const immediateResponse = {
        "response_type": "ephemeral",
        "text": "I got it. I'll post it to the channel with some delay. Just in case ;)",
        "unfurl_links": false,
        "unfurl_media": false
    };

    res.send(immediateResponse);

    const receivedText = req.body.text;
    console.log("Received text: " + receivedText);
    const delayedResponseUrl = req.body.response_url;
    console.log("Response url: " + delayedResponseUrl);

    const channel = req.body.channel_name;
    const user = req.body.user_name;

    // User logs
    // console.log(user + " posted: " + receivedText +" in " + channel);

    const json = {
        "text": receivedText,
        "response_type": "in_channel",
        "unfurl_links": true,
        "unfurl_media": true
    };

    request({
        url: delayedResponseUrl,
        method: "POST",
        json: true,
        body: json
    }, (error, response, body) => {
        console.log("Delayed response sent.");
        console.log(response);
    });
});