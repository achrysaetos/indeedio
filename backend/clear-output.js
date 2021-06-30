const fs = require("fs").promises; 

// update dataset with every run
fs.rmdir("./apify_output", { recursive: true }).then(() =>
  fs.mkdir("./apify_output")
);
