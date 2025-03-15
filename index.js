const express = require("express");
const PORT = 8080;

//Required for rwo using inbuilt file system and to retrieve commit SHA for git
const fs = require("fs");
const app = express();

// Load metadata from file and git env variables
const metadata = JSON.parse(fs.readFileSync("metadata.json", "utf8"));
const buildNumber = process.env.BUILD_NUMBER || "001";
const commitSHA = process.env.COMMIT_SHA || "unknown";


//Root endpoint
app.get("/", (req, res) => {
    res.json({ message: "Hello, World!" });
});

//Status endpoint
app.get("/status", (req, res) => {
    res.json({
        "my-application": [
      {
        description: metadata.description,
        version: `${metadata.version}-${buildNumber}`,
        sha: commitSHA,
      },
    ],
  });
});

//Export app for testing, only start listening if not in test mode
if (require.main === module) {
app.listen(PORT, () => {
    console.log(`it's alive on http://localhost:${PORT}`);
});
}

module.exports = app;  // <-- This allows Jest to import `app` without starting the server