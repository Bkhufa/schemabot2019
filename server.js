// BOT SCHEMATICS 2019

const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');
var imgur = require('imgur');

var linebot = require('linebot');



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
    
    var kode;
    var gambar;
  
  
    if(event.message.text == event.message.image){
      let foto = event.message.image
      // gambar = client.getMessageContent(event.message.image);
      // gambar = client.getMessageContent(event.message.messageId);
      // client.getMessageContent(gambar);
      // gambar = event.message.image;
      // gambar.toString('base64');
      // JSON.stringify(gambar);
      // let objJsonStr = JSON.stringify(client.getMessageContent(event.message.image));
      // gambar = Buffer.from(objJsonStr).toString("base64");
      // let gbr64 = Buffer.from(objJsonStr).toString("base64");
      
      var content = client.getMessageContent(event.message.image)
        .then((stream) => {
          stream.on(gambar, (chunk) => {
              // gambar.write(content)
          });
          stream.on('error', (err) => {
            gambar = toString(err);
          });
        });      
      
      var feedbacc;
      
      // imgur.uploadBase64(gambar)
      //   .then(function (JSON) {
      //       feedbacc = JSON.data.link;
      //   })
      //   .catch(function (err) {
      //       feedbacc = JSON.err.message;
      //   });
      
      // const echo = [{ type: 'text', text: "ini gambar" }];
      const echo = [{ type: 'text', text: "ini gambar" },{ type: 'text', text: typeof(gambar) }];
      // const echo = [{ type: 'text', text: "ini gambar" },{ type: 'text', text: typeof(gambar) },{ message: {"id": foto, "type": "image"}}];
      return client.replyMessage(event.replyToken, echo);  
    }
  
    var teks = event.message.text;
    var gam = event.message.image;
    var jawab = teks.toLowerCase();
    var data = teks.split(' ');
  
    if(jawab == "hi" || jawab == "hai" || jawab == "halo"){
      const echo = { type: 'text', text: "Sorry kalo lama, \ngue kerja sendiri ini caphe :(" };
      return client.replyMessage(event.replyToken, echo);
    }
  
    else if(data[0] == "#"){
        kode = data[1];
        const echo = [
          {type: "text", text: "Jika gambar tidak keluar, kode yang anda masukkan salah"},
          {"type": "image", size: "full",
          "originalContentUrl": "https://i.imgur.com/"+kode+".png",
          "previewImageUrl": "https://i.imgur.com/"+kode+".png",
        }];
        return client.replyMessage(event.replyToken, echo);
    }
  
  else{
    // const echo = { type: 'text', text: event.message.text };
    const echo = [{ type: 'text', text: "Ambil foto dengan mengetik: \n\n#[spasi][7 digit kode]\n\ncontoh:" },{type: 'text', text: "# 7GPrl7B"}];
    return client.replyMessage(event.replyToken, echo);
  }
  
}

// listen on port
const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});