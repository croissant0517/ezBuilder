const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "/src/index.js");

// 使用正則表達式移除 console.log
fs.readFile(filePath, "utf8", function (err, data) {
  if (err) {
    return console.log(err);
  }

  const result = data.replace(/console\.log\(message\);/g, "");
  // const result = data;
  console.log(result);

  fs.writeFile(filePath, result, "utf8", function (err) {
    if (err) return console.log(err);
  });
});
