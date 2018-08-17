const request = require('request');
const cheerio = require('cheerio');
const download = require('image-downloader')
const fs = require('fs');
const writeStream = fs.createWriteStream('export.csv'); //

writeStream.write(`src \n`) //Write Headers

const url = 'http://unsplash.com'; // URL you want to scrape
console.log('Scraping...');
request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        $('img').each((i, el) => { // Loops through each img
            const item = $(el).attr('src'); // Looks for src attribute
            let file = i;
            if (item !== undefined) {
                writeStream.write(item + '\n'); // Writes to new line in csv
            }
            // Image Downloader
            const dir = 'download'; // Folder where images are downloaded
            const options = {
                url: item,
                dest: `./${dir}/${file}.jpg`
            }
            if (!fs.existsSync(dir)) { // Checks if folder exists and if not, then creates it
                fs.mkdirSync(dir);
            }
            download.image(options)
                .then(({ filename, image }) => {
                    console.log('File saved to', filename)
                })
                .catch((err) => {
                    console.error(err)
                })
        });
        console.log('Scrape done');

    } else {
        console.log(error);
    }
});

