const axios = require('axios');
const marked = require('marked');

const fwImages = axios.create({
    baseURL: 'https://fwupdate.herokuapp.com',
    timeout: 1500,
    method: 'get'
});

fwImages.get('/images').then((res) => {
    console.log(res.data);

    document.getElementById("markdownContent").innerHTML = marked(res.data[0].changelog);
});