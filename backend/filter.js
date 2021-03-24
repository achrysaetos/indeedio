const fs = require("fs");

const dataFromScraper = fs.readFileSync("./apify_storage/scrapedOutput.json");
const scrapedOutput = JSON.parse(dataFromScraper.toString("utf-8"));

const dataFromArray = require("./companies.js")
const companies = dataFromArray.companies

function filterCompanies() {
  let potentials = []
  for (i=0; i<scrapedOutput.length; i++){
    const scrapedOutput_cur = scrapedOutput[i].company.toLowerCase().split(" ")
    for (j=0; j<companies.length; j++){
      const companies_cur = companies[j].split(" ")
      if (scrapedOutput_cur.every(x => companies_cur.includes(x)) || companies_cur.every(x => scrapedOutput_cur.includes(x))){
        potentials.push({
          company: scrapedOutput[i].company, 
          title: scrapedOutput[i].title, 
          link: scrapedOutput[i].link, 
          location: scrapedOutput[i].location,
          posted: scrapedOutput[i].posted,
        })
      }
    }
  }
  return potentials
}

module.exports = {filterCompanies}