const path = require('path');
const fs = require('fs');
const rp = require('request-promise');

const dataPath = path.join(__dirname, '/popular-articles.json');






rp('https://reddit.com/r/popular.json')
    .then((res) => {
        let resParsed = JSON.parse(res);
        let articles = resParsed.data.children.map(item => {
            return({
                title: item.data.title,
                url: item.data.url,
                author: item.data.author
            });
        });

         let redditArray = JSON.stringify(articles);
         fs.writeFile(dataPath, redditArray, (err) => {
              console.log(err);   
         })
    })
    .catch((err) => {
        console.log(err);
    });