# Indeedio

A personalized job search web app, built with React, GraphQL, MongoDB, and Node.

Crawl thousands of open job positions and filter for specific qualities (by companies, keywords, and so on).

*Don't forget to add your database url and api keys in `config.js` and a list of preferred search terms in `companies.js`.*

**TO LAUNCH THE SITE:**
1. run `yarn start` in the backend directory -- connects to the MongoDB database and the Express API endpoint, and runs the spiders to scrape Indeed for job listings (once for each term).
2. run `yarn start` in the frontend directory -- filters the scraped output by your list of companies.
3. Go to http://localhost:3000. Your Express API endpoint is up at localhost:8080, and your GraphQL playground is up at localhost:5000.

**OPTIONAL PRE-LAUNCH SCRIPTS:**
* add terms and run `node companies` in the `frontend/` directory to add new preferences
* run `node clear-output` in the `backend/` directory to clear outdated listings
* run `node apify_scrapers/engineer_scraper` and `node apify_scrapers/engineering_scraper` in the `backend/` directory to scrape new listings on demand

**IDEAS FOR EXTRA FEATURES:**
* Add optional background images to the `Login` and `Register` pages (just for looks)
* Add option to update preferred companies in the `MyFavorites` page (currently unnecessary)
* Separate the navbar into its own component (for organizational purposes)
* Additional notes about scraping are also included in `merge-spiders.js`


## Important files

**apify_scrapers/** -- your Puppeteer spiders (enter your input parameters here). The JSON output is stored in `apify_output/`. 
*Always make sure that the websiteURLs and selectors are up to date!*

**merge-spiders.js** -- function to merge the scraped outputs and remove any duplicates. Called in `server.js` as part of the startup sequence.

**companies.js** -- a list of all the companies to filter by. Currently keeps track of over 900 companies.


## Screenshots ##

![](/screenshots/1.png?raw=true)
![](/screenshots/2.png?raw=true)
![](/screenshots/3.png?raw=true)
