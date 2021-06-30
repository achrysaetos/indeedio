/*
Search terms on Indeed are funny:
  "software engineering intern" === "software engineering internship"
  !== 
  "software engineer internship" === "software engineer intern"
No need to scrape by date over relevance:
  It's the same dataset, only results will be less accurate.
No need to filter before scraping:
  You don't want to miss anything, and you can always filter after.
*/
const fs = require("fs");

const dataFromScraper = fs.readFileSync("./apify_output/scraper_engineer.json");
const scrapedOutput = JSON.parse(dataFromScraper.toString("utf-8"));

const dataFromScraper2 = fs.readFileSync("./apify_output/scraper_engineering.json");
const scrapedOutput2 = JSON.parse(dataFromScraper2.toString("utf-8"));

let list = scrapedOutput.concat(scrapedOutput2)
for (let i=0; i<list.length; i++){
  list[i] = JSON.stringify(list[i])
}

const set = new Set(list)
let newlist = []
set.forEach((x) => {
  newlist.push(JSON.parse(x))
})

exports.newlist = newlist