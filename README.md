# Job Search

A personalized job search web app, built with React, GraphQL, MongoDB, and Node.

Crawl thousands of open job positions and filter for specific qualities (by companies, keywords, and so on).

*Don't forget to add your database url and api keys in `config.js`.*

**TO LAUNCH THE SITE:**
1. run `node scraper` in the `scraper_engineer` and `scraper_engineering` directories -- runs the spiders to scrape Indeed for job listings, once for each term.
2. run `yarn start` in the backend directory -- connects to the MongoDB database and the Express API endpoint.
3. run `yarn start` in the frontend directory -- filters the scraped output by your list of companies.
4. Go to http://localhost:3000. Your Express API endpoint is up at localhost:8080, and your GraphQL playground is up at localhost:5000.

**OPTIONAL PRE-LAUNCH SCRIPTS:**
* update `companies.js` to normalize preferred filters
* run `scraper.js` to crawl the most current data

**IDEAS FOR EXTRA FEATURES:**
* Add optional background images to the `Login` and `Register` pages (just for looks)\
* Add option to update preferred companies in the `MyFavorites` page (currently unnecessary)\
* Separate the navbar into its own component (for organizational purposes)\
* Additional notes about scraping are also included in `merge-spiders.js`

## Important files

**scraper.js** -- your Puppeteer spider (enter your input parameters here). The JSON output is stored in `apify_storage/`.

**merge-spiders.js** -- function to merge the scraped outputs and remove any duplicates. Called in `server.js` as part of the startup sequence.

**companies.js** -- a list of all the companies to filter by. Currently keeps track of over 900 companies.