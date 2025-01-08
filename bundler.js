const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");

// Hi
const moduleAnalyser = (filename) => {
  const content = fs.readFileSync(filename, "utf-8");
  console.log(content);
  const ast = parser.parse(content, {
    sourceType: "module",
  }); // AST
  // console.log(ast);
  // console.log(ast.program.body);
};

const moduleInfo = moduleAnalyser("./src/index.js");
