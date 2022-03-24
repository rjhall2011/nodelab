const path = require('path');
const fs = require('fs');
const rp = require('request-promise');

const dataPath = path.join(__dirname, './downloads');

rp('https://reddit.com/r/popular.json')
    .then((res) => {
        let resParsed = JSON.parse(res);
        let articles = resParsed.data.children.map(item => {
            if (path.extname(item.data.url) === '.jpg' || path.extname(item.data.url) === '.png' || path.extname(item.data.url) === '.gifv'){
               
                rp(item.data.url).pipe(fs.createWriteStream(`./downloads/${item.data.id}${path.extname(item.data.url)}`));
               
            }
        });                
        
       
    })
   .catch((err) => {
        console.log(err);
    });