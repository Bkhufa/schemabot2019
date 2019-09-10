// BOT SCHEMATICS 2019

const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');

const config = {
  channelAccessToken: "4c5Td99Iw1+PaKoP0y+S6BH7R8nDqkcXXdKFquweRadO3SfCN7RQlEaPk2M8HaGZDDaYkDGyiHroggyty6OrsS3jvepUWs6Eslf87BKcM+rG79JucF+s1Nu5trhIghfHWy2bqo5Bn7HdyfPbTMccHAdB04t89/1O/w1cDnyilFU=",
  channelSecret: "ac789ef0ee34ba5f7e3b8e04aa3434f5",
};

// create LINE SDK client
const client = new line.Client(config);
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((e)=>{
      console.log(e);
    });

});

// Code respon disini
function handleEvent(event) {
  
    var kode;
      
    if(event.message.text == "hi"){
      const echo = { type: 'text', text: "Test" };
      return client.replyMessage(event.replyToken, echo);
    }
    else if(event.message.text == "f"){
        kode = event.message.text;
        const echo = [{
          type: "text",
          text: kode},
          {"type": "image",
          // "originalContentUrl": "https://pbs.twimg.com/profile_images/1130769636230754305/Tgo1evQe.png",
          "originalContentUrl": "https://cdn.glitch.com/d81077ba-55e2-471b-a400-f63edc0b8a66%2Fhome-bar.e1ac3112.png?v=1568032880735" + kode,
          "previewImageUrl": "https://cdn.glitch.com/d81077ba-55e2-471b-a400-f63edc0b8a66%2Fhome-logo.eec52760.png?v=1568033028798u"
        }]
        return client.replyMessage(event.replyToken, echo);
      }
  
    const echo = { type: 'text', text: event.message.text };
     // use reply API
    return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});