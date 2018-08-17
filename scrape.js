const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('export.csv'); //
console.log('Creating file...');
//Write Headers
writeStream.write(`src \n`)

const url = 'http://unsplash.com'; // URL you want to scrape
console.log('Scraping...');
request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        $('img').each((i, el) => { // Loops through each img
            const item = $(el).attr('src'); // Looks for src attribute
            if (item !== undefined) {
                writeStream.write(item + '\n'); // Writes to new line in csv
            }
        });
        console.log('Scrape done');
    } else {
        console.log(error);
    }
});