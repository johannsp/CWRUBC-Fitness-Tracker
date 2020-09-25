const path = require("path");

module.exports = function(app) {
  app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
  });
  app.get("/index", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
  app.get("/stat", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stat.html"));
  });
};
