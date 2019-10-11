// BOT SCHEMATICS 2019

const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');
var imgur = require('imgur');


const config = {
  channelAccessToken: "4c5Td99Iw1+PaKoP0y+S6BH7R8nDqkcXXdKFquweRadO3SfCN7RQlEaPk2M8HaGZDDaYkDGyiHroggyty6OrsS3jvepUWs6Eslf87BKcM+rG79JucF+s1Nu5trhIghfHWy2bqo5Bn7HdyfPbTMccHAdB04t89/1O/w1cDnyilFU=",
  channelSecret: "ac789ef0ee34ba5f7e3b8e04aa3434f5",
};

imgur.setClientId('7cddc10c539d1c2');
imgur.getClientId();
imgur.setAPIUrl('https://api.imgur.com/3/');
imgur.getAPIUrl();
// imgur.setMashapeKey(https://imgur-apiv3.p.mashape.com/);
// imgur.getMashapeKey()
imgur.setCredentials('schematics2019@gmail.com', 'schematics123', '7cddc10c539d1c2');


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
    var teks = event.message.text
    var jawab = teks.toLowerCase()
    var data = teks.split(' ')
    
    var kode;
    var gambar;
  
    if(teks == event.message.image){
      client.getMessageContent(gambar)
      if(gambar != 0){
        // const echo = { type: 'text', text: gambar };
        return client.replyMessage(event.replyToken, gambar);  
      }
    }
  
    if(jawab == "hi" || jawab == "hai" || jawab == "halo"){
      const echo = { type: 'text', text: "Sorry kalo lama, \ngue kerja sendiri ini caphe :(" };
      return client.replyMessage(event.replyToken, echo);
    }
  
    if(data[0] == "#"){
        kode = data[1];
        const echo = [
          {type: "text", text: "Jika gambar tidak keluar, kode yang anda masukkan salah"},
          {"type": "image",
          "originalContentUrl": "https://i.imgur.com/"+kode+".png",
          "previewImageUrl": "https://i.imgur.com/"+kode+".png",
        }]
        return client.replyMessage(event.replyToken, echo);
    }
  
  else{
    // const echo = { type: 'text', text: event.message.text };
    const echo = { type: 'text', text: "Ambil foto dengan mengetik: \n\n#[spasi][7 digit kode]\n\ncontoh:  # asfIesc" };
    return client.replyMessage(event.replyToken, echo);
  }
  
}

// listen on port
const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});