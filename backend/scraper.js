
const Apify = require("apify");
const fs = require("fs");

fs.rmdirSync("./apify_storage", { recursive: true }); // update dataset with every run
process.env.APIFY_LOCAL_STORAGE_DIR = "./apify_storage"; // location of dataset

Apify.main(async () => {
  // Apify.openRequestQueue() creates a preconfigured RequestQueue instance.
  // We add our first request to it - the initial page the crawler will visit.
  const requestQueue = await Apify.openRequestQueue();
  await requestQueue.addRequest({ url: "https://techcrunch.com/startups/" });

  // Create an instance of the PuppeteerCrawler class - a crawler
  // that automatically loads the URLs in headless Chrome / Puppeteer.
  const crawler = new Apify.PuppeteerCrawler({
    requestQueue,

    // Here you can set options that are passed to the Apify.launchPuppeteer() function.
    launchContext: {
      launchOptions: {
        headless: true,
        // Other Puppeteer options
      },
    },

    // Stop crawling after several pages
    maxRequestsPerCrawl: 3,

    // This function will be called for each URL to crawl.
    // Here you can write the Puppeteer scripts you are familiar with,
    // with the exception that browsers and pages are automatically managed by the Apify SDK.
    // The function accepts a single parameter, which is an object with the following fields:
    // - request: an instance of the Request class with information such as URL and HTTP method
    // - page: Puppeteer's Page object (see https://pptr.dev/#show=api-class-page)
    handlePageFunction: async ({ request, page }) => {
      console.log(`Processing ${request.url}...`);

      // A function to be evaluated by Puppeteer within the browser context.
      const data = await page.$$eval(".post-block__title", ($posts) => {
        const scrapedData = [];

        // We're getting the title, rank and URL of each post on Hacker News.
        $posts.forEach(($post) => {
          scrapedData.push({
            title: $post.querySelector(".post-block__title__link").innerText,
            href: $post.querySelector(".post-block__title__link").href,
          });
        });

        return scrapedData;
      });

      // Store the results to the default dataset.
      await Apify.pushData(data);

      // Find a link to the next page and enqueue it if it exists.
      await Apify.utils.enqueueLinks({
        page,
        requestQueue,
        selector: ".load-more",
      });
    },

    // This function is called if the page processing failed more than maxRequestRetries+1 times.
    handleFailedRequestFunction: async ({ request }) => {
      console.log(`Request ${request.url} failed too many times.`);
    },
  });

  // Run the crawler and wait for it to finish.
  await crawler.run();

  // Combine the json output files into one array
  let headlines = [];
  let filenames = fs.readdirSync("./apify_storage/datasets/default");
  filenames.forEach((file) => {
    try {
      const buffer = fs.readFileSync("./apify_storage/datasets/default/" + file);
      const headline = JSON.parse(buffer.toString("utf-8"));
      headlines.push(headline);
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });

  // Write the array into the headlines.json file
  fs.writeFileSync("./apify_storage/techcrunch.json", JSON.stringify(headlines));
  console.log("...Done!");
});
