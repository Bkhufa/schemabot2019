var feedback = function(res) {
    if (res.success === true) {
        var get_link = res.data.link.replace(/^http:\/\//i, 'https://');
        // var get_link = res.data.link;
        var kode = get_link.replace("https://i.imgur.com/", "");
        kode = kode.replace(".png", "");
        kode = kode.replace(".jpg", "");
        document.querySelector('.status').classList.add('bg-success');
        document.querySelector('.status').innerHTML =
            // 'Image : ' + '<br><input class="image-url" disabled value=\"' + kode + '\"/>' + '<img class="img" alt="Imgur-Upload" src=\"' + get_link + '\"/>';
            'BOT CODE (Case Sensitive) : ' + '<p class="image-url">'+ kode + '</p>' + '<img class="img" alt="Imgur-Upload" src=\"' + get_link + '\"/>';
    }
};

new Imgur({
    clientid: '7cddc10c539d1c2', //You can change this ClientID
    callback: feedback
});